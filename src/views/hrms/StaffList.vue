<template>
  <div class="page-content">

    <div class="page-header-row">
      <div>
        <div class="page-title-inline">Staff Master</div>
        <div class="page-sub">Manage all employees — view, edit profiles and status</div>
      </div>
      <button class="btn btn-primary" @click="router.push({ name: 'hrms-staff-detail', params: { id: 'new' } })">+ Add Staff</button>
    </div>

    <div class="toolbar">
      <input v-model="search" class="input-search" placeholder="Search name, email, employee ID…" @input="load" />
      <select v-model="statusFilter" class="input-select" @change="load">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <div class="table-wrap">
      <div v-if="loading" class="table-empty">Loading…</div>
      <div v-else-if="error" class="table-empty text-danger">{{ error }}</div>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="8" class="table-empty">No staff found.</td>
          </tr>
          <tr v-for="(row, i) in rows" :key="row.FMID" class="clickable-row" @click="goDetail(row.FMID)">
            <td class="text-muted">{{ i + 1 }}</td>
            <td>
              <div class="emp-cell">
                <div class="avatar" :style="avatarStyle(row)">
                  <img v-if="row.ProfileImage" :src="row.ProfileImage" class="avatar-img" />
                  <span v-else>{{ initials(row) }}</span>
                </div>
                <div>
                  <div class="fw-600">{{ row.FirstName }} {{ row.LastName }}</div>
                  <div class="text-xs text-muted">{{ row.employee_code || row.EmployeeID || '—' }} · {{ row.EmailAddress || '—' }}</div>
                </div>
              </div>
            </td>
            <td class="text-muted">{{ row.ContactNo || '—' }}</td>
            <td><span v-if="row.Department" class="chip">{{ row.Department }}</span><span v-else class="text-muted">—</span></td>
            <td class="text-muted">{{ row.Designation || '—' }}</td>
            <td><span v-if="row.EmploymentType" class="badge-type">{{ row.EmploymentType }}</span><span v-else class="text-muted">—</span></td>
            <td>
              <span class="status-pill" :class="row.IsActive ? 'pill-active' : 'pill-inactive'">
                <span class="dot"></span>{{ row.IsActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="action-cell" @click.stop>
              <button class="act-btn act-edit" @click="goDetail(row.FMID)">✏ Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!loading && !error" class="table-footer">
        {{ rows.length }} staff shown · {{ rows.filter(r => r.IsActive).length }} active · {{ rows.filter(r => !r.IsActive).length }} inactive
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router      = useRouter()
const academyId   = localStorage.getItem('academy_id') || ''
const rows        = ref([])
const loading     = ref(true)
const error       = ref('')
const search      = ref('')
const statusFilter = ref('')

let debounceTimer = null

async function load() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    loading.value = true; error.value = ''
    try {
      const { data } = await api.get('/users/hrms/faculty', {
        params: {
          academy_id: academyId,
          search: search.value || undefined,
          status: statusFilter.value || undefined,
        },
      })
      rows.value = data.data || []
    } catch { error.value = 'Failed to load staff.' }
    finally { loading.value = false }
  }, 300)
}

onMounted(load)

function goDetail(id) {
  router.push({ name: 'hrms-staff-detail', params: { id } })
}

function initials(row) {
  return ((row.FirstName?.[0] || '') + (row.LastName?.[0] || '')).toUpperCase() || '?'
}

const AVATAR_COLORS = ['#185FA5', '#2e7d32', '#b7620a', '#6a1b9a', '#00695c', '#c62828']
function avatarStyle(row) {
  const idx = (row.FMID || 0) % AVATAR_COLORS.length
  return { background: AVATAR_COLORS[idx] + '22', color: AVATAR_COLORS[idx] }
}
</script>

<style scoped>
.page-header-row  { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.page-title-inline { font-size: 16px; font-weight: 700; color: #1a1a2e; }
.page-sub         { font-size: 12px; color: #888780; margin-top: 2px; }
.toolbar          { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
.input-search     { padding: 8px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; width: 280px; outline: none; }
.input-search:focus { border-color: #5b5fc7; }
.input-select     { padding: 8px 12px; border: 1px solid #e0ddd6; border-radius: 7px; font-size: 13px; outline: none; background: #fff; }
.table-wrap       { background: #fff; border: 1px solid #e8e5de; border-radius: 10px; overflow: hidden; }
.data-table       { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th    { background: #faf9f6; padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #888780; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e8e5de; }
.data-table td    { padding: 11px 14px; border-bottom: 1px solid #f0ede8; color: #3a3a4a; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.clickable-row:hover td { background: #faf9f6; cursor: pointer; }
.table-empty      { text-align: center; padding: 40px; color: #888780; font-size: 13px; }
.table-footer     { padding: 10px 14px; font-size: 11px; color: #888780; border-top: 1px solid #f0ede8; }
.text-muted       { color: #888780; }
.text-danger      { color: #c0392b; }
.text-xs          { font-size: 11px; }
.fw-600           { font-weight: 600; }
.emp-cell         { display: flex; align-items: center; gap: 10px; }
.avatar           { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; overflow: hidden; }
.avatar-img       { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.chip             { background: #f0ede8; color: #3a3a4a; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.badge-type       { background: #eef2ff; color: #3730a3; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.status-pill      { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.dot              { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.pill-active      { background: #e8f5e9; color: #2e7d32; }
.pill-active .dot { background: #2e7d32; }
.pill-inactive    { background: #f0ede8; color: #888780; }
.pill-inactive .dot { background: #aaa; }
.action-cell      { display: flex; gap: 6px; align-items: center; }
.act-btn          { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; white-space: nowrap; }
.act-edit         { background: #eef2ff; color: #3730a3; border-color: #c7d2fe; }
.act-edit:hover   { background: #e0e7ff; }
.btn              { padding: 8px 18px; border-radius: 7px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
.btn-primary      { background: #1a1a2e; color: #fff; }
.btn-primary:hover { background: #2d2d4e; }
</style>
