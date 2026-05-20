<template>
  <div class="page-content">

    <!-- Back + Header -->
    <div class="page-header-row">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn btn-sm back-btn" @click="router.back()">← Back</button>
        <div>
          <div class="page-title-inline">Leave Ledger — {{ route.query.name || 'Staff' }}</div>
          <div class="page-sub">{{ currentYearLabel }}</div>
        </div>
      </div>
    </div>

    <!-- ── Assign Leave Form ──────────────────────────────────────── -->
    <div class="section-card">
      <div class="section-title">Assign Leave — {{ route.query.name || '' }}</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-lbl">Leave Type</label>
          <select class="form-sel" v-model="assignForm.leaveTypeId">
            <option value="">— Select —</option>
            <option v-for="t in leaveTypes" :key="t.ALID" :value="t.ALID">{{ t.LeaveDescription }} ({{ t.LeaveCode }})</option>
          </select>
          <div v-if="formErr.leaveTypeId" class="field-err">{{ formErr.leaveTypeId }}</div>
        </div>
        <div class="form-group">
          <label class="form-lbl">From Date <span class="req">*</span></label>
          <input type="date" class="form-inp" v-model="assignForm.fromDate" />
          <div v-if="formErr.fromDate" class="field-err">{{ formErr.fromDate }}</div>
        </div>
        <div class="form-group">
          <label class="form-lbl">To Date <span class="req">*</span></label>
          <input type="date" class="form-inp" v-model="assignForm.toDate" />
          <div v-if="formErr.toDate" class="field-err">{{ formErr.toDate }}</div>
        </div>
        <!-- Is Half Day — only visible when From = To (same day) -->
        <div class="form-group" v-if="isSameDay">
          <label class="form-lbl">Is Half Day</label>
          <select class="form-sel" v-model="assignForm.isHalfDay">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <!-- Half Day Type — only when isHalfDay = Yes -->
        <div class="form-group" v-if="isSameDay && assignForm.isHalfDay === '1'">
          <label class="form-lbl">Half Day Type</label>
          <select class="form-sel" v-model="assignForm.halfDayType">
            <option value="First Half">First Half</option>
            <option value="Second Half">Second Half</option>
          </select>
        </div>
        <div class="form-group form-group-wide">
          <label class="form-lbl">Details / Reason</label>
          <input type="text" class="form-inp" v-model="assignForm.details" placeholder="Optional note" />
        </div>
        <div class="form-group form-group-action">
          <button class="btn btn-primary" @click="submitAssign" :disabled="assigning">
            {{ assigning ? 'Saving…' : 'Submit' }}
          </button>
        </div>
      </div>
      <div v-if="assignErr" class="save-err">{{ assignErr }}</div>
    </div>

    <!-- ── Filter ─────────────────────────────────────────────────── -->
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-lbl">Academic Year</label>
        <select class="filter-select" v-model="filterAyid" @change="load">
          <option value="">All Years</option>
          <option v-for="cy in calendarYears" :key="cy.AYID" :value="cy.AYID">{{ cy.AcademicTitle }}</option>
        </select>
      </div>
      <button class="btn btn-sm btn-primary" @click="load" :disabled="loading">Filter</button>
    </div>

    <!-- ── Ledger Table ───────────────────────────────────────────── -->
    <div class="table-wrap">
      <div v-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th>Calendar Year</th>
            <th>Leave Details</th>
            <th>Type</th>
            <th class="text-center">Is Half Day</th>
            <th>Leave On</th>
            <th>Applied On</th>
            <th class="text-center">Status</th>
            <th>Processed By</th>
            <th>Processed On</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="11" class="table-empty">No leave records found.</td>
          </tr>
          <tr v-for="(row, i) in rows" :key="row.laId" :class="{ 'row-cancelled': row.isCancelled }">
            <td class="text-muted col-num">{{ i + 1 }}</td>
            <td class="text-muted">{{ row.AcademicTitle || '—' }}</td>
            <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" :title="row.applicationDetails">
              {{ row.applicationDetails || '—' }}
            </td>
            <td>
              <span class="type-badge">{{ row.LeaveDescription }}<span class="type-code"> ({{ row.LeaveCode }})</span></span>
            </td>
            <td class="text-center">
              <span class="pill" :class="row.isHalfDay ? 'pill-yes' : 'pill-no'">{{ row.isHalfDay ? 'Yes' : 'No' }}</span>
            </td>
            <td class="text-muted">{{ formatDate(row.leaveDate) }}</td>
            <td class="text-muted">{{ formatDateTime(row.appliedOn) }}</td>
            <td class="text-center">
              <span class="status-badge" :class="statusClass(row)">{{ statusLabel(row) }}</span>
            </td>
            <td class="text-muted">{{ row.approverName?.trim() || '—' }}</td>
            <td class="text-muted">{{ formatDateTime(row.approvedOn) }}</td>
            <td class="text-center">
              <!-- Pending: show Approve + Reject -->
              <template v-if="row.leaveStatus === 0 && !row.isCancelled">
                <button class="btn-act btn-approve" @click="approveLeave(row)" title="Approve">👍</button>
                <button class="btn-act btn-reject"  @click="rejectLeave(row)"  title="Reject">👎</button>
              </template>
              <!-- Approved: show Cancel -->
              <template v-else-if="row.leaveStatus === 1 && !row.isCancelled">
                <button class="btn-cancel-icon" @click="cancelLeave(row)" title="Cancel">⊘</button>
              </template>
              <span v-else class="text-muted" style="font-size:10px">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" class="toast" :class="`toast-${toast.type}`">{{ toast.msg }}</div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import { useAuthStore } from '@/stores/useAuthStore'

