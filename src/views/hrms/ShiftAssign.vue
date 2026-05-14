<template>
  <div>
    <div class="toolbar">
      <input class="form-input" placeholder="Search employee…" style="max-width:180px"/>
      <select class="form-input" style="width:auto;padding:5px 8px"><option>All Shifts</option><option>Shift 1</option><option>Shift 2</option><option>Shift 3</option></select>
      <div class="toolbar-right">
        <button class="btn btn-sm">⬇ Download Template</button>
        <button class="btn btn-sm">⬆ Import XLS</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-assign-shift')">+ Assign Shift</button>
      </div>
    </div>
    <div class="info-banner info-green" style="font-size:10px">Permanent assignments have no end date. Time-bound overrides automatically revert to the permanent shift after the override period ends.</div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Employee</th><th>Shift</th><th>Type</th><th>Start Date</th><th>End Date</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="a in assignments" :key="a.id">
            <td style="font-weight:600">{{ a.employee }}</td>
            <td><span class="chip">{{ a.shift }}</span></td>
            <td><span class="badge" :class="a.typeClass">{{ a.type }}</span></td>
            <td>{{ a.startDate }}</td><td>{{ a.endDate }}</td>
            <td><span class="badge" :class="a.statusClass">{{ a.status }}</span></td>
            <td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">✏️</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const assignments = [
  { id:1, employee:'Alpesh Kothari',  shift:'Shift 3 (Dev)',     type:'Permanent',          typeClass:'b-green', startDate:'01 Jun 2021', endDate:'—',            status:'Active',         statusClass:'b-green' },
  { id:2, employee:'Priya Mehta',     shift:'Shift 1 (Support)', type:'Permanent',          typeClass:'b-green', startDate:'15 Mar 2022', endDate:'—',            status:'Active',         statusClass:'b-green' },
  { id:3, employee:'Rahul Joshi',     shift:'Shift 3 (Dev)',     type:'Permanent',          typeClass:'b-green', startDate:'01 Apr 2023', endDate:'—',            status:'Active',         statusClass:'b-green' },
  { id:4, employee:'Rahul Joshi',     shift:'Shift 2 (Support)', type:'Time-bound Override',typeClass:'b-amber', startDate:'01 May 2026', endDate:'31 May 2026', status:'Active Override', statusClass:'b-blue'  },
  { id:5, employee:'Manish Vekariya', shift:'Shift 2 (Support)', type:'Permanent',          typeClass:'b-green', startDate:'10 Jan 2020', endDate:'—',            status:'Active',         statusClass:'b-green' },
]
</script>
