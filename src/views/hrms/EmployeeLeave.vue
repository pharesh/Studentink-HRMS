<template>
  <div>
    <div class="toolbar">
      <select class="form-input" style="width:auto;padding:5px 8px"><option>Active</option><option>Inactive</option><option>All</option></select>
      <select class="form-input" style="width:auto;padding:5px 8px"><option>2026 (Current)</option><option>2025</option><option>2024</option></select>
      <div class="toolbar-right">
        <button class="btn btn-sm">⬇ Export Leaves</button>
        <button class="btn btn-sm">⬆ Import XLS</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-bulk-assign-leave')">Bulk Assign Leave</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Name</th><th>Dept.</th><th>Joining Date</th><th>Carry Fwd</th><th>Allocated</th><th>Used</th><th>Balance</th><th></th></tr></thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.name">
            <td style="font-weight:600">{{ emp.name }}</td>
            <td><span class="chip">{{ emp.dept }}</span></td>
            <td>{{ emp.joining }}</td>
            <td>{{ emp.carryFwd }}</td>
            <td>{{ emp.allocated }}</td>
            <td>{{ emp.used }}</td>
            <td style="font-weight:600" :style="{ color: emp.balance > 15 ? '#3b6d11' : '#854f0b' }">{{ emp.balance }}</td>
            <td>
              <div style="display:flex;gap:3px">
                <button class="btn btn-sm" @click="router.push({ name: 'hrms-leave-ledger' })">Ledger</button>
                <button class="btn btn-sm btn-primary" @click="modalStore.openModal('modal-assign-leave')">Assign</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="font-size:10px;color:#888780;padding:2px 4px">Total · Allocated: 60.0 · Used: 22.0 · Remaining: 108.5</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'
const router     = useRouter()
const modalStore = useModalStore()
const employees = [
  { name:'Alpesh Kothari',  dept:'Development', joining:'01 Jun 2021', carryFwd:10.0, allocated:12.0, used:4.0,  balance:18.0 },
  { name:'Priya Mehta',     dept:'Support',     joining:'15 Mar 2022', carryFwd:14.0, allocated:12.0, used:6.0,  balance:20.0 },
  { name:'Manish Vekariya', dept:'Leadership',  joining:'10 Jan 2020', carryFwd:20.5, allocated:12.0, used:3.0,  balance:29.5 },
  { name:'Rahul Joshi',     dept:'Development', joining:'01 Apr 2023', carryFwd:8.0,  allocated:12.0, used:7.0,  balance:13.0 },
  { name:'Sunita Rao',      dept:'Office',      joining:'12 Feb 2019', carryFwd:18.0, allocated:12.0, used:2.0,  balance:28.0 },
]
</script>
