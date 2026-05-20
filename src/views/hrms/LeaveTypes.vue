<template>
  <div class="page-content">

    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Leave Configuration</div>
        <div class="page-sub">Configure leave types and limits — academy-specific overrides of the master leave list</div>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" :disabled="saving || !dirty" @click="resetChanges">Reset</button>
        <button class="btn btn-primary" :disabled="saving || !dirty" @click="saveAll">
          {{ saving ? 'Saving…' : 'Update Leave Master' }}
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stat-strip">
      <div class="stat-card"><div class="stat-val">{{ rows.length }}</div><div class="stat-lbl">Total Types</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => r.IsActive).length }}</div><div class="stat-lbl">Active</div></div>
      <div class="stat-card"><div class="stat-val">{{ rows.filter(r => r.IsLeave).length }}</div><div class="stat-lbl">Counted as Leave</div></div>
      <div class="stat-card" v-if="dirty"><div class="stat-val unsaved-count">{{ dirtyCount }}</div><div class="stat-lbl">Unsaved Changes</div></div>
    </div>

    <div v-if="loading" class="table-empty">Loading…</div>
    <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>

    <div v-else class="table-wrap">
      <table class="data-table leave-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th>Original Description</th>
            <th class="col-code">Original Code</th>
            <th>Your Description</th>
            <th class="col-code">Your Code</th>
            <th class="col-num">Present Day Count</th>
            <th class="col-num">Max / Month</th>
            <th class="col-num">Max / Year</th>
            <th class="col-center">Is Leave</th>
            <th class="col-center">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="10" class="table-empty">No leave types found for this academy.</td>
          </tr>
          <tr
            v-for="(row, i) in rows"
            :key="row.lcId"
            :class="{ 'row-modified': isModified(row.lcId) }"
          >
            <td class="text-muted col-num">{{ i + 1 }}</td>
            <td class="text-muted">{{ row.masterLeaveDescription }}</td>
            <td class="col-code text-center"><span class="chip">{{ row.masterLeaveCode }}</span></td>

            <!-- Editable: Your Description -->
            <td>
              <input
                class="inline-input"
                v-model="edits[row.lcId].LeaveDescription"
                placeholder="Same as original"
                @input="markDirty(row.lcId)"
              />
            </td>

            <!-- Editable: Your Code -->
            <td class="col-code">
              <input
                class="inline-input inline-input-code"
                v-model="edits[row.lcId].LeaveCode"
                placeholder="Code"
                @input="markDirty(row.lcId)"
              />
            </td>

            <!-- Read-only: master value -->
            <td class="text-center text-muted">{{ row.masterLeaveValue ?? '—' }}</td>

            <!-- Editable: Max / Month -->
            <td class="col-num">
              <input
                type="number"
                class="inline-input inline-input-num"
                v-model.number="edits[row.lcId].max_limit_month"
                min="0"
                @input="markDirty(row.lcId)"
              />
            </td>

            <!-- Editable: Max / Year -->
            <td class="col-num">
              <input
                type="number"
                class="inline-input inline-input-num"
                v-model.number="edits[row.lcId].max_limit_year"
                min="0"
                @input="markDirty(row.lcId)"
              />
            </td>

            <!-- Is Leave — PATCH toggle (separate API call, not part of bulk save) -->
            <td class="col-center">
              <button
                class="toggle-pill"
                :class="row.IsLeave ? 'toggle-on' : 'toggle-off'"
                :disabled="!!toggling[row.ALID]"
                @click="toggleIsLeave(row)"
              >{{ row.IsLeave ? 'Yes' : 'No' }}</button>
            </td>

            <!-- Active — PATCH toggle (separate API call, not part of bulk save) -->
            <td class="col-center">
              <button
                class="toggle-pill"
                :class="row.IsActive ? 'toggle-on' : 'toggle-off'"
                :disabled="!!toggling[row.ALID]"
                @click="toggleIsActive(row)"
              >{{ row.IsActive ? 'Active' : 'Inactive' }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Toast -->
    <div class="toast-wrap">
      <transition-group name="toast">
        <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast-${t.type}`">{{ t.msg }}</div>
      </transition-group>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/services/api'

const academyId  = localStorage.getItem('academy_id') || ''

const rows     = ref([])
const edits    = reactive({})   // only the 4 editable fields + ALID/lcId
const modified = reactive({})   // dirty tracking per lcId
const toggling = reactive({})   // per-ALID in-flight flag for IsLeave/IsActive
const loading  = ref(false)
const error    = ref('')
const saving   = ref(false)
const toasts   = ref([])

const dirty      = computed(() => Object.keys(modified).some(k => modified[k]))
const dirtyCount = computed(() => Object.values(modified).filter(Boolean).length)

function isModified(lcId) { return !!modified[lcId] }
function markDirty(lcId)  { modified[lcId] = true }

function initEdits(data) {
  data.forEach(row => {
    edits[row.lcId] = {
      ALID:             row.ALID,
      lcId:             row.lcId,
      LeaveCode:        row.LeaveCode        ?? '',
      LeaveDescription: row.LeaveDescription ?? '',
      max_limit_month:  row.max_limit_month  !== null && row.max_limit_month  !== undefined ? row.max_limit_month  : '',
      max_limit_year:   row.max_limit_year   !== null && row.max_limit_year   !== undefined ? row.max_limit_year   : '',
    }
    modified[row.lcId] = false
  })
}

async function load() {
  loading.value = true; error.value = ''
  try {
    const { data } = await api.get('/users/hrms/leave-config', { params: { academy_id: academyId } })
    rows.value = data.data || []
    initEdits(rows.value)
  } catch (e) {
    error.value = e.response?.data?.message || 'Failed to load leave configuration.'
  } finally {
    loading.value = false
  }
}

function resetChanges() { initEdits(rows.value) }

async function saveAll() {
  if (!dirty.value) return
  saving.value = true
  try {
    const dirtyRows = Object.values(edits)
      .filter(e => modified[e.lcId])
      .map(e => ({
        ALID:             e.ALID,
        LeaveCode:        e.LeaveCode,
        LeaveDescription: e.LeaveDescription,
        max_limit_month:  e.max_limit_month !== '' ? e.max_limit_month : null,
        max_limit_year:   e.max_limit_year  !== '' ? e.max_limit_year  : null,
      }))

    await api.post('/users/hrms/leave-config/bulk-update', { rows: dirtyRows })
    toast('Leave master updated successfully', 'success')
    await load()
  } catch (e) {
    toast(e.response?.data?.message || 'Save failed.', 'error')
  } finally {
    saving.value = false
  }
}

async function toggleIsLeave(row) {
  if (toggling[row.ALID]) return
  toggling[row.ALID] = true
  try {
    await api.patch(`/users/hrms/leave-config/${row.ALID}/toggle-is-leave`)
    row.IsLeave = row.IsLeave ? 0 : 1
  } catch (e) {
    toast(e.response?.data?.message || 'Toggle failed.', 'error')
  } finally {
    toggling[row.ALID] = false
  }
}

async function toggleIsActive(row) {
  if (toggling[row.ALID]) return
  toggling[row.ALID] = true
  try {
    await api.patch(`/users/hrms/leave-config/${row.ALID}/toggle-is-active`)
    row.IsActive = row.IsActive ? 0 : 1
  } catch (e) {
    toast(e.response?.data?.message || 'Toggle failed.', 'error')
  } finally {
    toggling[row.ALID] = false
  }
}

let toastSeq = 0
function toast(msg, type = 'success') {
  const id = ++toastSeq
  toasts.value.push({ id, msg, type })
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 3500)
}

onMounted(load)
</script>

<style scoped>
.page-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
.page-title-inline { font-size: 17px; font-weight: 700; color: #1a1a2e; }
.page-sub { font-size: 11.5px; color: #888; margin-top: 2px; }
.header-actions { display: flex; gap: 8px; align-items: center; }

.stat-strip { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.stat-card { background: #fff; border: 1px solid #e8e8f0; border-radius: 10px; padding: 12px 18px; min-width: 110px; }
.stat-val { font-size: 22px; font-weight: 700; color: #1a1a2e; }
.stat-lbl { font-size: 11px; color: #888; margin-top: 2px; }
.unsaved-count { color: #e6a817; }

.table-wrap { background: #fff; border: 1px solid #e8e8f0; border-radius: 10px; overflow: auto; }
.leave-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.leave-table th { background: #f7f7fb; color: #555; font-weight: 600; font-size: 11.5px; text-transform: uppercase; letter-spacing: .4px; padding: 9px 12px; border-bottom: 1px solid #e8e8f0; white-space: nowrap; text-align: left; }
.leave-table td { padding: 7px 12px; border-bottom: 1px solid #f0f0f6; vertical-align: middle; }
.leave-table tbody tr:last-child td { border-bottom: none; }
.leave-table tbody tr:hover { background: #fafafe; }
.row-modified { background: #fffbf0 !important; }

.col-num    { width: 60px; text-align: center; }
.col-code   { width: 110px; text-align: center; }
.col-center { width: 90px; text-align: center; }
.text-center { text-align: center; }
.text-muted  { color: #888; }

.chip { background: #eef0ff; color: #5a5fc8; font-size: 11px; font-weight: 600; border-radius: 5px; padding: 2px 7px; font-family: monospace; white-space: nowrap; }

.inline-input { border: 1px solid #e0e0ee; border-radius: 6px; padding: 4px 8px; font-size: 12.5px; width: 100%; min-width: 140px; background: #fafafe; transition: border-color .15s; box-sizing: border-box; }
.inline-input:focus { outline: none; border-color: #7c7cf0; background: #fff; }
.inline-input-code { min-width: 70px; max-width: 90px; font-family: monospace; text-align: center; }
.inline-input-num  { min-width: 55px; max-width: 70px; text-align: center; }

.toggle-pill { border: none; border-radius: 20px; font-size: 11px; font-weight: 600; padding: 4px 10px; cursor: pointer; transition: background .15s, color .15s; white-space: nowrap; }
.toggle-pill:disabled { opacity: .6; cursor: wait; }
.toggle-on  { background: #e6f9f0; color: #1a7a50; }
.toggle-off { background: #fbe9e9; color: #b84040; }
.toggle-on:not(:disabled):hover  { background: #d0f4e4; }
.toggle-off:not(:disabled):hover { background: #f8d5d5; }

.table-empty { text-align: center; padding: 40px; color: #aaa; font-size: 13px; }
.text-danger  { color: #c0392b; }

.btn { padding: 8px 16px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: opacity .15s; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.btn-primary { background: #5a5fc8; color: #fff; }
.btn-primary:not(:disabled):hover { background: #4a4fb8; }
.btn-outline  { background: #fff; color: #555; border: 1px solid #d0d0e0; }
.btn-outline:not(:disabled):hover { background: #f5f5fc; }

.toast-wrap { position: fixed; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 8px; z-index: 9999; }
.toast { padding: 11px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; box-shadow: 0 4px 16px rgba(0,0,0,.13); pointer-events: none; }
.toast-success { background: #e6f9f0; color: #1a7a50; border: 1px solid #b2e8d0; }
.toast-error   { background: #fbe9e9; color: #b84040; border: 1px solid #f5c0c0; }
.toast-enter-active, .toast-leave-active { transition: all .3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>
