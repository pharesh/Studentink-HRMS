<template>
  <div class="page-content">

    <!-- Header -->
    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Employee Leave Balances</div>
        <div class="page-sub">Assign, carry forward, and manage leave allocations per employee</div>
      </div>
    </div>

    <!-- Stats Strip -->
    <div class="stat-strip">
      <div class="stat-card"><div class="stat-val">{{ staff.length }}</div><div class="stat-lbl">Total Staff</div></div>
      <div class="stat-card"><div class="stat-val">{{ totalAllocated }}</div><div class="stat-lbl">Leave Assigned</div></div>
      <div class="stat-card"><div class="stat-val">{{ totalCarryFwd }}</div><div class="stat-lbl">Carry Forward</div></div>
      <div class="stat-card"><div class="stat-val">{{ totalUsed }}</div><div class="stat-lbl">Used</div></div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-lbl">Status</label>
        <select class="filter-select" v-model="filters.status">
          <option value="Active">Active Only</option>
          <option value="All">All</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-lbl">Calendar Year</label>
        <select class="filter-select" v-model="filters.ayid">
          <option value="">— Select Year —</option>
          <option v-for="cy in calendarYears" :key="cy.AYID" :value="cy.AYID">{{ cy.AcademicTitle }}</option>
        </select>
      </div>
      <button class="btn btn-primary btn-sm" @click="load" :disabled="!filters.ayid || loading">Filter</button>

      <div class="import-strip">
        <input type="file" ref="xlsInput" accept=".xls,.xlsx" style="display:none" @change="onFileChange" />
        <span class="file-name-lbl">{{ importFile ? importFile.name : 'No file selected' }}</span>
        <button class="btn btn-sm" @click="xlsInput.click()">Select Employee Leave Data XLS</button>
        <button class="btn btn-sm btn-upload" @click="uploadXLS" :disabled="!importFile || importing">
          {{ importing ? 'Uploading…' : '⬆ Upload' }}
        </button>
        <button class="btn btn-sm btn-export" @click="exportCSV" :disabled="!staff.length">⬇ Export Leaves</button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <div v-if="!filters.ayid" class="table-empty">Select a calendar year to view employee leaves.</div>
      <div v-else-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th>Staff Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Joining Date</th>
            <th>Type</th>
            <th class="text-right">Carry Fwd</th>
            <th class="text-right">Allocated</th>
            <th class="text-right">Used</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="staff.length === 0">
            <td colspan="11" class="table-empty">No staff found.</td>
          </tr>
          <tr v-for="(row, i) in staff" :key="row.FMID">
            <td class="text-muted col-num">{{ i + 1 }}</td>
            <td class="fw-600">{{ row.facultyName }}</td>
            <td class="text-muted">{{ row.ContactNo || '—' }}</td>
            <td class="text-muted">{{ row.EmailAddress || '—' }}</td>
            <td>{{ row.Gender || '—' }}</td>
            <td class="text-muted">{{ row.JoiningDate || '—' }}</td>
            <td><span class="chip">{{ row.Type || '—' }}</span></td>
            <td class="text-right">{{ row.tCarryForward ?? 0 }}</td>
            <td class="text-right">{{ row.tLeaveAssigned ?? 0 }}</td>
            <td class="text-right">{{ row.tLeaveUsed ?? 0 }}</td>
            <td>
              <div class="action-wrap">
                <button class="btn btn-sm btn-action" @click.stop="toggleDropdown(row.FMID)">
                  Action <span class="caret">▾</span>
                </button>
                <div v-if="openDropdown === row.FMID" class="action-dropdown">
                  <div class="action-item" @click="goLedger(row)">≡ Leave Ledger</div>
                  <div class="action-item" @click="openAssign(row)">⚙ Assign Leave</div>
                  <div v-if="nextYear" class="action-item" @click="openCarryForward(row)">↷ Carry Forward</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Assign Leaves Modal ──────────────────────────────────── -->
    <div v-if="assignModal.open" class="modal-overlay" @click.self="assignModal.open = false">
      <div class="modal-box modal-lg">
        <div class="modal-header">
          <div>
            <div class="modal-title">Assign Leaves — {{ assignModal.facultyName }}</div>
            <div class="modal-sub">{{ currentYearLabel }}</div>
          </div>
          <button class="modal-close" @click="assignModal.open = false">✕</button>
        </div>
        <div class="modal-body">
          <div v-if="detailLoading" class="table-empty">Loading leave details…</div>
          <div v-else-if="detailError" class="table-empty text-danger">{{ detailError }}</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th class="text-right">Carry Fwd</th>
                <th class="text-right">Assigned</th>
                <th class="text-right">Used</th>
                <th class="text-right">Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in leaveDetails" :key="d.ALID">
                <td>
                  <div class="fw-600">{{ d.LeaveDescription }}</div>
                  <div class="text-muted" style="font-size:10px">{{ d.LeaveCode }}</div>
                </td>
                <td class="text-right">{{ d.carryForward ?? 0 }}</td>
                <td class="text-right" style="width:90px">
                  <input type="number" class="inline-input" v-model.number="assignEdits[d.ALID]" min="0" step="0.5" />
                </td>
                <td class="text-right">{{ d.leaveUsed ?? 0 }}</td>
                <td class="text-right fw-600" :style="{ color: balance(d) < 0 ? '#c0392b' : '#3b6d11' }">
                  {{ balance(d) }}
                </td>
                <td>
                  <button v-if="d.lmId" class="btn btn-danger-xs" @click="trashLeave(d.lmId)" title="Reset to 0">✕</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <div v-if="saveError" class="form-err">{{ saveError }}</div>
          <button class="btn" @click="assignModal.open = false">Cancel</button>
          <button class="btn btn-primary" @click="saveAssign" :disabled="saving">
            {{ saving ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Carry Forward Modal ──────────────────────────────────── -->
    <div v-if="cfModal.open" class="modal-overlay" @click.self="cfModal.open = false">
      <div class="modal-box modal-lg">
        <div class="modal-header">
          <div>
            <div class="modal-title">Carry Forward — {{ cfModal.facultyName }}</div>
            <div class="modal-sub">Carry balances into next academic year</div>
          </div>
          <button class="modal-close" @click="cfModal.open = false">✕</button>
        </div>
        <div class="modal-body">
          <div v-if="detailLoading" class="table-empty">Loading…</div>
          <div v-else-if="detailError" class="table-empty text-danger">{{ detailError }}</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th class="text-right">Assigned</th>
                <th class="text-right">Used</th>
                <th class="text-right">Balance</th>
                <th class="text-right">Carry Forward</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in leaveDetails" :key="d.ALID">
                <td>
                  <div class="fw-600">{{ d.LeaveDescription }}</div>
                  <div class="text-muted" style="font-size:10px">{{ d.LeaveCode }}</div>
                </td>
                <td class="text-right">{{ d.leaveAssigned ?? 0 }}</td>
                <td class="text-right">{{ d.leaveUsed ?? 0 }}</td>
                <td class="text-right">{{ balance(d) }}</td>
                <td class="text-right" style="width:90px">
                  <input type="number" class="inline-input" v-model.number="cfEdits[d.ALID]" min="0" step="0.5" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <div v-if="saveError" class="form-err">{{ saveError }}</div>
          <button class="btn" @click="cfModal.open = false">Cancel</button>
          <button class="btn btn-primary" @click="saveCF" :disabled="saving">
            {{ saving ? 'Saving…' : 'Carry Forward' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" class="toast" :class="`toast-${toast.type}`">{{ toast.msg }}</div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()

const authStore = useAuthStore()
const academyId = computed(() => authStore.academyId)

// ── Lookups ───────────────────────────────────────────────────────
const calendarYears = ref([])

// ── Filters ───────────────────────────────────────────────────────
const filters = reactive({ status: 'Active', ayid: '' })

// ── Table state ───────────────────────────────────────────────────
const staff     = ref([])
const nextYear  = ref(0)
const loading   = ref(false)
const error     = ref('')

const totalAllocated = computed(() => staff.value.reduce((s, r) => s + Number(r.tLeaveAssigned || 0), 0))
const totalCarryFwd  = computed(() => staff.value.reduce((s, r) => s + Number(r.tCarryForward  || 0), 0))
const totalUsed      = computed(() => staff.value.reduce((s, r) => s + Number(r.tLeaveUsed     || 0), 0))

const currentYearLabel = computed(() =>
  calendarYears.value.find(cy => cy.AYID == filters.ayid)?.AcademicTitle || ''
)

async function loadLookups() {
  try {
    const { data } = await api.get('/users/hrms/leave-calendar-years', {
      params: { academy_id: academyId.value },
    })
    calendarYears.value = data.data || []
    const current = calendarYears.value.find(cy => cy.IsCurrent)
    if (current) { filters.ayid = current.AYID; await load() }
  } catch {
    error.value = 'Failed to load calendar years.'
  }
}

async function load() {
  if (!filters.ayid) { staff.value = []; return }
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/users/hrms/employee-leave', {
      params: { academy_id: academyId.value, academy_year_id: filters.ayid, status: filters.status },
    })
    staff.value    = data.data.staff    || []
    nextYear.value = data.data.nextYear || 0
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to load staff.'
  } finally {
    loading.value = false
  }
}

onMounted(loadLookups)

// ── Action Dropdown ───────────────────────────────────────────────
const openDropdown = ref(null)

function toggleDropdown(fmid) {
  openDropdown.value = openDropdown.value === fmid ? null : fmid
}

function closeDropdown() { openDropdown.value = null }

onMounted(() => document.addEventListener('click', closeDropdown))
onBeforeUnmount(() => document.removeEventListener('click', closeDropdown))

function goLedger(row) {
  closeDropdown()
  router.push({
    name:   'hrms-leave-ledger',
    params: { staffId: row.FMID },
    query:  { ayid: filters.ayid, name: row.facultyName },
  })
}

// ── Leave Details ─────────────────────────────────────────────────
const leaveDetails  = ref([])
const detailLoading = ref(false)
const detailError   = ref('')

async function loadDetails(staffId) {
  detailLoading.value = true; detailError.value = ''
  try {
    const { data } = await api.get(`/users/hrms/employee-leave/${staffId}/details`, {
      params: { academy_id: academyId.value, academy_year_id: filters.ayid },
    })
    leaveDetails.value = data.data || []
  } catch (e) {
    detailError.value = e.response?.data?.message || 'Failed to load details.'
  } finally {
    detailLoading.value = false
  }
}

function balance(d) {
  const b = ((d.leaveAssigned ?? 0) + (d.carryForward ?? 0) - (d.leaveUsed ?? 0))
  return parseFloat(b.toFixed(1))
}

// ── Assign Modal ──────────────────────────────────────────────────
const assignModal = reactive({ open: false, staffId: null, facultyName: '' })
const assignEdits = ref({})
const saving      = ref(false)
const saveError   = ref('')

async function openAssign(row) {
  closeDropdown()
  cfModal.open = false
  Object.assign(assignModal, { open: true, staffId: row.FMID, facultyName: row.facultyName })
  assignEdits.value = {}; saveError.value = ''
  await loadDetails(row.FMID)
  leaveDetails.value.forEach(d => { assignEdits.value[d.ALID] = d.leaveAssigned ?? 0 })
}

async function saveAssign() {
  saving.value = true; saveError.value = ''
  try {
    await api.post('/users/hrms/employee-leave/assign', {
      academy_id:      academyId.value,
      academy_year_id: filters.ayid,
      staff_id:        assignModal.staffId,
      leaves:          assignEdits.value,
    })
    assignModal.open = false
    showToast('Leave assigned successfully.')
    await load()
  } catch (e) {
    saveError.value = e.response?.data?.message || 'Save failed.'
  } finally {
    saving.value = false
  }
}

async function trashLeave(lmId) {
  if (!confirm('Reset this leave allocation to 0?')) return
  try {
    await api.patch(`/users/hrms/employee-leave/${lmId}/trash`)
    await loadDetails(assignModal.staffId)
    leaveDetails.value.forEach(d => { assignEdits.value[d.ALID] = d.leaveAssigned ?? 0 })
    showToast('Leave reset to 0.')
    await load()
  } catch (e) {
    saveError.value = e.response?.data?.message || 'Action failed.'
  }
}

// ── Carry Forward Modal ───────────────────────────────────────────
const cfModal = reactive({ open: false, staffId: null, facultyName: '' })
const cfEdits = ref({})

async function openCarryForward(row) {
  closeDropdown()
  assignModal.open = false
  Object.assign(cfModal, { open: true, staffId: row.FMID, facultyName: row.facultyName })
  cfEdits.value = {}; saveError.value = ''
  await loadDetails(row.FMID)
  leaveDetails.value.forEach(d => { cfEdits.value[d.ALID] = balance(d) })
}

async function saveCF() {
  saving.value = true; saveError.value = ''
  try {
    await api.post('/users/hrms/employee-leave/carry-forward', {
      academy_id:      academyId.value,
      academy_year_id: filters.ayid,
      next_year_id:    nextYear.value,
      staff_id:        cfModal.staffId,
      leaves:          cfEdits.value,
    })
    cfModal.open = false
    showToast('Leave carried forward successfully.')
    await load()
  } catch (e) {
    saveError.value = e.response?.data?.message || 'Save failed.'
  } finally {
    saving.value = false
  }
}

// ── Import / Export ───────────────────────────────────────────────
const xlsInput   = ref(null)
const importFile = ref(null)
const importing  = ref(false)

function onFileChange(e) {
  importFile.value = e.target.files[0] || null
}

async function uploadXLS() {
  if (!importFile.value) return
  importing.value = true
  try {
    const form = new FormData()
    form.append('file', importFile.value)
    form.append('academy_id', academyId.value)
    form.append('academy_year_id', filters.ayid)
    await api.post('/users/hrms/employee-leave/import', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    importFile.value = null
    xlsInput.value.value = ''
    showToast('Leave data imported successfully.')
    await load()
  } catch (e) {
    showToast(e.response?.data?.message || 'Import failed.', 'error')
  } finally {
    importing.value = false
  }
}

function exportCSV() {
  const yearLabel = currentYearLabel.value || 'leaves'
  const headers   = ['#', 'Staff Name', 'Contact', 'Email', 'Gender', 'Joining Date', 'Type', 'Carry Forward', 'Allocated', 'Used']
  const rows      = staff.value.map((r, i) => [
    i + 1,
    r.facultyName,
    r.ContactNo    || '',
    r.EmailAddress || '',
    r.Gender       || '',
    r.JoiningDate  || '',
    r.Type         || '',
    r.tCarryForward  ?? 0,
    r.tLeaveAssigned ?? 0,
    r.tLeaveUsed     ?? 0,
  ])

  const csv  = [headers, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `employee-leaves-${yearLabel}.csv`
  a.click(); URL.revokeObjectURL(url)
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
.page-header-row { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px }
.page-title-inline { font-size:17px; font-weight:700; color:#1a1a1a }
.page-sub { font-size:11px; color:#888780; margin-top:2px }

.stat-strip { display:flex; gap:10px; margin-bottom:14px; flex-wrap:wrap }
.stat-card { background:#f9f8f7; border:1px solid #e5e2de; border-radius:8px; padding:10px 18px; min-width:90px }
.stat-val { font-size:22px; font-weight:700; color:#1a1a1a }
.stat-lbl { font-size:10px; color:#888780; margin-top:2px; text-transform:uppercase; letter-spacing:.5px }

.filter-bar { display:flex; gap:12px; align-items:flex-end; margin-bottom:14px; flex-wrap:wrap }
.filter-group { display:flex; flex-direction:column; gap:3px }
.filter-lbl { font-size:10px; color:#888780; font-weight:600; text-transform:uppercase; letter-spacing:.4px }
.filter-select { border:1px solid #d0cdc9; border-radius:6px; padding:5px 9px; font-size:12px; background:#fff; color:#1a1a1a; outline:none }
.filter-select:focus { border-color:#3b82f6 }

.import-strip { display:flex; align-items:center; gap:6px; background:#f4f3f1; border:1px solid #e5e2de; border-radius:7px; padding:6px 10px; flex-wrap:wrap }
.file-name-lbl { font-size:11px; color:#666360; min-width:120px; max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
.btn-upload { background:#0d9488; border-color:#0d9488; color:#fff }
.btn-upload:hover:not(:disabled) { background:#0f766e }
.btn-export { background:#1d4ed8; border-color:#1d4ed8; color:#fff }
.btn-export:hover:not(:disabled) { background:#1e40af }

.table-wrap { overflow-x:auto }
.data-table { width:100%; border-collapse:collapse; font-size:12px }
.data-table th { background:#f4f3f1; border-bottom:2px solid #e5e2de; padding:8px 10px; text-align:left; font-size:10px; font-weight:700; color:#888780; text-transform:uppercase; letter-spacing:.4px; white-space:nowrap }
.data-table td { border-bottom:1px solid #f0ede9; padding:8px 10px; color:#2d2a27; vertical-align:middle }
.data-table tbody tr:hover { background:#faf9f8 }
.table-empty { text-align:center; padding:36px; color:#aaa8a4; font-size:13px }
.col-num { width:36px; text-align:center }
.text-right { text-align:right }
.text-muted { color:#888780 }
.text-danger { color:#c0392b }
.fw-600 { font-weight:600 }

.action-btns { display:flex; gap:4px }
.action-wrap { position:relative; display:inline-block }
.btn-action { background:#3b82f6; border-color:#3b82f6; color:#fff; white-space:nowrap }
.btn-action:hover { background:#2563eb }
.caret { font-size:9px }
.action-dropdown { position:absolute; right:0; top:calc(100% + 3px); background:#fff; border:1px solid #d0cdc9; border-radius:7px; box-shadow:0 6px 20px rgba(0,0,0,.13); z-index:200; min-width:148px; overflow:hidden }
.action-item { padding:9px 14px; font-size:12px; color:#2d2a27; cursor:pointer; white-space:nowrap }
.action-item:hover { background:#f0ede9 }
.btn { display:inline-flex; align-items:center; gap:4px; border:1px solid #d0cdc9; background:#fff; padding:5px 10px; border-radius:6px; font-size:12px; cursor:pointer; color:#2d2a27; transition:background .15s }
.btn:hover:not(:disabled) { background:#f4f3f1 }
.btn:disabled { opacity:.5; cursor:not-allowed }
.btn-primary { background:#3b82f6; border-color:#3b82f6; color:#fff }
.btn-primary:hover:not(:disabled) { background:#2563eb; border-color:#2563eb }
.btn-cf { background:#6366f1; border-color:#6366f1; color:#fff }
.btn-cf:hover:not(:disabled) { background:#4f46e5 }
.btn-sm { padding:4px 8px; font-size:11px }
.btn-danger-xs { background:#fee2e2; border-color:#fca5a5; color:#c0392b; padding:2px 6px; font-size:11px; border-radius:4px; cursor:pointer; border:1px solid #fca5a5 }
.btn-danger-xs:hover { background:#fecaca }

.chip { background:#f0ede9; border-radius:10px; padding:2px 7px; font-size:10px; color:#666360 }

.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:1000; display:flex; align-items:center; justify-content:center }
.modal-box { background:#fff; border-radius:12px; width:680px; max-width:95vw; max-height:90vh; display:flex; flex-direction:column; box-shadow:0 20px 60px rgba(0,0,0,.25) }
.modal-lg { width:820px }
.modal-header { display:flex; justify-content:space-between; align-items:flex-start; padding:18px 20px 14px; border-bottom:1px solid #f0ede9 }
.modal-title { font-size:15px; font-weight:700; color:#1a1a1a }
.modal-sub { font-size:11px; color:#888780; margin-top:2px }
.modal-close { border:none; background:none; font-size:16px; color:#aaa8a4; cursor:pointer; line-height:1; padding:2px }
.modal-close:hover { color:#2d2a27 }
.modal-body { padding:16px 20px; overflow-y:auto; flex:1 }
.modal-footer { padding:14px 20px; border-top:1px solid #f0ede9; display:flex; gap:8px; justify-content:flex-end; align-items:center }

.inline-input { width:72px; border:1px solid #d0cdc9; border-radius:5px; padding:4px 6px; font-size:12px; text-align:right; outline:none }
.inline-input:focus { border-color:#3b82f6 }

.form-err { color:#c0392b; font-size:11px; flex:1 }

.toast { position:fixed; bottom:24px; right:24px; padding:12px 20px; border-radius:8px; font-size:13px; font-weight:600; z-index:2000; box-shadow:0 4px 16px rgba(0,0,0,.2); animation:fadeIn .2s ease }
.toast-success { background:#16a34a; color:#fff }
.toast-error   { background:#dc2626; color:#fff }
@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
</style>
