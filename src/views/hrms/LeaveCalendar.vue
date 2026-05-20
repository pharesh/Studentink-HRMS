<template>
  <div class="page-content">

    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Leave Calendar Year</div>
        <div class="page-sub">Manage academic / leave years — set current, lock, or deactivate</div>
      </div>
      <button class="btn btn-primary" @click="openAdd">+ Add Calendar Year</button>
    </div>

    <!-- Stats -->
    <div class="stat-strip">
      <div class="stat-card"><div class="stat-val">{{ rows.length }}</div><div class="stat-lbl">Total</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => r.IsActive).length }}</div><div class="stat-lbl">Active</div></div>
      <div class="stat-card current-card">
        <div class="stat-val current-title">{{ currentYear?.AcademicTitle || '—' }}</div>
        <div class="stat-lbl">Current Year</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <input v-model="search" class="input-search" placeholder="Search year…" />
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <div v-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Academic Title</th>
            <th>Prefix</th>
            <th>Period</th>
            <th>Flags</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="7" class="table-empty">No calendar years found.</td>
          </tr>
          <tr v-for="(row, i) in filtered" :key="row.AYID" :class="{ 'row-current': row.IsCurrent }">
            <td class="text-muted">{{ i + 1 }}</td>
            <td>
              <div class="fw-600">{{ row.AcademicTitle }}</div>
              <span v-if="row.IsCurrent" class="badge-current">Current</span>
            </td>
            <td class="text-muted">{{ row.Prefix || '—' }}</td>
            <td class="text-muted text-xs">
              {{ formatDate(row.StartDate) }} → {{ formatDate(row.EndDate) }}
            </td>
            <td>
              <div class="flags-cell">
                <span class="flag" :class="row.IsSemester      ? 'flag-on' : 'flag-off'" title="Semester">SEM</span>
                <span class="flag" :class="row.IsAdmissionYear ? 'flag-on' : 'flag-off'" title="Admission Year">ADM</span>
                <span class="flag" :class="row.IsLocked        ? 'flag-lock' : 'flag-off'" title="Locked">🔒</span>
              </div>
            </td>
            <td>
              <button class="status-toggle" :class="row.IsActive ? 'status-active' : 'status-inactive'" @click="toggleStatus(row)">
                <span class="status-dot"></span>{{ row.IsActive ? 'Active' : 'Inactive' }}<span class="status-arrow">⇅</span>
              </button>
            </td>
            <td class="action-cell">
              <button v-if="!row.IsCurrent" class="act-btn act-current" @click="setCurrent(row)" title="Set as current year">⭐ Set Current</button>
              <button class="act-btn" :class="row.IsLocked ? 'act-unlock' : 'act-lock'" @click="toggleLock(row)">
                {{ row.IsLocked ? '🔓 Unlock' : '🔒 Lock' }}
              </button>
              <button class="act-btn act-edit" :disabled="row.IsLocked" @click="openEdit(row)">✏ Edit</button>
              <button class="act-btn act-del"  :disabled="row.IsCurrent" @click="confirmDelete(row)">🗑 Delete</button>
              <button class="act-btn act-holiday" @click="router.push({ name: 'hrms-holiday', query: { year: row.AYID } })">📅 Holiday</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="modal.open" class="modal-backdrop" @click.self="modal.open = false">
        <div class="modal-box modal-lg">
          <div class="modal-header">
            <span class="modal-title">{{ modal.id ? 'Edit Calendar Year' : 'Add Calendar Year' }}</span>
            <button class="modal-close" @click="modal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="modal-grid">
              <div class="form-group">
                <label class="form-label">Academic Title <span class="req">*</span></label>
                <input v-model="modal.AcademicTitle" class="form-control" maxlength="150" placeholder="e.g. 2025-26" />
                <span v-if="formErr.AcademicTitle" class="field-err">{{ formErr.AcademicTitle }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">Prefix</label>
                <input v-model="modal.Prefix" class="form-control" maxlength="50" placeholder="e.g. AY" />
              </div>
              <div class="form-group">
                <label class="form-label">Start Date <span class="req">*</span></label>
                <input v-model="modal.StartDate" type="date" class="form-control" />
                <span v-if="formErr.StartDate" class="field-err">{{ formErr.StartDate }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">End Date <span class="req">*</span></label>
                <input v-model="modal.EndDate" type="date" class="form-control" />
                <span v-if="formErr.EndDate" class="field-err">{{ formErr.EndDate }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">Sort Order</label>
                <input v-model.number="modal.Order" type="number" class="form-control" min="0" placeholder="0" />
              </div>
              <div class="form-group flags-group">
                <label class="form-label">Options</label>
                <div class="toggle-row">
                  <label class="toggle-label">
                    <input type="checkbox" v-model="modal.IsSemester" />
                    <span class="toggle-text">Semester-based year</span>
                  </label>
                  <label class="toggle-label">
                    <input type="checkbox" v-model="modal.IsAdmissionYear" />
                    <span class="toggle-text">Admission year</span>
                  </label>
                </div>
              </div>
            </div>
            <p v-if="saveErr" class="save-err">{{ saveErr }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" @click="modal.open = false">Cancel</button>
            <button class="btn btn-primary" :disabled="saving" @click="save">
              {{ saving ? 'Saving…' : (modal.id ? 'Update' : 'Create') }}
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
            <span class="modal-title">Delete Calendar Year</span>
            <button class="modal-close" @click="delModal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <p>Delete <strong>{{ delModal.title }}</strong>? This cannot be undone.</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const academyId = localStorage.getItem('academy_id') || ''
const rows      = ref([])
const loading   = ref(true)
const error     = ref('')
const search    = ref('')

const filtered     = computed(() =>
  rows.value.filter(r => r.AcademicTitle.toLowerCase().includes(search.value.toLowerCase()))
)
const currentYear  = computed(() => rows.value.find(r => r.IsCurrent))

async function load() {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/users/hrms/leave-calendar-years', { params: { academy_id: academyId } })
    rows.value = data.data || []
  } catch { error.value = 'Failed to load calendar years.' }
  finally { loading.value = false }
}
onMounted(load)

// ── Add / Edit ────────────────────────────────────────────────────
const modal   = ref({ open: false, id: null, AcademicTitle: '', Prefix: '', StartDate: '', EndDate: '', Order: 0, IsSemester: false, IsAdmissionYear: false })
const formErr = ref({})
const saveErr = ref('')
const saving  = ref(false)

function openAdd() {
  modal.value = { open: true, id: null, AcademicTitle: '', Prefix: '', StartDate: '', EndDate: '', Order: 0, IsSemester: false, IsAdmissionYear: false }
  formErr.value = {}; saveErr.value = ''
}
function openEdit(row) {
  modal.value = {
    open: true, id: row.AYID,
    AcademicTitle:   row.AcademicTitle   || '',
    Prefix:          row.Prefix          || '',
    StartDate:       row.StartDate       ? row.StartDate.substring(0, 10) : '',
    EndDate:         row.EndDate         ? row.EndDate.substring(0, 10)   : '',
    Order:           row.Order           ?? 0,
    IsSemester:      !!row.IsSemester,
    IsAdmissionYear: !!row.IsAdmissionYear,
  }
  formErr.value = {}; saveErr.value = ''
}

async function save() {
  formErr.value = {}; saveErr.value = ''
  if (!modal.value.AcademicTitle.trim()) { formErr.value.AcademicTitle = 'Title is required'; return }
  if (!modal.value.StartDate)            { formErr.value.StartDate      = 'Start date required'; return }
  if (!modal.value.EndDate)              { formErr.value.EndDate        = 'End date required'; return }
  saving.value = true
  try {
    const payload = {
      AcademicTitle:   modal.value.AcademicTitle.trim(),
      Prefix:          modal.value.Prefix.trim(),
      StartDate:       modal.value.StartDate,
      EndDate:         modal.value.EndDate,
      Order:           modal.value.Order || 0,
      IsSemester:      modal.value.IsSemester      ? 1 : 0,
      IsAdmissionYear: modal.value.IsAdmissionYear ? 1 : 0,
    }
    if (modal.value.id) {
      await api.put(`/users/hrms/leave-calendar-years/${modal.value.id}`, payload)
    } else {
      await api.post('/users/hrms/leave-calendar-years', { AcademyID: parseInt(academyId), ...payload })
    }
    modal.value.open = false; await load()
  } catch (e) {
    saveErr.value = e.response?.data?.message || 'Save failed.'
  } finally { saving.value = false }
}

// ── Actions ───────────────────────────────────────────────────────
async function toggleStatus(row) {
  try { await api.patch(`/users/hrms/leave-calendar-years/${row.AYID}/toggle-status`); await load() }
  catch (e) { alert(e.response?.data?.message || 'Action failed.') }
}

async function setCurrent(row) {
  try { await api.patch(`/users/hrms/leave-calendar-years/${row.AYID}/set-current`); await load() }
  catch (e) { alert(e.response?.data?.message || 'Action failed.') }
}

async function toggleLock(row) {
  try { await api.patch(`/users/hrms/leave-calendar-years/${row.AYID}/toggle-locked`); await load() }
  catch (e) { alert(e.response?.data?.message || 'Action failed.') }
}

const delModal = ref({ open: false, id: null, title: '' })
const deleting = ref(false)
function confirmDelete(row) { delModal.value = { open: true, id: row.AYID, title: row.AcademicTitle } }
async function doDelete() {
  deleting.value = true
  try {
    await api.delete(`/users/hrms/leave-calendar-years/${delModal.value.id}`)
    delModal.value.open = false; await load()
  } catch (e) {
    alert(e.response?.data?.message || 'Delete failed.')
  } finally { deleting.value = false }
}

function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.page-header-row  { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.page-title-inline { font-size: 16px; font-weight: 700; color: #1a1a2e; }
.page-sub         { font-size: 12px; color: #888780; margin-top: 2px; }

/* Stats */
.stat-strip  { display: flex; gap: 14px; margin-bottom: 20px; }
.stat-card   { background: #fff; border: 1px solid #e8e5de; border-radius: 8px; padding: 14px 20px; min-width: 100px; text-align: center; }
.current-card { min-width: 160px; border-color: #5b5fc7; background: #f5f4ff; }
.stat-val    { font-size: 22px; font-weight: 700; color: #1a1a2e; }
.current-title { font-size: 16px; }
.stat-lbl    { font-size: 11px; color: #888780; margin-top: 2px; text-transform: uppercase; letter-spacing: .5px; }

/* Toolbar */
.toolbar     { margin-bottom: 14px; }
.input-search { padding: 8px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; width: 280px; outline: none; }
.input-search:focus { border-color: #5b5fc7; }

/* Table */
.table-wrap  { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; overflow: hidden; }
.data-table  { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: #faf9f6; padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e8e5de; }
.data-table td { padding: 11px 14px; border-bottom: 1px solid #f0ede8; color: #3a3a4a; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td      { background: #faf9f6; }
.row-current td              { background: #f8f7ff !important; }
.table-empty  { text-align: center; padding: 40px; color: #888780; font-size: 13px; }
.fw-600       { font-weight: 600; }
.text-muted   { color: #888780; }
.text-danger  { color: #c0392b; }
.text-xs      { font-size: 11px; }

/* Current badge */
.badge-current { background: #5b5fc7; color: #fff; padding: 1px 7px; border-radius: 10px; font-size: 10px; font-weight: 700; display: inline-block; margin-top: 3px; }

/* Flags */
.flags-cell   { display: flex; gap: 4px; }
.flag         { padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
.flag-on      { background: #e8f5e9; color: #2e7d32; }
.flag-off     { background: #f0ede8; color: #aaa9a3; }
.flag-lock    { background: #fff3e0; color: #e65100; }

/* Status toggle */
.status-toggle { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px 4px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; }
.status-dot    { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.status-arrow  { font-size: 10px; opacity: 0.6; margin-left: 2px; }
.status-active { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
.status-active .status-dot { background: #2e7d32; }
.status-active:hover { background: #fdf5f0; color: #b7620a; border-color: #ffd54f; }
.status-inactive { background: #f0ede8; color: #888780; border-color: #ddd9d0; }
.status-inactive .status-dot { background: #aaa; }
.status-inactive:hover { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }

/* Actions */
.action-cell  { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; }
.act-btn      { display: inline-flex; align-items: center; gap: 3px; padding: 4px 9px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; white-space: nowrap; }
.act-btn:disabled { opacity: .45; cursor: default; }
.act-current  { background: #f5f4ff; color: #5b5fc7; border-color: #c7c9f7; }
.act-current:hover { background: #ebebff; }
.act-lock     { background: #fff3e0; color: #e65100; border-color: #ffcc80; }
.act-lock:hover { background: #ffe0b2; }
.act-unlock   { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
.act-unlock:hover { background: #c8e6c9; }
.act-edit     { background: #eef2ff; color: #3730a3; border-color: #c7d2fe; }
.act-edit:hover:not(:disabled) { background: #e0e7ff; }
.act-del      { background: #fdecea; color: #c0392b; border-color: #f5c6cb; }
.act-del:hover:not(:disabled) { background: #f8d7da; }
.act-holiday  { background: #e8f4fd; color: #1565c0; border-color: #90caf9; }
.act-holiday:hover { background: #bbdefb; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; z-index: 9000; }
.modal-box      { background: #fff; border-radius: 12px; width: 480px; box-shadow: 0 12px 40px rgba(0,0,0,.15); overflow: hidden; }
.modal-lg       { width: 560px; }
.modal-sm       { width: 360px; }
.modal-header   { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-bottom: 1px solid #f0ede8; }
.modal-title    { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.modal-close    { background: none; border: none; font-size: 16px; cursor: pointer; color: #888; }
.modal-body     { padding: 22px; }
.modal-footer   { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 22px; border-top: 1px solid #f0ede8; }
.modal-grid     { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
.form-group     { display: flex; flex-direction: column; }
.flags-group    { grid-column: span 2; }
.form-label     { font-size: 12px; font-weight: 600; color: #3a3a4a; margin-bottom: 5px; }
.req            { color: #c0392b; }
.form-control   { padding: 8px 11px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; outline: none; }
.form-control:focus { border-color: #5b5fc7; }
.field-err      { color: #c0392b; font-size: 11px; margin-top: 3px; }
.save-err       { color: #c0392b; font-size: 12px; margin-top: 10px; }
.toggle-row     { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
.toggle-label   { display: flex; align-items: center; gap: 7px; font-size: 12px; color: #3a3a4a; cursor: pointer; }
.toggle-text    { user-select: none; }

/* Buttons */
.btn         { padding: 8px 18px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
.btn-primary { background: #1a1a2e; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #2d2d4e; }
.btn-primary:disabled { opacity: .6; cursor: default; }
.btn-ghost   { background: #f5f4f0; color: #3a3a4a; border: 1px solid #e0ddd6; }
.btn-ghost:hover { background: #eceae4; }
.btn-danger  { background: #c0392b; color: #fff; }
.btn-danger:hover:not(:disabled) { background: #a93226; }
.btn-danger:disabled { opacity: .6; cursor: default; }
</style>