const route    = useRoute()
const router   = useRouter()
const authStore = useAuthStore()
const academyId = computed(() => authStore.academyId)
const staffId   = computed(() => parseInt(route.params.staffId))

// ── Lookups ───────────────────────────────────────────────────────
const calendarYears = ref([])
const leaveTypes    = ref([])
const filterAyid    = ref(route.query.ayid ? parseInt(route.query.ayid) : '')

const currentYearLabel = computed(() =>
  calendarYears.value.find(cy => cy.AYID == filterAyid.value)?.AcademicTitle || 'All Years'
)

// ── Table state ───────────────────────────────────────────────────
const rows    = ref([])
const loading = ref(false)
const error   = ref('')

async function loadLookups() {
  try {
    const { data } = await api.get('/users/hrms/leave-calendar-years', {
      params: { academy_id: academyId.value },
    })
    calendarYears.value = data.data || []
    if (!filterAyid.value) {
      const current = calendarYears.value.find(cy => cy.IsCurrent)
      if (current) filterAyid.value = current.AYID
    }
  } catch { /* non-fatal */ }
}

async function load() {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get(`/users/hrms/leave-ledger/${staffId.value}`, {
      params: { academy_id: academyId.value, ayid: filterAyid.value || undefined },
    })
    rows.value       = data.data        || []
    leaveTypes.value = data.leave_types || []
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to load ledger.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (!route.params.staffId) {
    router.replace({ name: 'hrms-employee-leave' })
    return
  }
  await loadLookups()
  await load()
})

