<template>
  <div>
    <div class="info-nests">Annual increment raises the pay stage by 1 within the same level, effective 1st July each year as per 7th Pay Commission rules.</div>
    <div class="toolbar">
      <select class="form-input" style="width:auto"><option>July 2026</option><option>July 2025</option></select>
      <select class="form-input" style="width:auto"><option>All Schools</option><option>EMRS-JH-001</option><option>EMRS-CG-018</option></select>
      <div class="toolbar-right">
        <button class="btn btn-sm">Export</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-bulk-increment')">Process Increments</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Employee</th><th>School</th><th>Level</th><th>Current Stage</th><th>New Stage</th><th>Current Basic (₹)</th><th>New Basic (₹)</th><th>Increment Amount</th><th>Effective</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="emp in increments" :key="emp.name">
            <td style="font-weight:600">{{ emp.name }}</td>
            <td>{{ emp.school }}</td><td>{{ emp.level }}</td>
            <td>{{ emp.currentStage }}</td><td style="font-weight:600;color:#3b6d11">{{ emp.newStage }}</td>
            <td>{{ emp.currentBasic }}</td><td style="font-weight:600">{{ emp.newBasic }}</td>
            <td style="color:#3b6d11;font-weight:600">+{{ emp.increment }}</td>
            <td>{{ emp.effective }}</td>
            <td><span class="badge" :class="emp.statusClass">{{ emp.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const increments = [
  { name:'Dr. Ramesh Kumar', school:'JH-001', level:'L-12', currentStage:8, newStage:9, currentBasic:'78,800', newBasic:'81,200', increment:'2,400', effective:'01 Jul 2026', status:'Due',       statusClass:'b-amber' },
  { name:'Mrs. Sunita Nair', school:'CG-018', level:'L-10', currentStage:6, newStage:7, currentBasic:'56,100', newBasic:'57,900', increment:'1,800', effective:'01 Jul 2026', status:'Due',       statusClass:'b-amber' },
  { name:'Mr. Dipak Roy',    school:'WB-009', level:'L-8',  currentStage:4, newStage:5, currentBasic:'47,600', newBasic:'49,100', increment:'1,500', effective:'01 Jul 2026', status:'Processed', statusClass:'b-green' },
]
</script>
