<template>
  <div class="page-content">

    <!-- Header row -->
    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Department Master</div>
        <div class="page-sub">Manage academy departments — add, edit, or deactivate</div>
      </div>
      <button class="btn btn-primary" @click="openAdd">+ Add Department</button>
    </div>

    <!-- Stats strip -->
    <div class="stat-strip">
      <div class="stat-card">
        <div class="stat-val">{{ rows.length }}</div>
        <div class="stat-lbl">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{{ rows.filter(r => r.IsActive).length }}</div>
        <div class="stat-lbl">Active</div>
      </div>
      <div class="stat-card">
        <div class="stat-val">{{ rows.filter(r => !r.IsActive).length }}</div>
        <div class="stat-lbl">Inactive</div>
      </div>
    </div>

    <!-- Search -->
    <div class="toolbar">
      <input v-model="search" class="input-search" placeholder="Search department name…" />
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <div v-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error"  class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="6" class="table-empty">No departments found.</td>
          </tr>
          <tr v-for="(row, i) in filtered" :key="row.ADID">
            <td class="text-muted">{{ i + 1 }}</td>
            <td class="fw-500">{{ row.DPTitle }}</td>
            <td class="text-muted">{{ row.DPDescription || '—' }}</td>
            <td>
              <span class="badge" :class="row.IsActive ? 'badge-green' : 'badge-grey'">
                {{ row.IsActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="text-muted">{{ formatDate(row.CreatedOn) }}</td>
            <td class="action-cell">
              <button class="btn-link" @click="openEdit(row)">Edit</button>
              <button class="btn-link" :class="row.IsActive ? 'text-warn' : 'text-ok'" @click="toggleStatus(row)">
                {{ row.IsActive ? 'Deactivate' : 'Activate' }}
              </button>
              <button class="btn-link text-danger" @click="confirmDelete(row)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add / Edit modal -->
    <Teleport to="body">
      <div v-if="modal.open" class="modal-backdrop" @click.self="modal.open = false">
        <div class="modal-box">
          <div class="modal-header">
            <span class="modal-title">{{ modal.id ? 'Edit Department' : 'Add Department' }}</span>
            <button class="modal-close" @click="modal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Department Name <span class="req">*</span></label>
              <input v-model="modal.DPTitle" class="form-control" placeholder="e.g. Mathematics" maxlength="50" />
              <span v-if="formErr.DPTitle" class="field-err">{{ formErr.DPTitle }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea v-model="modal.DPDescription" class="form-control" rows="3" placeholder="Optional description…" maxlength="200" />
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

    <!-- Delete confirm modal -->
    <Teleport to="body">
      <div v-if="delModal.open" class="modal-backdrop" @click.self="delModal.open = false">
        <div class="modal-box modal-sm">
          <div class="modal-header">
            <span class="modal-title">Delete Department</span>
            <button class="modal-close" @click="delModal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ delModal.title }}</strong>? This cannot be undone.</p>
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
import api from '@/services/api'

const academyId = localStorage.getItem('academy_id') || ''

const rows    = ref([])
const loading = ref(true)
const error   = ref('')
const search  = ref('')

const filtered = computed(() =>
  rows.value.filter(r =>
    r.DPTitle.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function load() {
  loading.value = true
  error.value   = ''
  try {
    const { data } = await api.get('/users/hrms/departments', { params: { academy_id: academyId } })
    rows.value = data.data || []
  } catch (e) {
    error.value = 'Failed to load departments.'
  } finally {
    loading.value = false
  }
}

onMounted(load)

// ── Add / Edit modal ─────────────────────────────────────────────
const modal   = ref({ open: false, id: null, DPTitle: '', DPDescription: '' })
const formErr = ref({})
const saveErr = ref('')
const saving  = ref(false)

function openAdd() {
  modal.value = { open: true, id: null, DPTitle: '', DPDescription: '' }
  formErr.value = {}
  saveErr.value = ''
}

function openEdit(row) {
  modal.value = { open: true, id: row.ADID, DPTitle: row.DPTitle, DPDescription: row.DPDescription || '' }
  formErr.value = {}
  saveErr.value = ''
}

async function save() {
  formErr.value = {}
  saveErr.value = ''
  if (!modal.value.DPTitle.trim()) { formErr.value.DPTitle = 'Name is required'; return }

  saving.value = true
  try {
    if (modal.value.id) {
      await api.put(`/users/hrms/departments/${modal.value.id}`, {
        DPTitle: modal.value.DPTitle.trim(),
        DPDescription: modal.value.DPDescription.trim() || null,
      })
    } else {
      await api.post('/users/hrms/departments', {
        AcademyID:     parseInt(academyId),
        DPTitle:       modal.value.DPTitle.trim(),
        DPDescription: modal.value.DPDescription.trim() || null,
      })
    }
    modal.value.open = false
    await load()
  } catch (e) {
    saveErr.value = e.response?.data?.message || 'Save failed. Please try again.'
  } finally {
    saving.value = false
  }
}

// ── Toggle status ────────────────────────────────────────────────
async function toggleStatus(row) {
  try {
    await api.patch(`/users/hrms/departments/${row.ADID}/toggle-status`)
    await load()
  } catch { /* ignore */ }
}

// ── Delete modal ─────────────────────────────────────────────────
const delModal = ref({ open: false, id: null, title: '' })
const deleting = ref(false)

function confirmDelete(row) {
  delModal.value = { open: true, id: row.ADID, title: row.DPTitle }
}

async function doDelete() {
  deleting.value = true
  try {
    await api.delete(`/users/hrms/departments/${delModal.value.id}`)
    delModal.value.open = false
    await load()
  } catch { /* ignore */ } finally {
    deleting.value = false
  }
}

// ── Helpers ──────────────────────────────────────────────────────
function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.page-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.page-title-inline { font-size: 16px; font-weight: 700; color: #1a1a2e; }
.page-sub { font-size: 12px; color: #888780; margin-top: 2px; }

.stat-strip { display: flex; gap: 14px; margin-bottom: 20px; }
.stat-card  { background: #fff; border: 1px solid #e8e5de; border-radius: 8px; padding: 14px 20px; min-width: 100px; text-align: center; }
.stat-val   { font-size: 22px; font-weight: 700; color: #1a1a2e; }
.stat-lbl   { font-size: 11px; color: #888780; margin-top: 2px; text-transform: uppercase; letter-spacing: .5px; }

.toolbar      { margin-bottom: 14px; }
.input-search { padding: 8px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; width: 280px; outline: none; }
.input-search:focus { border-color: #5b5fc7; }

.table-wrap   { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; overflow: hidden; }
.data-table   { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: #faf9f6; padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e8e5de; }
.data-table td { padding: 12px 14px; border-bottom: 1px solid #f0ede8; color: #3a3a4a; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: #faf9f6; }

.table-empty { text-align: center; padding: 40px; color: #888780; font-size: 13px; }
.fw-500 { font-weight: 500; }
.text-muted { color: #888780; }
.text-danger { color: #c0392b; }
.text-warn  { color: #b7620a; }
.text-ok    { color: #2e7d32; }

.badge       { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge-green { background: #e8f5e9; color: #2e7d32; }
.badge-grey  { background: #f0ede8; color: #888780; }

.action-cell  { display: flex; gap: 10px; align-items: center; }
.btn-link     { background: none; border: none; font-size: 12px; cursor: pointer; padding: 0; font-weight: 500; color: #5b5fc7; }
.btn-link:hover { text-decoration: underline; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; z-index: 9000; }
.modal-box      { background: #fff; border-radius: 12px; width: 480px; box-shadow: 0 12px 40px rgba(0,0,0,.15); overflow: hidden; }
.modal-sm       { width: 360px; }
.modal-header   { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-bottom: 1px solid #f0ede8; }
.modal-title    { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.modal-close    { background: none; border: none; font-size: 16px; cursor: pointer; color: #888; padding: 0; }
.modal-body     { padding: 22px; }
.modal-footer   { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 22px; border-top: 1px solid #f0ede8; }

.form-group   { margin-bottom: 16px; }
.form-label   { display: block; font-size: 12px; font-weight: 600; color: #3a3a4a; margin-bottom: 6px; }
.req          { color: #c0392b; }
.form-control { width: 100%; padding: 9px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; box-sizing: border-box; outline: none; font-family: inherit; }
.form-control:focus { border-color: #5b5fc7; }
.field-err  { color: #c0392b; font-size: 11px; margin-top: 4px; display: block; }
.save-err   { color: #c0392b; font-size: 12px; margin-top: 8px; }

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