// ── Helpers ───────────────────────────────────────────────────────
function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatDateTime(val) {
  if (!val) return '—'
  return new Date(val).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function statusLabel(row) {
  if (row.isCancelled) return 'Cancelled'
  if (row.leaveStatus === 1) return 'Approved'
  if (row.leaveStatus === 2) return 'Rejected'
  return 'Pending'
}

function statusClass(row) {
  if (row.isCancelled)      return 'status-cancelled'
  if (row.leaveStatus === 1) return 'status-approved'
  if (row.leaveStatus === 2) return 'status-rejected'
  return 'status-pending'
}

// ── Assign Form ───────────────────────────────────────────────────
const assignForm = reactive({ leaveTypeId: '', fromDate: '', toDate: '', details: '', isHalfDay: '0', halfDayType: 'First Half' })

// Show half-day options only when from = to (single day selected)
const isSameDay = computed(() =>
  assignForm.fromDate && assignForm.toDate && assignForm.fromDate === assignForm.toDate
)

// Reset half-day state when date range becomes multi-day
watch(isSameDay, (val) => {
  if (!val) { assignForm.isHalfDay = '0'; assignForm.halfDayType = 'First Half' }
})
const formErr    = ref({})
const assigning  = ref(false)
const assignErr  = ref('')

function validateAssign() {
  const err = {}
  if (!assignForm.leaveTypeId) err.leaveTypeId = 'Leave type is required'
  if (!assignForm.fromDate)    err.fromDate     = 'From date is required'
  if (!assignForm.toDate)      err.toDate       = 'To date is required'
  formErr.value = err
  return Object.keys(err).length === 0
}

async function submitAssign() {
  if (!validateAssign()) return
  assigning.value = true; assignErr.value = ''
  try {
    const { data } = await api.post(`/users/hrms/leave-ledger/${staffId.value}/assign`, {
      academy_id:    academyId.value,
      ayid:          filterAyid.value || calendarYears.value.find(cy => cy.IsCurrent)?.AYID,
      leave_type_id: assignForm.leaveTypeId,
      from_date:     assignForm.fromDate,
      to_date:       assignForm.toDate,
      details:       assignForm.details,
      is_half_day:   isSameDay.value ? assignForm.isHalfDay : '0',
      half_day_type: (isSameDay.value && assignForm.isHalfDay === '1') ? assignForm.halfDayType : null,
    })
    Object.assign(assignForm, { leaveTypeId: '', fromDate: '', toDate: '', details: '', isHalfDay: '0', halfDayType: 'First Half' })
    formErr.value = {}
    showToast(data.message || 'Leave assigned.')
    await load()
  } catch (e) {
    assignErr.value = e.response?.data?.message || e.response?.data?.errors
      ? Object.values(e.response.data.errors || {}).flat().join(' ')
      : 'Failed to assign leave.'
  } finally {
    assigning.value = false
  }
}

// ── Approve / Reject / Cancel ─────────────────────────────────────
async function approveLeave(row) {
  if (!confirm(`Approve leave on ${formatDate(row.leaveDate)}?`)) return
  try {
    await api.patch(`/users/hrms/leave-ledger/${row.laId}/approve`)
    showToast('Leave approved.')
    await load()
  } catch (e) {
    showToast(e.response?.data?.message || 'Action failed.', 'error')
  }
}

async function rejectLeave(row) {
  if (!confirm(`Reject leave on ${formatDate(row.leaveDate)}?`)) return
  try {
    await api.patch(`/users/hrms/leave-ledger/${row.laId}/reject`)
    showToast('Leave rejected.')
    await load()
  } catch (e) {
    showToast(e.response?.data?.message || 'Action failed.', 'error')
  }
}

async function cancelLeave(row) {
  if (!confirm(`Cancel leave on ${formatDate(row.leaveDate)}?`)) return
  try {
    await api.patch(`/users/hrms/leave-ledger/${row.laId}/cancel`)
    showToast('Leave cancelled.')
    await load()
  } catch (e) {
    showToast(e.response?.data?.message || 'Cancel failed.', 'error')
  }
}

// ── Toast ─────────────────────────────────────────────────────────
const toast = reactive({ show: false, msg: '', type: 'success' })
let toastTimer = null

function showToast(msg, type = 'success') {
  toast.msg = msg; toast.type = type; toast.show = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.show = false }, 3000)
}
</script>

