<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;flex-wrap:wrap;gap:7px">
      <select class="form-input" style="width:auto"><option>April 2026</option><option>March 2026</option><option>February 2026</option></select>
      <div style="display:flex;gap:6px">
        <button class="btn btn-sm">Download</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-regularization')">Apply Regularization</button>
      </div>
    </div>
    <div class="stat-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:13px">
      <div class="stat-card"><div class="stat-label">Working Days</div><div class="stat-val">27</div></div>
      <div class="stat-card"><div class="stat-label">Present</div><div class="stat-val" style="color:#3b6d11">24</div></div>
      <div class="stat-card"><div class="stat-label">On Leave</div><div class="stat-val" style="color:#185FA5">3</div></div>
      <div class="stat-card"><div class="stat-label">Late Marks</div><div class="stat-val" style="color:#854f0b">1</div></div>
      <div class="stat-card"><div class="stat-label">LOP Days</div><div class="stat-val" style="color:#e24b4a">0</div></div>
    </div>
    <div class="card">
      <div class="card-title">April 2026 — Daily Log</div>
      <div style="overflow-x:auto">
        <table>
          <thead><tr><th>Date</th><th>Day</th><th>In Time</th><th>Out Time</th><th>Hours</th><th>Status</th><th>Remark</th></tr></thead>
          <tbody>
            <tr v-for="log in dailyLog" :key="log.date">
              <td>{{ log.date }}</td><td>{{ log.day }}</td>
              <td>{{ log.in }}</td><td>{{ log.out }}</td><td>{{ log.hours }}</td>
              <td><span class="badge" :class="log.statusClass">{{ log.status }}</span></td>
              <td style="font-size:10px;color:#888780">{{ log.remark }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const dailyLog = [
  { date:'1 Apr', day:'Tue', in:'09:02', out:'18:31', hours:'9h 29m', status:'P',    statusClass:'b-green', remark:'—' },
  { date:'2 Apr', day:'Wed', in:'09:18', out:'18:45', hours:'9h 27m', status:'P',    statusClass:'b-green', remark:'—' },
  { date:'3 Apr', day:'Thu', in:'09:31', out:'18:20', hours:'8h 49m', status:'Late', statusClass:'b-amber', remark:'Grace exceeded by 1 min' },
  { date:'4 Apr', day:'Fri', in:'09:05', out:'18:35', hours:'9h 30m', status:'P',    statusClass:'b-green', remark:'—' },
  { date:'5 Apr', day:'Sat', in:'—',     out:'—',     hours:'—',       status:'WO',   statusClass:'b-gray',  remark:'Week Off' },
  { date:'6 Apr', day:'Sun', in:'—',     out:'—',     hours:'—',       status:'WO',   statusClass:'b-gray',  remark:'Week Off' },
  { date:'7 Apr', day:'Mon', in:'09:01', out:'18:45', hours:'9h 44m', status:'P',    statusClass:'b-green', remark:'—' },
  { date:'14 Apr',day:'Mon', in:'—',     out:'—',     hours:'—',       status:'PH',   statusClass:'b-blue',  remark:'Dr. Ambedkar Jayanti' },
  { date:'28 Apr',day:'Mon', in:'—',     out:'—',     hours:'—',       status:'CL',   statusClass:'b-blue',  remark:'Approved Leave' },
]
</script>
