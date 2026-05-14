<template>
  <div>
    <div class="toolbar">
      <select class="form-input" style="width:auto;padding:5px 8px"><option>April 2026</option><option>March 2026</option></select>
      <select class="form-input" style="width:auto;padding:5px 8px"><option>All Departments</option><option>Development</option><option>Support</option></select>
      <div class="toolbar-right">
        <button class="btn btn-sm">⬆ Import Biometric XLS</button>
        <button class="btn btn-sm btn-warning" @click="modalStore.openModal('modal-att-lock')">🔒 Lock Attendance</button>
        <button class="btn btn-primary btn-sm">Compute</button>
      </div>
    </div>
    <div class="info-banner info-amber" style="font-size:10px"><strong>Critical:</strong> Lock requires confirmation, a reason, and is role-restricted (HR Admin / Payroll Admin). Once locked and payroll processed, unlock requires senior admin approval.</div>
    <div class="tbl-wrap" style="overflow-x:auto">
      <table style="min-width:700px">
        <thead>
          <tr><th>Employee</th><th>Working Days</th><th>P</th><th>A</th><th>PL</th><th>SH</th><th>LP</th><th>WFH</th><th>LOP</th><th>Net Present</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.name">
            <td style="font-weight:600">{{ emp.name }}</td>
            <td>{{ emp.workingDays }}</td>
            <td style="color:#3b6d11;font-weight:600">{{ emp.p }}</td>
            <td>{{ emp.a }}</td><td>{{ emp.pl }}</td><td>{{ emp.sh }}</td>
            <td>{{ emp.lp }}</td><td>{{ emp.wfh }}</td><td>{{ emp.lop }}</td>
            <td style="font-weight:600">{{ emp.net }}</td>
            <td><span class="badge" :class="emp.statusClass">{{ emp.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="font-size:10px;color:#888780;display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px">
      <span>P=Present · A=Absent · PL=Paid Leave · SH=Stat.Holiday · LP=Late Present · LOP=Loss of Pay</span>
      <span>Period: 26 Mar – 25 Apr 2026 · <span style="color:#185FA5;font-weight:600">Status: Unlocked</span></span>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const employees = [
  { name:'Alpesh Kothari',  workingDays:27, p:24, a:0, pl:2, sh:1, lp:0, wfh:0, lop:0, net:'27.0', status:'OK',            statusClass:'b-green' },
  { name:'Priya Mehta',     workingDays:27, p:22, a:2, pl:2, sh:1, lp:2, wfh:0, lop:2, net:'25.0', status:'LOP Flagged',   statusClass:'b-amber' },
  { name:'Rahul Joshi',     workingDays:27, p:20, a:7, pl:0, sh:0, lp:0, wfh:0, lop:7, net:'20.0', status:'⚠ High Absent', statusClass:'b-red'   },
  { name:'Manish Vekariya', workingDays:27, p:26, a:0, pl:1, sh:0, lp:0, wfh:0, lop:0, net:'27.0', status:'OK',            statusClass:'b-green' },
  { name:'Sunita Rao',      workingDays:27, p:25, a:0, pl:1, sh:1, lp:3, wfh:0, lop:0, net:'27.0', status:'OK',            statusClass:'b-green' },
]
</script>
