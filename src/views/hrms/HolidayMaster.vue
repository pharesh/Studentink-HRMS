<template>
  <div class="page-content">

    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Holiday Master</div>
        <div class="page-sub">Manage holidays by calendar year, department and employee type</div>
      </div>
      <button class="btn btn-primary" @click="openAdd" :disabled="!filters.calendarYearId">+ Add Holiday</button>
    </div>

    <!-- Stats -->
    <div class="stat-strip">
      <div class="stat-card"><div class="stat-val">{{ rows.length }}</div><div class="stat-lbl">Total</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => r.IsActive).length }}</div><div class="stat-lbl">Active</div></div>
      <div class="stat-card nat-card"><div class="stat-val">{{ rows.filter(r => r.HolidayType === 'National').length }}</div><div class="stat-lbl">National</div></div>
      <div class="stat-card opt-card"><div class="stat-val">{{ rows.filter(r => r.HolidayType === 'Optional').length }}</div><div class="stat-lbl">Optional</div></div>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-lbl">Calendar Year</label>
        <select class="filter-select" v-model="filters.calendarYearId" @change="load">
          <option value="">— Select Year —</option>
          <option v-for="cy in calendarYears" :key="cy.AYID" :value="cy.AYID">{{ cy.AcademicTitle }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-lbl">Department</label>
        <select class="filter-select" v-model="filters.deptId" @change="load">
          <option value="">All Departments</option>
          <option v-for="d in departments" :key="d.ADID" :value="d.ADID">{{ d.DPTitle }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-lbl">Employee Type</label>
        <select class="filter-select" v-model="filters.empTypeId" @change="load">
          <option value="">All Types</option>
          <option v-for="t in employeeTypes" :key="t.ETID" :value="t.ETID">{{ t.Name }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-lbl">Month</label>
        <select class="filter-select" v-model="filters.month" @change="load">
          <option value="">All Months</option>
          <option v-for="m in months" :key="m.val" :value="m.val">{{ m.label }}</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <div v-if="!filters.calendarYearId" class="table-empty">Select a calendar year to view holidays.</div>
      <div v-else-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th>Holiday Name</th>
            <th class="col-day">Day</th>
            <th class="col-date">Date</th>
            <th>Type</th>
            <th>Department</th>
            <th>Emp Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="9" class="table-empty">No holidays found for this selection.</td>
          </tr>
          <tr v-for="(row, i) in rows" :key="row.HMID">
            <td class="text-muted col-num">{{ i + 1 }}</td>
            <td class="fw-600">{{ row.HolidayName }}</td>
            <td class="col-day text-muted">{{ row.HolidayDay }}</td>
            <td class="col-date text-muted">{{ formatDate(row.HolidayDate) }}</td>
            <td><span class="type-badge" :class="`type-${row.HolidayType?.toLowerCase()}`">{{ row.HolidayType }}</span></td>
            <td class="text-muted">{{ deptName(row.DepartmentID) }}</td>
            <td class="text-muted">{{ empTypeName(row.EmployeeTypeID) }}</td>
            <td>
              <button
                class="status-toggle"
                :class="row.IsActive ? 'status-active' : 'status-inactive'"
                @click="toggleStatus(row)"
              >
                <span class="status-dot"></span>{{ row.IsActive ? 'Active' : 'Inactive' }}<span class="status-arrow">⇅</span>
              </button>
            </td>
            <td class="action-cell">
              <button class="act-btn act-edit" @click="openEdit(row)">✏ Edit</button>
              <button class="act-btn act-del"  @click="confirmDelete(row)">🗑 Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit Modal -->
    <Teleport to="body">
      <div v-if="modal.open" class="modal-backdrop" @click.self="modal.open = false">
        <div class="modal-box modal-md">
          <div class="modal-header">
            <span class="modal-title">{{ modal.id ? 'Edit Holiday' : 'Add Holiday' }}</span>
            <button class="modal-close" @click="modal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-grid-2">

              <div class="form-field span-2">
                <label class="form-label">Holiday Name <span class="req">*</span></label>
                <input class="form-input" v-model="modal.HolidayName" placeholder="e.g. Republic Day" :class="{ 'input-err': formErr.HolidayName }" />
                <span class="field-err" v-if="formErr.HolidayName">{{ formErr.HolidayName }}</span>
              </div>

              <div class="form-field">
                <label class="form-label">Holiday Date <span class="req">*</span></label>
                <input type="date" class="form-input" v-model="modal.HolidayDate" :class="{ 'input-err': formErr.HolidayDate }" />
                <span class="field-err" v-if="formErr.HolidayDate">{{ formErr.HolidayDate }}</span>
              </div>

              <div class="form-field">
                <label class="form-label">Holiday Type <span class="req">*</span></label>
                <select class="form-input" v-model="modal.HolidayType" :class="{ 'input-err': formErr.HolidayType }">
                  <option value="">— Select —</option>
                  <option v-for="ht in holidayTypes" :key="ht" :value="ht">{{ ht }}</option>
                </select>
                <span class="field-err" v-if="formErr.HolidayType">{{ formErr.HolidayType }}</span>
              </div>

              <div class="form-field">
                <label class="form-label">Department <span class="req">*</span></label>
                <select class="form-input" v-model="modal.DepartmentID" :class="{ 'input-err': formErr.DepartmentID }">
                  <option value="">— Select —</option>
                  <option v-for="d in departments" :key="d.ADID" :value="d.ADID">{{ d.DPTitle }}</option>
                </select>
                <span class="field-err" v-if="formErr.DepartmentID">{{ formErr.DepartmentID }}</span>
              </div>

              <div class="form-field">
                <label class="form-label">Employee Type <span class="req">*</span></label>
                <select class="form-input" v-model="modal.EmployeeTypeID" :class="{ 'input-err': formErr.EmployeeTypeID }">
                  <option value="">— Select —</option>
                  <option v-for="t in employeeTypes" :key="t.ETID" :value="t.ETID">{{ t.Name }}</option>
                </select>
                <span class="field-err" v-if="formErr.EmployeeTypeID">{{ formErr.EmployeeTypeID }}</span>
              </div>

            </div>
            <div v-if="saveErr" class="save-err">{{ saveErr }}</div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" @click="modal.open = false">Cancel</button>
            <button class="btn btn-primary" :disabled="saving" @click="save">
              {{ saving ? 'Saving…' : (modal.id ? 'Update' : 'Add Holiday') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirm Modal -->
    <Teleport to="body">
      <div v-if="delModal.open" class="modal-backdrop" @click.self="delModal.open = false">
        <div class="modal-box modal-sm">
          <div class="modal-header">
            <span class="modal-title">Delete Holiday</span>
            <button class="modal-close" @click="delModal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <p>Delete <strong>{{ delModal.name }}</strong> ({{ delModal.date }})? This cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" @click="delModal.open = false">Cancel</button>
            <button class="btn btn-danger" :disabled="deleting" @click="doDelete">
              {{ deleting ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route     = useRoute()
const academyId = parseInt(localStorage.getItem('academy_id') || '0')

// ── Lookup data ───────────────────────────────────────────────────
const calendarYears = ref([])
const departments   = ref([])
const employeeTypes = ref([])

const holidayTypes = ['National', 'Optional', 'Restricted', 'Custom']

const months = [
  { val: 1, label: 'January' },  { val: 2,  label: 'February' }, { val: 3,  label: 'March' },
  { val: 4, label: 'April' },    { val: 5,  label: 'May' },      { val: 6,  label: 'June' },
  { val: 7, label: 'July' },     { val: 8,  label: 'August' },   { val: 9,  label: 'September' },
  { val: 10, label: 'October' }, { val: 11, label: 'November' }, { val: 12, label: 'December' },
]

// ── Filters ───────────────────────────────────────────────────────
const filters = reactive({
  calendarYearId: '',
  deptId:   '',
  empTypeId: '',
  month:    '',
})

// ── Table data ────────────────────────────────────────────────────
const rows    = ref([])
const loading = ref(false)
const error   = ref('')

async function loadLookups() {
  try {
    const [cyRes, deptRes, etRes] = await Promise.all([
      api.get('/users/hrms/leave-calendar-years', { params: { academy_id: academyId } }),
      api.get('/users/hrms/departments',           { params: { academy_id: academyId } }),
      api.get('/users/hrms/employee-types',        { params: { academy_id: academyId } }),
    ])
    calendarYears.value = cyRes.data.data || []
    departments.value   = deptRes.data.data || []
    employeeTypes.value = etRes.data.data || []

    // Prefer year from route query (?year=AYID), fall back to current year
    const fromQuery = route.query.year ? parseInt(route.query.year) : null
    const preselect = fromQuery
      ? calendarYears.value.find(cy => cy.AYID === fromQuery)
      : calendarYears.value.find(cy => cy.IsCurrent)

    if (preselect) { filters.calendarYearId = preselect.AYID; await load() }
  } catch {
    error.value = 'Failed to load lookups.'
  }
}

async function load() {
  if (!filters.calendarYearId) { rows.value = []; return }
  loading.value = true; error.value = ''
  try {
    const params = {
      academy_id:       academyId,
      calendar_year_id: filters.calendarYearId,
    }
    if (filters.deptId)    params.dept_id     = filters.deptId
    if (filters.empTypeId) params.emp_type_id = filters.empTypeId
    if (filters.month)     params.month       = filters.month

    const { data } = await api.get('/users/hrms/holidays', { params })
    rows.value = data.data || []
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to load holidays.'
  } finally {
    loading.value = false
  }
}

// ── Helper lookups ────────────────────────────────────────────────
function deptName(id)    { return departments.value.find(d => d.ADID == id)?.DPTitle || id }
function empTypeName(id) { return employeeTypes.value.find(t => t.ETID == id)?.Name || id }

function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── Add / Edit ────────────────────────────────────────────────────
const modal   = reactive({ open: false, id: null, HolidayName: '', HolidayDate: '', HolidayType: '', DepartmentID: '', EmployeeTypeID: '' })
const formErr = ref({})
const saveErr = ref('')
const saving  = ref(false)

function blankModal() {
  return { open: true, id: null, HolidayName: '', HolidayDate: '', HolidayType: 'National', DepartmentID: '', EmployeeTypeID: '' }
}

function openAdd() {
  Object.assign(modal, blankModal())
  formErr.value = {}; saveErr.value = ''
}

function openEdit(row) {
  Object.assign(modal, {
    open:          true,
    id:            row.HMID,
    HolidayName:   row.HolidayName,
    HolidayDate:   row.HolidayDate?.substring(0, 10),
    HolidayType:   row.HolidayType,
    DepartmentID:  row.DepartmentID,
    EmployeeTypeID: row.EmployeeTypeID,
  })
  formErr.value = {}; saveErr.value = ''
}

function validate() {
  const err = {}
  if (!modal.HolidayName.trim())  err.HolidayName   = 'Holiday name is required'
  if (!modal.HolidayDate)         err.HolidayDate    = 'Date is required'
  if (!modal.HolidayType)         err.HolidayType    = 'Type is required'
  if (!modal.DepartmentID)        err.DepartmentID   = 'Department is required'
  if (!modal.EmployeeTypeID)      err.EmployeeTypeID = 'Employee type is required'
  formErr.value = err
  return Object.keys(err).length === 0
}

async function save() {
  if (!validate()) return
  saving.value = true; saveErr.value = ''
  try {
    const payload = {
      HolidayName:   modal.HolidayName.trim(),
      HolidayDate:   modal.HolidayDate,
      HolidayType:   modal.HolidayType,
      DepartmentID:  parseInt(modal.DepartmentID),
      EmployeeTypeID: parseInt(modal.EmployeeTypeID),
    }
    if (modal.id) {
      await api.put(`/users/hrms/holidays/${modal.id}`, payload)
    } else {
      await api.post('/users/hrms/holidays', {
        AcademyID:      academyId,
        CalendarYearID: parseInt(filters.calendarYearId),
        ...payload,
      })
    }
    modal.open = false
    await load()
  } catch (e) {
    saveErr.value = e.response?.data?.message || 'Save failed.'
  } finally {
    saving.value = false
  }
}

// ── Toggle status ─────────────────────────────────────────────────
async function toggleStatus(row) {
  try { await api.patch(`/users/hrms/holidays/${row.HMID}/toggle-status`); await load() }
  catch (e) { alert(e.response?.data?.message || 'Action failed.') }
}

// ── Delete ────────────────────────────────────────────────────────
const delModal = reactive({ open: false, id: null, name: '', date: '' })
const deleting = ref(false)

function confirmDelete(row) {
  Object.assign(delModal, { open: true, id: row.HMID, name: row.HolidayName, date: formatDate(row.HolidayDate) })
}

async function doDelete() {
  deleting.value = true
  try {
    await api.delete(`/users/hrms/holidays/${delModal.id}`)
    delModal.open = false
    await load()
  } catch (e) {
    alert(e.response?.data?.message || 'Delete failed.')
  } finally {
    deleting.value = false
  }
}

onMounted(loadLookups)
</script>

<style scoped>
.page-header-row  { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.page-title-inline { font-size: 17px; font-weight: 700; color: #1a1a2e; }
.page-sub         { font-size: 11.5px; color: #888; margin-top: 2px; }

/* Stats */
.stat-strip { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.stat-card  { background: #fff; border: 1px solid #e8e5de; border-radius: 8px; padding: 13px 20px; min-width: 100px; text-align: center; }
.nat-card   { border-color: #5b5fc7; background: #f5f4ff; }
.opt-card   { border-color: #e6a817; background: #fffbf0; }
.stat-val   { font-size: 22px; font-weight: 700; color: #1a1a2e; }
.stat-lbl   { font-size: 11px; color: #888780; margin-top: 2px; text-transform: uppercase; letter-spacing: .5px; }

/* Filters */
.filter-bar   { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; align-items: flex-end; }
.filter-group { display: flex; flex-direction: column; gap: 4px; }
.filter-lbl   { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: .4px; }
.filter-select { padding: 7px 10px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; color: #333; outline: none; min-width: 160px; }
.filter-select:focus { border-color: #5b5fc7; }

/* Table */
.table-wrap { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: #faf9f6; padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e8e5de; white-space: nowrap; }
.data-table td { padding: 10px 14px; border-bottom: 1px solid #f0ede8; color: #3a3a4a; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover { background: #fafafe; }

.col-num  { width: 48px; text-align: center; }
.col-day  { width: 90px; }
.col-date { width: 120px; }
.fw-600   { font-weight: 600; }
.text-muted { color: #888; }
.table-empty { text-align: center; padding: 40px; color: #aaa; font-size: 13px; }
.text-danger { color: #c0392b; }

/* Type badges */
.type-badge     { font-size: 11px; font-weight: 600; border-radius: 20px; padding: 3px 10px; white-space: nowrap; }
.type-national  { background: #e8eaff; color: #3a3fc8; }
.type-optional  { background: #fff8e0; color: #b07c00; }
.type-restricted { background: #fde8e8; color: #b03030; }
.type-custom    { background: #e8f9f0; color: #1a7a50; }

/* Status toggle */
.status-toggle  { display: inline-flex; align-items: center; gap: 5px; border: none; border-radius: 20px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background .15s; }
.status-dot     { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: .7; }
.status-arrow   { font-size: 9px; opacity: .6; }
.status-active  { background: #e6f9f0; color: #1a7a50; }
.status-inactive { background: #fbe9e9; color: #b84040; }

/* Action buttons */
.action-cell { white-space: nowrap; }
.act-btn     { border: none; border-radius: 6px; font-size: 11.5px; font-weight: 600; padding: 4px 10px; cursor: pointer; margin-right: 4px; transition: opacity .15s; }
.act-edit    { background: #eef0ff; color: #3a3fc8; }
.act-del     { background: #fde8e8; color: #b03030; }
.act-edit:hover { background: #e0e3ff; }
.act-del:hover  { background: #fbd5d5; }

/* Buttons */
.btn         { padding: 8px 16px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: opacity .15s; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.btn-primary { background: #5a5fc8; color: #fff; }
.btn-primary:not(:disabled):hover { background: #4a4fb8; }
.btn-ghost   { background: #f0f0f5; color: #555; }
.btn-ghost:hover { background: #e5e5ee; }
.btn-danger  { background: #c0392b; color: #fff; }
.btn-danger:not(:disabled):hover { background: #a93226; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-box      { background: #fff; border-radius: 12px; width: 100%; box-shadow: 0 8px 40px rgba(0,0,0,.18); display: flex; flex-direction: column; max-height: 90vh; }
.modal-md       { max-width: 540px; }
.modal-sm       { max-width: 400px; }
.modal-header   { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #eee; }
.modal-title    { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.modal-close    { background: none; border: none; font-size: 18px; color: #aaa; cursor: pointer; padding: 0 4px; }
.modal-close:hover { color: #555; }
.modal-body     { padding: 20px; overflow-y: auto; }
.modal-footer   { padding: 14px 20px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 8px; }

/* Form */
.form-grid-2  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.span-2       { grid-column: span 2; }
.form-field   { display: flex; flex-direction: column; gap: 4px; }
.form-label   { font-size: 12px; font-weight: 600; color: #555; }
.req          { color: #c0392b; }
.form-input   { border: 1px solid #e0ddd6; border-radius: 7px; padding: 8px 11px; font-size: 13px; outline: none; transition: border-color .15s; }
.form-input:focus { border-color: #5b5fc7; }
.input-err    { border-color: #e74c3c !important; }
.field-err    { font-size: 11px; color: #e74c3c; }
.save-err     { margin-top: 12px; padding: 10px 14px; background: #fde8e8; border-radius: 7px; font-size: 13px; color: #b03030; }
</style>
