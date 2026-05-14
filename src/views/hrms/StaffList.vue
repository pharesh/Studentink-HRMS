<template>
  <div>
    <div class="toolbar">
      <input class="form-input" placeholder="Search by name, mobile, email…" style="max-width:220px"/>
      <select class="form-input" style="width:auto;padding:5px 8px">
        <option>All Departments</option><option>Development</option><option>Support</option>
        <option>Sales</option><option>Leadership</option><option>Office</option>
      </select>
      <select class="form-input" style="width:auto;padding:5px 8px">
        <option>Active</option><option>Inactive</option><option>All</option>
      </select>
      <div class="toolbar-right">
        <button class="btn btn-sm">⬇ Export</button>
        <button class="btn btn-sm">⬆ Import XLS</button>
        <button class="btn btn-primary btn-sm" @click="router.push({ name: 'hrms-staff-detail' })">+ Add Staff</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox"/></th>
            <th>EMP ID</th><th>Name</th><th>Mobile</th><th>Dept.</th>
            <th>Designation</th><th>Employment</th><th>Manager</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td><input type="checkbox"/></td>
            <td style="color:#888780">{{ emp.id }}</td>
            <td>
              <div style="font-weight:600">{{ emp.name }}</div>
              <div style="font-size:9px;color:#888780">{{ emp.email }}</div>
            </td>
            <td>{{ emp.mobile }}</td>
            <td><span class="chip">{{ emp.dept }}</span></td>
            <td>{{ emp.designation }}</td>
            <td><span class="badge b-blue">{{ emp.empType }}</span></td>
            <td>{{ emp.manager }}</td>
            <td><span class="badge" :class="emp.status === 'Active' ? 'b-green' : 'b-red'">{{ emp.status }}</span></td>
            <td>
              <div style="display:flex;gap:3px">
                <button class="btn btn-sm btn-icon" @click="router.push({ name: 'hrms-staff-detail' })">✏️</button>
                <button class="btn btn-sm btn-icon btn-danger">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="font-size:10px;color:#888780;padding:2px 4px">Showing 6 of 56 employees · 54 active · 2 inactive</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const employees = [
  { id:'EMP-001', name:'Alpesh Kothari',  email:'alpesh@jaynik.in',  mobile:'98XXXXX001', dept:'Development', designation:'Senior Developer',    empType:'Permanent', manager:'Manish V.', status:'Active' },
  { id:'EMP-002', name:'Priya Mehta',     email:'priya@jaynik.in',   mobile:'98XXXXX002', dept:'Support',     designation:'Support Executive',    empType:'Permanent', manager:'Nihar S.',  status:'Active' },
  { id:'EMP-004', name:'Manish Vekariya', email:'manish@jaynik.in',  mobile:'98XXXXX004', dept:'Leadership',  designation:'Head of Operations',   empType:'Permanent', manager:'Nihar S.',  status:'Active' },
  { id:'EMP-018', name:'Rahul Joshi',     email:'rahul@jaynik.in',   mobile:'98XXXXX018', dept:'Development', designation:'Developer',             empType:'Contract',  manager:'Alpesh K.', status:'Active' },
  { id:'EMP-031', name:'Deepa Shah',      email:'deepa@jaynik.in',   mobile:'98XXXXX031', dept:'Support',     designation:'Support Executive',    empType:'Permanent', manager:'Manish V.', status:'Inactive' },
  { id:'EMP-039', name:'Sunita Rao',      email:'sunita@jaynik.in',  mobile:'98XXXXX039', dept:'Office',      designation:'Office Admin',         empType:'Permanent', manager:'Nihar S.',  status:'Active' },
]
</script>
