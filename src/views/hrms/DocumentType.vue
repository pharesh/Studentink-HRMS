<template>
  <div class="page-content">

    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Document Type Master</div>
        <div class="page-sub">Manage document types — add, edit, or deactivate</div>
      </div>
      <button class="btn btn-primary" @click="openAdd">+ Add Document Type</button>
    </div>

    <div class="stat-strip">
      <div class="stat-card"><div class="stat-val">{{ rows.length }}</div><div class="stat-lbl">Total</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => r.IsActive).length }}</div><div class="stat-lbl">Active</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => !r.IsActive).length }}</div><div class="stat-lbl">Inactive</div></div>
    </div>

    <div class="toolbar">
      <input v-model="search" class="input-search" placeholder="Search document type…" />
    </div>

    <div class="table-wrap">
      <div v-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="5" class="table-empty">No document types found.</td>
          </tr>
          <tr v-for="(row, i) in filtered" :key="row.ADTID">
            <td class="text-muted">{{ i + 1 }}</td>
            <td class="fw-500">{{ row.Title }}</td>
            <td>
              <button class="status-toggle" :class="row.IsActive ? 'status-active' : 'status-inactive'" @click="toggleStatus(row)">
                <span class="status-dot"></span>
                {{ row.IsActive ? 'Active' : 'Inactive' }}
                <span class="status-arrow">⇅</span>
              </button>
            </td>
            <td class="text-muted">{{ formatDate(row.CreatedOn) }}</td>
            <td class="action-cell">
              <button class="act-btn act-edit" @click="openEdit(row)">✏ Edit</button>
              <button class="act-btn act-del"  @click="confirmDelete(row)">🗑 Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="modal.open" class="modal-backdrop" @click.self="modal.open = false">
        <div class="modal-box">
          <div class="modal-header">
            <span class="modal-title">{{ modal.id ? 'Edit Document Type' : 'Add Document Type' }}</span>
            <button class="modal-close" @click="modal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Title <span class="req">*</span></label>
              <input v-model="modal.Title" class="form-control" placeholder="e.g. Aadhaar, PAN Card, Passport" maxlength="100" />
              <span v-if="formErr.Title" class="field-err">{{ formErr.Title }}</span>
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

    <Teleport to="body">
      <div v-if="delModal.open" class="modal-backdrop" @click.self="delModal.open = false">
        <div class="modal-box modal-sm">
          <div class="modal-header">
            <span class="modal-title">Delete Document Type</span>
            <button class="modal-close" @click="delModal.open = false">✕</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ delModal.title }}</strong>?</p>
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
  rows.value.filter(r => r.Title.toLowerCase().includes(search.value.toLowerCase()))
)

async function load() {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/users/hrms/document-types', { params: { academy_id: academyId } })
    rows.value = data.data || []
  } catch { error.value = 'Failed to load document types.' }
  finally { loading.value = false }
}
onMounted(load)

const modal   = ref({ open: false, id: null, Title: '' })
const formErr = ref({})
const saveErr = ref('')
const saving  = ref(false)

function openAdd()     { modal.value = { open: true, id: null, Title: '' }; formErr.value = {}; saveErr.value = '' }
function openEdit(row) { modal.value = { open: true, id: row.ADTID, Title: row.Title }; formErr.value = {}; saveErr.value = '' }

async function save() {
  formErr.value = {}; saveErr.value = ''
  if (!modal.value.Title.trim()) { formErr.value.Title = 'Title is required'; return }
  saving.value = true
  try {
    if (modal.value.id) {
      await api.put(`/users/hrms/document-types/${modal.value.id}`, { Title: modal.value.Title.trim() })
    } else {
      await api.post('/users/hrms/document-types', { AcademyID: parseInt(academyId), Title: modal.value.Title.trim() })
    }
    modal.value.open = false; await load()
  } catch (e) {
    saveErr.value = e.response?.data?.message || 'Save failed.'
  } finally { saving.value = false }
}

async function toggleStatus(row) {
  try { await api.patch(`/users/hrms/document-types/${row.ADTID}/toggle-status`); await load() } catch {}
}

const delModal = ref({ open: false, id: null, title: '' })
const deleting = ref(false)
function confirmDelete(row) { delModal.value = { open: true, id: row.ADTID, title: row.Title } }
async function doDelete() {
  deleting.value = true
  try { await api.delete(`/users/hrms/document-types/${delModal.value.id}`); delModal.value.open = false; await load() }
  catch {} finally { deleting.value = false }
}

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
.toolbar { margin-bottom: 14px; }
.input-search { padding: 8px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; width: 280px; outline: none; }
.input-search:focus { border-color: #5b5fc7; }
.table-wrap { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: #faf9f6; padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e8e5de; }
.data-table td { padding: 12px 14px; border-bottom: 1px solid #f0ede8; color: #3a3a4a; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: #faf9f6; }
.table-empty { text-align: center; padding: 40px; color: #888780; font-size: 13px; }
.fw-500 { font-weight: 500; }
.text-muted { color: #888780; }
.text-danger { color: #c0392b; }
.status-toggle { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px 4px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.status-arrow { font-size: 10px; opacity: 0.6; margin-left: 2px; }
.status-active   { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
.status-active   .status-dot { background: #2e7d32; }
.status-active:hover   { background: #fdf5f0; color: #b7620a; border-color: #ffd54f; }
.status-inactive { background: #f0ede8; color: #888780; border-color: #ddd9d0; }
.status-inactive .status-dot { background: #aaa; }
.status-inactive:hover { background: #e8f5e9; color: #2e7d32; border-color: #a5d6a7; }
.action-cell { display: flex; gap: 6px; align-items: center; }
.act-btn { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; white-space: nowrap; }
.act-edit { background: #eef2ff; color: #3730a3; border-color: #c7d2fe; }
.act-edit:hover { background: #e0e7ff; }
.act-del  { background: #fdecea; color: #c0392b; border-color: #f5c6cb; }
.act-del:hover { background: #f8d7da; }
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; z-index: 9000; }
.modal-box    { background: #fff; border-radius: 12px; width: 440px; box-shadow: 0 12px 40px rgba(0,0,0,.15); overflow: hidden; }
.modal-sm     { width: 360px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-bottom: 1px solid #f0ede8; }
.modal-title  { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.modal-close  { background: none; border: none; font-size: 16px; cursor: pointer; color: #888; }
.modal-body   { padding: 22px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 22px; border-top: 1px solid #f0ede8; }
.form-group  { margin-bottom: 16px; }
.form-label  { display: block; font-size: 12px; font-weight: 600; color: #3a3a4a; margin-bottom: 6px; }
.req { color: #c0392b; }
.form-control { width: 100%; padding: 9px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; box-sizing: border-box; outline: none; }
.form-control:focus { border-color: #5b5fc7; }
.field-err { color: #c0392b; font-size: 11px; margin-top: 4px; display: block; }
.save-err  { color: #c0392b; font-size: 12px; margin-top: 8px; }
.btn { padding: 8px 18px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
.btn-primary { background: #1a1a2e; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #2d2d4e; }
.btn-primary:disabled { opacity: .6; cursor: default; }
.btn-ghost  { background: #f5f4f0; color: #3a3a4a; border: 1px solid #e0ddd6; }
.btn-ghost:hover { background: #eceae4; }
.btn-danger { background: #c0392b; color: #fff; }
.btn-danger:hover:not(:disabled) { background: #a93226; }
.btn-danger:disabled { opacity: .6; cursor: default; }
</style>