<style scoped>
.page-content { padding: 0 }
.page-header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px }
.page-title-inline { font-size:17px; font-weight:700; color:#1a1a1a }
.page-sub { font-size:11px; color:#888780; margin-top:2px }
.back-btn { background:#f4f3f1; border-color:#d0cdc9; color:#555 }

/* assign section */
.section-card { background:#fafaf9; border:1px solid #e5e2de; border-radius:9px; padding:16px 18px; margin-bottom:14px }
.section-title { font-size:13px; font-weight:700; color:#1a1a1a; margin-bottom:12px }
.form-row { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end }
.form-group { display:flex; flex-direction:column; gap:4px; min-width:140px }
.form-group-wide { min-width:200px; flex:1 }
.form-group-action { justify-content:flex-end }
.form-lbl { font-size:10px; color:#888780; font-weight:600; text-transform:uppercase; letter-spacing:.4px }
.req { color:#c0392b }
.form-sel, .form-inp { border:1px solid #d0cdc9; border-radius:6px; padding:6px 9px; font-size:12px; background:#fff; color:#1a1a1a; outline:none }
.form-sel:focus, .form-inp:focus { border-color:#3b82f6 }
.field-err { font-size:10px; color:#c0392b; margin-top:2px }
.save-err  { font-size:11px; color:#c0392b; margin-top:8px }

/* filter */
.filter-bar { display:flex; gap:12px; align-items:flex-end; margin-bottom:14px; flex-wrap:wrap }
.filter-group { display:flex; flex-direction:column; gap:3px }
.filter-lbl { font-size:10px; color:#888780; font-weight:600; text-transform:uppercase; letter-spacing:.4px }
.filter-select { border:1px solid #d0cdc9; border-radius:6px; padding:5px 9px; font-size:12px; background:#fff; color:#1a1a1a; outline:none }

/* table */
.table-wrap { overflow-x:auto }
.data-table { width:100%; border-collapse:collapse; font-size:12px }
.data-table th { background:#f4f3f1; border-bottom:2px solid #e5e2de; padding:8px 10px; text-align:left; font-size:10px; font-weight:700; color:#888780; text-transform:uppercase; letter-spacing:.4px; white-space:nowrap }
.data-table td { border-bottom:1px solid #f0ede9; padding:8px 10px; color:#2d2a27; vertical-align:middle }
.data-table tbody tr:hover { background:#faf9f8 }
.row-cancelled td { opacity:.55 }
.table-empty { text-align:center; padding:36px; color:#aaa8a4; font-size:13px }
.col-num { width:36px; text-align:center }
.text-center { text-align:center }
.text-muted { color:#888780 }
.text-danger { color:#c0392b }

/* type badge */
.type-badge { font-size:11px; font-weight:600; color:#1a1a1a }
.type-code  { font-size:10px; color:#888780; font-weight:400 }

/* pills */
.pill { padding:2px 8px; border-radius:10px; font-size:10px; font-weight:600 }
.pill-yes { background:#fef9c3; color:#854d0e }
.pill-no  { background:#f0f0ef; color:#666360 }

/* status badges */
.status-badge { padding:3px 9px; border-radius:10px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.4px }
.status-approved  { background:#dcfce7; color:#16a34a }
.status-rejected  { background:#fee2e2; color:#dc2626 }
.status-pending   { background:#fef3c7; color:#d97706 }
.status-cancelled { background:#f1f0ef; color:#888780 }

/* action buttons */
.btn-act { background:none; border:none; cursor:pointer; font-size:17px; line-height:1; padding:0 3px }
.btn-approve:hover { opacity:.75 }
.btn-reject:hover  { opacity:.75 }
.btn-cancel-icon { background:none; border:none; cursor:pointer; font-size:18px; color:#f97316; line-height:1; padding:0 4px }
.btn-cancel-icon:hover { color:#c2410c }

/* buttons */
.btn { display:inline-flex; align-items:center; gap:4px; border:1px solid #d0cdc9; background:#fff; padding:5px 12px; border-radius:6px; font-size:12px; cursor:pointer; color:#2d2a27; transition:background .15s }
.btn:hover:not(:disabled) { background:#f4f3f1 }
.btn:disabled { opacity:.5; cursor:not-allowed }
.btn-primary { background:#3b82f6; border-color:#3b82f6; color:#fff }
.btn-primary:hover:not(:disabled) { background:#2563eb }
.btn-sm { padding:4px 9px; font-size:11px }

/* toast */
.toast { position:fixed; bottom:24px; right:24px; padding:12px 20px; border-radius:8px; font-size:13px; font-weight:600; z-index:2000; box-shadow:0 4px 16px rgba(0,0,0,.2); animation:fadeIn .2s ease }
.toast-success { background:#16a34a; color:#fff }
.toast-error   { background:#dc2626; color:#fff }
@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
</style>
