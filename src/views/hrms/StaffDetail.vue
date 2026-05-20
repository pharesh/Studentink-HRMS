<template>
  <div class="page-content">

    <!-- Header -->
    <div v-if="!loading" class="staff-header">
      <div class="staff-avatar" :style="avatarBg">
        <img v-if="staff.ProfileImage" :src="staff.ProfileImage" class="avatar-img" />
        <span v-else>{{ initials }}</span>
      </div>
      <div class="staff-meta">
        <div class="staff-name">{{ staff.FirstName }} {{ staff.LastName }}</div>
        <div class="staff-sub">{{ staff.employee_code || staff.EmployeeID || '—' }} · {{ staff.Designation || '—' }} · {{ staff.Department || '—' }}</div>
      </div>
      <span class="status-pill" :class="staff.IsActive ? 'pill-active' : 'pill-inactive'">
        <span class="dot"></span>{{ staff.IsActive ? 'Active' : 'Inactive' }}
      </span>
      <button class="btn btn-ghost" @click="router.push({ name: 'hrms-staff' })">← Back to list</button>
    </div>

    <!-- Skeleton header while loading -->
    <div v-else class="staff-header">
      <div class="staff-avatar skel-circle"></div>
      <div><div class="skel-line" style="width:160px;margin-bottom:6px"></div><div class="skel-line" style="width:220px"></div></div>
    </div>

    <!-- Tabs -->
    <div class="tab-bar">
      <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        {{ tab.label }}
      </div>
    </div>

    <!-- Tab: Basic Info -->
    <div v-if="activeTab === 'basic'">
      <div v-if="loadErr" class="load-err">{{ loadErr }}</div>
      <div v-else class="two-col">

        <!-- Personal Information -->
        <div class="card">
          <div class="card-title">Personal Information</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">First Name <span class="req">*</span></label>
              <input v-model="form.FirstName" class="form-control" maxlength="50" />
              <span v-if="ferr.FirstName" class="field-err">{{ ferr.FirstName }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Last Name <span class="req">*</span></label>
              <input v-model="form.LastName" class="form-control" maxlength="50" />
              <span v-if="ferr.LastName" class="field-err">{{ ferr.LastName }}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Date of Birth</label>
              <input v-model="form.BirthDate" type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select v-model="form.Gender" class="form-control">
                <option value="">— Select —</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Mobile</label>
              <input v-model="form.ContactNo" class="form-control" maxlength="20" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="form.EmailAddress" type="email" class="form-control" maxlength="150" />
            </div>
            <div class="form-group">
              <label class="form-label">Blood Group</label>
              <select v-model="form.blood_group" class="form-control">
                <option value="">— Select —</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Emergency Contact</label>
              <input v-model="form.EmergencyContactNo" class="form-control" maxlength="45" />
            </div>
          </div>
          <p v-if="saveErr" class="save-err">{{ saveErr }}</p>
          <div class="card-footer">
            <button class="btn btn-ghost" @click="resetForm">Cancel</button>
            <button class="btn btn-primary" :disabled="saving" @click="saveBasicInfo">
              {{ saving ? 'Saving…' : 'Save Changes' }}
            </button>
          </div>
        </div>

        <!-- Photo + Academy -->
        <div class="card">
          <div class="card-title">Profile Photo</div>
          <div class="photo-wrap">
            <div class="photo-avatar" :style="avatarBg">
              <img v-if="photoPreview || staff.ProfileImage" :src="photoPreview || staff.ProfileImage" class="photo-img" />
              <span v-else>{{ initials }}</span>
            </div>
          </div>
          <div class="photo-hint">JPG or PNG · Max 5MB · Auto-resized to 200×200px</div>
          <input ref="fileInput" type="file" accept="image/jpeg,image/png" style="display:none" @change="onFileChange" />
          <button class="btn btn-outline" :disabled="uploading" @click="fileInput.click()">
            {{ uploading ? 'Uploading…' : 'Upload New Photo' }}
          </button>
          <p v-if="photoErr" class="save-err">{{ photoErr }}</p>

          <div class="section-sep"></div>
          <div class="section-label">Academy Assignment</div>
          <div class="academy-row">
            <span class="academy-name">{{ academyName }}</span>
            <span class="badge-primary">Primary · 100%</span>
          </div>
          <div class="info-banner">Multi-academy: assign cost-centre % to split payroll across academies.</div>
        </div>

      </div>
    </div>

    <!-- Tab: Employment -->
    <div v-if="activeTab === 'employment'">
      <div v-if="dropsLoading" class="table-empty">Loading…</div>
      <div v-else class="two-col">

        <!-- Employment Details -->
        <div class="card">
          <div class="card-title">Employment Details</div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Department</label>
              <select v-model="empForm.DepartmentID" class="form-control">
                <option value="">— Select —</option>
                <option v-for="d in departments" :key="d.ADID" :value="d.ADID">{{ d.DPTitle }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Designation</label>
              <select v-model="empForm.DesignationID" class="form-control">
                <option value="">— Select —</option>
                <option v-for="d in designations" :key="d.ADID" :value="d.ADID">{{ d.Name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Employment Type</label>
              <select v-model="empForm.EmploymentType_ID" class="form-control">
                <option value="">— Select —</option>
                <option v-for="e in employmentTypes" :key="e.Id" :value="e.Id">{{ e.Name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Employee Type</label>
              <select v-model="empForm.Type_ID" class="form-control">
                <option value="">— Select —</option>
                <option v-for="e in employeeTypes" :key="e.ETID" :value="e.ETID">{{ e.Name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Grade Pay</label>
              <input v-model="empForm.GradePay" class="form-control" maxlength="45" placeholder="e.g. GP-5000" />
            </div>
            <div class="form-group">
              <label class="form-label">Manager</label>
              <select v-model="empForm.ManagerID" class="form-control">
                <option value="">— None —</option>
                <option v-for="f in facultyForMgr" :key="f.FMID" :value="f.FMID">{{ f.FirstName }} {{ f.LastName }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Sr. Manager</label>
              <select v-model="empForm.SrManagerID" class="form-control">
                <option value="">— None —</option>
                <option v-for="f in facultyForMgr" :key="f.FMID" :value="f.FMID">{{ f.FirstName }} {{ f.LastName }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date of Joining</label>
              <input v-model="empForm.JoiningDate" type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Date of Leaving</label>
              <input v-model="empForm.LeavingDate" type="date" class="form-control" />
              <span class="field-hint">Leave blank if currently employed</span>
            </div>
          </div>
          <p v-if="empSaveErr" class="save-err">{{ empSaveErr }}</p>
          <div class="card-footer">
            <button class="btn btn-ghost" @click="populateEmpForm">Cancel</button>
            <button class="btn btn-primary" :disabled="empSaving" @click="saveEmployment">
              {{ empSaving ? 'Saving…' : 'Save Changes' }}
            </button>
          </div>
        </div>

        <!-- Academy Assignments -->
        <div class="card">
          <div class="card-title">Academy Assignments</div>
          <div class="assign-header">
            <span class="assign-col-lbl">Academy</span>
            <span class="assign-col-lbl pct-lbl">Cost %</span>
          </div>
          <div v-for="(row, i) in assignments" :key="i" class="assign-row">
            <div class="assign-academy">
              <div class="assign-dot" :class="row.isPrimary ? 'dot-primary' : 'dot-secondary'"></div>
              <span class="assign-name">{{ row.name }}</span>
              <span v-if="row.isPrimary" class="badge-primary-sm">Primary</span>
            </div>
            <div class="assign-pct-wrap">
              <input
                v-model.number="row.percent"
                type="number" min="1" max="100"
                class="pct-input"
                :disabled="row.isPrimary"
                @change="clampPct(i)"
              />
              <span class="pct-sym">%</span>
              <button v-if="!row.isPrimary" class="remove-btn" @click="removeAssignment(i)">✕</button>
            </div>
          </div>
          <div class="assign-total" :class="totalPct === 100 ? 'total-ok' : 'total-err'">
            Total: {{ totalPct }}% <span v-if="totalPct !== 100">(must equal 100%)</span>
          </div>
          <button class="btn-add-assign" @click="addAssignment">+ Add Academy Assignment</button>
          <div class="info-banner">Multi-academy: assign cost-centre % to split payroll across academies.</div>
        </div>

      </div>
    </div>

    <!-- Tab: Payroll (static placeholder) -->
    <div v-if="activeTab === 'payroll'" class="card placeholder-card">
      <div class="card-title">Payroll</div>
      <div class="placeholder-text">Payroll tab — coming soon.</div>
    </div>

    <!-- Tab: Leave (static placeholder) -->
    <div v-if="activeTab === 'leave'" class="card placeholder-card">
      <div class="card-title">Leave Balances</div>
      <div class="placeholder-text">Leave tab — coming soon.</div>
    </div>

    <!-- Tab: Documents -->
    <div v-if="activeTab === 'documents'">
      <div class="two-col">

        <!-- Upload Form -->
        <div class="card">
          <div class="card-title">Upload Document</div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">Document Type <span class="req">*</span></label>
            <select v-model="uploadForm.documentTypeId" class="form-control">
              <option value="">— Select Type —</option>
              <option v-for="dt in docTypes" :key="dt.ADTID" :value="dt.ADTID">{{ dt.Title }}</option>
            </select>
            <span v-if="uploadErr.type" class="field-err">{{ uploadErr.type }}</span>
          </div>
          <div class="form-group" style="margin-bottom:14px">
            <label class="form-label">File <span class="req">*</span></label>
            <div class="file-drop" :class="{ 'file-drop-active': dragOver }"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="onDrop">
              <input ref="docFileInput" type="file" accept=".pdf,.jpg,.jpeg,.png"
                style="display:none" @change="onDocFileChange" />
              <template v-if="!uploadForm.file">
                <div class="file-drop-icon">📎</div>
                <div class="file-drop-text">Drag & drop or <span class="file-link" @click="docFileInput.click()">browse</span></div>
                <div class="file-drop-hint">PDF, JPG, PNG · Max 5MB</div>
              </template>
              <template v-else>
                <div class="file-selected">
                  <span class="file-icon">{{ fileIcon(uploadForm.file.name) }}</span>
                  <span class="file-name">{{ uploadForm.file.name }}</span>
                  <span class="file-size">({{ fileSize(uploadForm.file.size) }})</span>
                  <button class="remove-file" @click="uploadForm.file = null">✕</button>
                </div>
              </template>
            </div>
            <span v-if="uploadErr.file" class="field-err">{{ uploadErr.file }}</span>
          </div>
          <p v-if="uploadErr.server" class="save-err">{{ uploadErr.server }}</p>
          <button class="btn btn-primary" style="width:100%" :disabled="docUploading" @click="uploadDocument">
            {{ docUploading ? 'Uploading…' : 'Upload Document' }}
          </button>
        </div>

        <!-- Documents List -->
        <div class="card">
          <div class="card-title">
            Uploaded Documents
            <span class="doc-count">{{ documents.length }}</span>
          </div>
          <div v-if="docsLoading" class="table-empty">Loading…</div>
          <div v-else-if="documents.length === 0" class="table-empty" style="padding:30px 0">
            No documents uploaded yet.
          </div>
          <table v-else class="doc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Document Type</th>
                <th>Attachment</th>
                <th>Uploaded On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doc, i) in documents" :key="doc.duId">
                <td class="text-muted">{{ i + 1 }}</td>
                <td class="fw-500">{{ doc.documentTypeName || '—' }}</td>
                <td>
                  <button class="link-btn" @click="downloadDoc(doc)">
                    <span>⬇</span> Attachment
                  </button>
                </td>
                <td class="text-muted text-xs">{{ formatDate(doc.uploadedOn) }}</td>
                <td>
                  <button class="icon-del" @click="confirmDocDelete(doc)" title="Delete">🗑</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <!-- Delete confirm modal -->
      <Teleport to="body">
        <div v-if="docDelModal.open" class="modal-backdrop" @click.self="docDelModal.open = false">
          <div class="modal-box">
            <div class="modal-header">
              <span class="modal-title">Delete Document</span>
              <button class="modal-close" @click="docDelModal.open = false">✕</button>
            </div>
            <div class="modal-body">
              <p>Delete <strong>{{ docDelModal.name }}</strong>? This cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" @click="docDelModal.open = false">Cancel</button>
              <button class="btn btn-danger" :disabled="docDeleting" @click="doDocDelete">
                {{ docDeleting ? 'Deleting…' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>

    <!-- Tab: Evaluation (static placeholder) -->
    <div v-if="activeTab === 'evaluation'" class="card placeholder-card">
      <div class="card-title">Evaluation</div>
      <div class="placeholder-text">Evaluation tab — coming soon.</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route  = useRoute()
const router = useRouter()

const id       = route.params.id
const staff    = ref({})
const loading  = ref(true)
const loadErr  = ref('')
const activeTab = ref('basic')

const tabs = [
  { id: 'basic',      label: 'Basic Info' },
  { id: 'employment', label: 'Employment' },
  { id: 'payroll',    label: 'Payroll' },
  { id: 'leave',      label: 'Leave' },
  { id: 'documents',  label: 'Documents' },
  { id: 'evaluation', label: 'Evaluation' },
]

const COLORS = ['#185FA5', '#2e7d32', '#b7620a', '#6a1b9a', '#00695c', '#c62828']
const avatarBg = computed(() => {
  const idx = (staff.value?.FMID || 0) % COLORS.length
  return { background: COLORS[idx] + '22', color: COLORS[idx] }
})
const initials = computed(() =>
  ((staff.value?.FirstName?.[0] || '') + (staff.value?.LastName?.[0] || '')).toUpperCase() || '?'
)
const academyName = computed(() => localStorage.getItem('academy_name') || 'Primary Academy')

// ── Form ─────────────────────────────────────────────────────────
const form = ref({ FirstName: '', LastName: '', MiddleName: '', BirthDate: '', Gender: '', ContactNo: '', EmailAddress: '', blood_group: '', EmergencyContactNo: '' })
const ferr = ref({})
const saveErr = ref('')
const saving  = ref(false)

function populateForm() {
  form.value = {
    FirstName:          staff.value.FirstName          || '',
    LastName:           staff.value.LastName           || '',
    MiddleName:         staff.value.MiddleName         || '',
    BirthDate:          staff.value.BirthDate          ? staff.value.BirthDate.substring(0, 10) : '',
    Gender:             staff.value.Gender             || '',
    ContactNo:          staff.value.ContactNo          || '',
    EmailAddress:       staff.value.EmailAddress       || '',
    blood_group:        staff.value.blood_group        || '',
    EmergencyContactNo: staff.value.EmergencyContactNo || '',
  }
}

function resetForm() { populateForm(); ferr.value = {}; saveErr.value = '' }

async function saveBasicInfo() {
  ferr.value = {}; saveErr.value = ''
  if (!form.value.FirstName.trim()) { ferr.value.FirstName = 'Required'; return }
  if (!form.value.LastName.trim())  { ferr.value.LastName  = 'Required'; return }
  saving.value = true
  try {
    const { data } = await api.put(`/users/hrms/faculty/${id}/basic-info`, form.value)
    staff.value = data.data
    populateForm()
  } catch (e) {
    saveErr.value = e.response?.data?.message || 'Save failed.'
  } finally { saving.value = false }
}

// ── Photo upload ──────────────────────────────────────────────────
const fileInput   = ref(null)
const photoPreview = ref('')
const uploading   = ref(false)
const photoErr    = ref('')

async function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) { photoErr.value = 'Max file size is 5MB.'; return }
  photoPreview.value = URL.createObjectURL(file)
  uploading.value = true; photoErr.value = ''
  const fd = new FormData()
  fd.append('photo', file)
  try {
    const { data } = await api.post(`/users/hrms/faculty/${id}/photo`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    staff.value.ProfileImage = data.url
    photoPreview.value = data.url
  } catch (e) {
    photoErr.value = e.response?.data?.message || 'Upload failed.'
    photoPreview.value = ''
  } finally { uploading.value = false; e.target.value = '' }
}

// ── Employment tab ────────────────────────────────────────────────
const departments     = ref([])
const designations    = ref([])
const employmentTypes = ref([])
const employeeTypes   = ref([])
const facultyForMgr   = ref([])
const dropsLoaded     = ref(false)
const dropsLoading    = ref(false)

const empForm = ref({
  DepartmentID: '', Department: '',
  DesignationID: '', Designation: '',
  EmploymentType_ID: '', EmploymentType: '',
  Type_ID: '', Type: '',
  GradePay: '', JoiningDate: '', LeavingDate: '',
  ManagerID: '', SrManagerID: '',
})
const empSaveErr = ref('')
const empSaving  = ref(false)

function populateEmpForm() {
  const s = staff.value
  empForm.value = {
    DepartmentID:      s.DepartmentID      || '',
    Department:        s.Department        || '',
    DesignationID:     s.DesignationID     || '',
    Designation:       s.Designation       || '',
    EmploymentType_ID: s.EmploymentType_ID || '',
    EmploymentType:    s.EmploymentType    || '',
    Type_ID:           s.Type_ID           || '',
    Type:              s.Type              || '',
    GradePay:          s.GradePay          || '',
    JoiningDate:       s.JoiningDate       ? s.JoiningDate.substring(0, 10)  : '',
    LeavingDate:       s.LeavingDate       ? s.LeavingDate.substring(0, 10)  : '',
    ManagerID:         s.ManagerID         || '',
    SrManagerID:       s.SrManagerID       || '',
  }
}

async function loadDropdowns() {
  if (dropsLoaded.value || dropsLoading.value) return
  dropsLoading.value = true
  try {
    const [d, ds, et, emp, fac] = await Promise.all([
      api.get('/users/hrms/departments',      { params: { academy_id: academyId } }),
      api.get('/users/hrms/designations',     { params: { academy_id: academyId } }),
      api.get('/users/hrms/employee-types',   { params: { academy_id: academyId } }),
      api.get('/users/hrms/employment-types', { params: { academy_id: academyId } }),
      api.get('/users/hrms/faculty',          { params: { academy_id: academyId } }),
    ])
    departments.value     = d.data.data   || []
    designations.value    = ds.data.data  || []
    employeeTypes.value   = et.data.data  || []
    employmentTypes.value = emp.data.data || []
    facultyForMgr.value   = (fac.data.data || []).filter(f => f.FMID != id)
    dropsLoaded.value = true
  } finally { dropsLoading.value = false }
}

watch(activeTab, t => { if (t === 'employment') loadDropdowns() })

async function saveEmployment() {
  empSaveErr.value = ''
  // Sync display names from selected IDs
  const dept = departments.value.find(d => d.ADID == empForm.value.DepartmentID)
  if (dept) empForm.value.Department = dept.DPTitle
  const desig = designations.value.find(d => d.ADID == empForm.value.DesignationID)
  if (desig) empForm.value.Designation = desig.Name
  const eType = employmentTypes.value.find(e => e.Id == empForm.value.EmploymentType_ID)
  if (eType) empForm.value.EmploymentType = eType.Name
  const empType = employeeTypes.value.find(e => e.ETID == empForm.value.Type_ID)
  if (empType) empForm.value.Type = empType.Name

  empSaving.value = true
  try {
    const { data } = await api.put(`/users/hrms/faculty/${id}/employment`, empForm.value)
    staff.value = { ...staff.value, ...data.data }
    populateEmpForm()
  } catch (e) {
    empSaveErr.value = e.response?.data?.message || 'Save failed.'
  } finally { empSaving.value = false }
}

// ── Academy Assignments (local state — primary from AcademyID) ────
const academyId   = localStorage.getItem('academy_id') || ''
const assignments = ref([
  { name: localStorage.getItem('academy_name') || 'Primary Academy', percent: 100, isPrimary: true },
])
const totalPct = computed(() => assignments.value.reduce((s, r) => s + (r.percent || 0), 0))

function addAssignment() {
  assignments.value.push({ name: '', percent: 0, isPrimary: false })
}
function removeAssignment(i) { assignments.value.splice(i, 1) }
function clampPct(i) {
  const row = assignments.value[i]
  if (row.percent < 0)   row.percent = 0
  if (row.percent > 100) row.percent = 100
}

// ── Documents tab ────────────────────────────────────────────────
const documents   = ref([])
const docTypes    = ref([])
const docsLoaded  = ref(false)
const docsLoading = ref(false)

const uploadForm   = ref({ documentTypeId: '', file: null })
const uploadErr    = ref({})
const docUploading = ref(false)
const dragOver     = ref(false)
const docFileInput = ref(null)

const docDelModal  = ref({ open: false, id: null, name: '' })
const docDeleting  = ref(false)

watch(activeTab, t => { if (t === 'documents') loadDocuments() })

async function loadDocuments() {
  if (docsLoading.value) return
  docsLoading.value = true
  try {
    const [docsRes, typesRes] = await Promise.all([
      api.get(`/users/hrms/faculty/${id}/documents`),
      docsLoaded.value ? Promise.resolve(null) : api.get('/users/hrms/document-types', { params: { academy_id: academyId } }),
    ])
    documents.value = docsRes.data.data || []
    if (typesRes) docTypes.value = typesRes.data.data || []
    docsLoaded.value = true
  } finally { docsLoading.value = false }
}

function onDocFileChange(e) {
  const f = e.target.files[0]
  if (!f) return
  if (f.size > 5 * 1024 * 1024) { uploadErr.value.file = 'Max file size is 5MB.'; return }
  uploadErr.value = {}
  uploadForm.value.file = f
}

function onDrop(e) {
  dragOver.value = false
  const f = e.dataTransfer.files[0]
  if (!f) return
  if (f.size > 5 * 1024 * 1024) { uploadErr.value.file = 'Max file size is 5MB.'; return }
  const allowed = ['application/pdf', 'image/jpeg', 'image/png']
  if (!allowed.includes(f.type)) { uploadErr.value.file = 'Only PDF, JPG, PNG allowed.'; return }
  uploadErr.value = {}
  uploadForm.value.file = f
}

async function uploadDocument() {
  uploadErr.value = {}
  if (!uploadForm.value.documentTypeId) { uploadErr.value.type = 'Select a document type.'; return }
  if (!uploadForm.value.file)           { uploadErr.value.file = 'Choose a file to upload.'; return }
  docUploading.value = true
  const fd = new FormData()
  fd.append('document_type_id', uploadForm.value.documentTypeId)
  fd.append('file', uploadForm.value.file)
  try {
    await api.post(`/users/hrms/faculty/${id}/documents`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    uploadForm.value = { documentTypeId: '', file: null }
    if (docFileInput.value) docFileInput.value.value = ''
    await loadDocuments()
  } catch (e) {
    uploadErr.value.server = e.response?.data?.message || 'Upload failed.'
  } finally { docUploading.value = false }
}

async function downloadDoc(doc) {
  try {
    const res = await api.get(`/users/hrms/faculty/${id}/documents/${doc.duId}/download`, {
      responseType: 'blob',
    })
    const url  = URL.createObjectURL(res.data)
    const a    = document.createElement('a')
    a.href     = url
    a.download = (doc.documentTypeName || 'document') + '.pdf'
    a.click()
    URL.revokeObjectURL(url)
  } catch { /* silent */ }
}

function confirmDocDelete(doc) {
  docDelModal.value = { open: true, id: doc.duId, name: doc.documentTypeName || 'this document' }
}

async function doDocDelete() {
  docDeleting.value = true
  try {
    await api.delete(`/users/hrms/faculty/${id}/documents/${docDelModal.value.id}`)
    docDelModal.value.open = false
    await loadDocuments()
  } catch { /* silent */ }
  finally { docDeleting.value = false }
}

function fileIcon(name) {
  const ext = name?.split('.').pop()?.toLowerCase()
  return ext === 'pdf' ? '📄' : '🖼️'
}
function fileSize(bytes) {
  return bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / 1024 / 1024).toFixed(1) + ' MB'
}
function formatDate(val) {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ── Load ──────────────────────────────────────────────────────────
async function loadStaff() {
  loading.value = true; loadErr.value = ''
  try {
    const { data } = await api.get(`/users/hrms/faculty/${id}`)
    staff.value = data.data
    populateForm()
    populateEmpForm()
  } catch (e) {
    loadErr.value = e.response?.status === 404 ? 'Staff member not found.' : 'Failed to load profile.'
  } finally { loading.value = false }
}

onMounted(loadStaff)
</script>

<style scoped>
.page-content { padding-bottom: 40px; }

/* Header */
.staff-header  { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
.staff-avatar  { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0; overflow: hidden; }
.avatar-img    { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.staff-name    { font-size: 15px; font-weight: 700; color: #1a1a2e; }
.staff-sub     { font-size: 11px; color: #888780; margin-top: 2px; }
.status-pill   { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-left: auto; }
.dot           { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.pill-active   { background: #e8f5e9; color: #2e7d32; }
.pill-active .dot { background: #2e7d32; }
.pill-inactive { background: #f0ede8; color: #888780; }
.pill-inactive .dot { background: #aaa; }

/* Skeleton */
.skel-circle { background: #e8e5de; animation: pulse 1.2s ease infinite; }
.skel-line   { height: 12px; border-radius: 4px; background: #e8e5de; animation: pulse 1.2s ease infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

/* Tabs */
.tab-bar { display: flex; border-bottom: 1px solid #e8e5de; margin-bottom: 20px; gap: 0; }
.tab     { padding: 10px 16px; font-size: 13px; font-weight: 500; color: #888780; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
.tab:hover { color: #1a1a2e; }
.tab.active { color: #1a1a2e; border-bottom-color: #1a1a2e; font-weight: 600; }

/* Layout */
.two-col { display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start; }
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }

/* Card */
.card       { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; padding: 22px; }
.card-title { font-size: 13px; font-weight: 700; color: #1a1a2e; margin-bottom: 18px; }
.card-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }

/* Form */
.form-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
.form-group { display: flex; flex-direction: column; }
.form-label { font-size: 12px; font-weight: 600; color: #3a3a4a; margin-bottom: 5px; }
.req        { color: #c0392b; }
.form-control { padding: 8px 11px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; outline: none; }
.form-control:focus { border-color: #5b5fc7; }
.field-err  { color: #c0392b; font-size: 11px; margin-top: 3px; }
.save-err   { color: #c0392b; font-size: 12px; margin-top: 10px; }
.load-err   { padding: 20px; color: #c0392b; text-align: center; }

/* Photo card */
.photo-wrap  { display: flex; justify-content: center; margin-bottom: 10px; }
.photo-avatar { width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 700; overflow: hidden; }
.photo-img   { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.photo-hint  { text-align: center; font-size: 11px; color: #888780; margin-bottom: 12px; }

/* Academy */
.section-sep   { height: 1px; background: #f0ede8; margin: 18px 0; }
.section-label { font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
.academy-row   { display: flex; align-items: center; justify-content: space-between; }
.academy-name  { font-size: 13px; font-weight: 500; color: #1a1a2e; }
.badge-primary { background: #e8f5e9; color: #2e7d32; padding: 3px 9px; border-radius: 12px; font-size: 11px; font-weight: 600; }
.info-banner   { margin-top: 12px; background: #eef2ff; color: #3730a3; border-radius: 7px; padding: 10px 12px; font-size: 11px; line-height: 1.5; }

/* Field hint */
.field-hint { font-size: 10px; color: #aaa9a3; margin-top: 3px; }

/* Table-empty used for drops loading */
.table-empty { text-align: center; padding: 40px; color: #888780; font-size: 13px; }

/* Academy Assignments */
.assign-header    { display: flex; justify-content: space-between; margin-bottom: 8px; }
.assign-col-lbl   { font-size: 10px; font-weight: 600; color: #aaa9a3; text-transform: uppercase; letter-spacing: .4px; }
.pct-lbl          { width: 90px; text-align: right; }
.assign-row       { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #f5f4f0; }
.assign-academy   { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
.assign-dot       { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-primary      { background: #2e7d32; }
.dot-secondary    { background: #5b5fc7; }
.assign-name      { font-size: 13px; font-weight: 500; color: #1a1a2e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.badge-primary-sm { background: #e8f5e9; color: #2e7d32; padding: 1px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; flex-shrink: 0; }
.assign-pct-wrap  { display: flex; align-items: center; gap: 4px; margin-left: 12px; }
.pct-input        { width: 52px; padding: 4px 8px; border: 1px solid #e0ddd6; border-radius: 6px; font-size: 13px; text-align: right; outline: none; }
.pct-input:focus  { border-color: #5b5fc7; }
.pct-input:disabled { background: #f5f4f0; color: #888780; }
.pct-sym          { font-size: 12px; color: #888780; }
.remove-btn       { background: none; border: none; color: #c0392b; font-size: 13px; cursor: pointer; padding: 2px 5px; border-radius: 4px; }
.remove-btn:hover { background: #fdecea; }
.assign-total     { font-size: 11px; font-weight: 600; margin-top: 10px; padding: 6px 10px; border-radius: 6px; }
.total-ok         { background: #e8f5e9; color: #2e7d32; }
.total-err        { background: #fdecea; color: #c0392b; }
.btn-add-assign   { display: block; width: 100%; margin-top: 10px; padding: 7px; background: #fff; border: 1px dashed #c8c5bc; border-radius: 7px; font-size: 12px; font-weight: 600; color: #5b5fc7; cursor: pointer; transition: background 0.15s; }
.btn-add-assign:hover { background: #f0f0ff; }

/* File drop zone */
.file-drop         { border: 1.5px dashed #c8c5bc; border-radius: 8px; padding: 22px 14px; text-align: center; transition: all 0.15s; cursor: default; }
.file-drop-active  { border-color: #5b5fc7; background: #f0f0ff; }
.file-drop-icon    { font-size: 22px; margin-bottom: 6px; }
.file-drop-text    { font-size: 13px; color: #3a3a4a; }
.file-link         { color: #5b5fc7; font-weight: 600; cursor: pointer; }
.file-link:hover   { text-decoration: underline; }
.file-drop-hint    { font-size: 11px; color: #aaa9a3; margin-top: 4px; }
.file-selected     { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; }
.file-icon         { font-size: 20px; }
.file-name         { font-size: 12px; font-weight: 500; color: #1a1a2e; word-break: break-all; }
.file-size         { font-size: 11px; color: #888780; }
.remove-file       { background: none; border: none; color: #c0392b; cursor: pointer; font-size: 14px; padding: 2px 5px; border-radius: 4px; }
.remove-file:hover { background: #fdecea; }

/* Documents list table */
.doc-count  { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #eef2ff; color: #3730a3; font-size: 11px; font-weight: 700; margin-left: 8px; }
.doc-table  { width: 100%; border-collapse: collapse; font-size: 13px; }
.doc-table th { font-size: 10px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .4px; padding: 8px 10px; border-bottom: 1px solid #f0ede8; text-align: left; }
.doc-table td { padding: 10px 10px; border-bottom: 1px solid #f5f4f0; vertical-align: middle; }
.doc-table tr:last-child td { border-bottom: none; }
.link-btn   { display: inline-flex; align-items: center; gap: 4px; color: #185FA5; font-size: 12px; font-weight: 600; background: none; border: none; cursor: pointer; padding: 3px 0; }
.link-btn:hover { text-decoration: underline; }
.icon-del   { background: none; border: none; font-size: 14px; cursor: pointer; padding: 3px 6px; border-radius: 5px; }
.icon-del:hover { background: #fdecea; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; z-index: 9000; }
.modal-box      { background: #fff; border-radius: 12px; width: 400px; box-shadow: 0 12px 40px rgba(0,0,0,.15); overflow: hidden; }
.modal-header   { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f0ede8; }
.modal-title    { font-size: 14px; font-weight: 700; color: #1a1a2e; }
.modal-close    { background: none; border: none; font-size: 16px; cursor: pointer; color: #888; }
.modal-body     { padding: 20px; font-size: 13px; color: #3a3a4a; }
.modal-footer   { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 20px; border-top: 1px solid #f0ede8; }
.btn-danger     { background: #c0392b; color: #fff; }
.btn-danger:hover:not(:disabled) { background: #a93226; }
.btn-danger:disabled { opacity: .6; cursor: default; }

/* Placeholder tabs */
.placeholder-text { color: #888780; font-size: 13px; padding: 20px 0; }

/* Buttons */
.btn         { padding: 8px 18px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
.btn-primary { background: #1a1a2e; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #2d2d4e; }
.btn-primary:disabled { opacity: .6; cursor: default; }
.btn-ghost   { background: #f5f4f0; color: #3a3a4a; border: 1px solid #e0ddd6; }
.btn-ghost:hover { background: #eceae4; }
.btn-outline { width: 100%; padding: 8px; background: #fff; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; color: #3a3a4a; }
.btn-outline:hover:not(:disabled) { background: #f5f4f0; }
.btn-outline:disabled { opacity: .6; cursor: default; }
</style>
