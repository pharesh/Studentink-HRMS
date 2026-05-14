<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;flex-wrap:wrap;gap:7px">
      <div style="display:flex;gap:7px;flex-wrap:wrap">
        <select class="form-input" style="width:auto"><option>2026 (Current)</option><option>2025</option></select>
        <select class="form-input" style="width:auto"><option>All Types</option><option>Paid Leave</option><option>Casual/Sick</option><option>WFH</option></select>
      </div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-apply-leave')">+ Apply Leave</button>
    </div>
    <div class="stat-grid g4" style="margin-bottom:13px">
      <div class="stat-card" v-for="lb in balances" :key="lb.type">
        <div class="stat-label">{{ lb.type }}</div>
        <div class="stat-val" :style="{ color: lb.color }">{{ lb.remaining }}</div>
        <div class="stat-sub">Used: {{ lb.used }} · Allocated: {{ lb.allocated }}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Leave Applications — 2026</div>
      <table>
        <thead><tr><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Applied On</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="app in applications" :key="app.id">
            <td><span class="badge" :class="app.badgeClass">{{ app.type }}</span></td>
            <td>{{ app.from }}</td><td>{{ app.to }}</td><td>{{ app.days }}</td>
            <td>{{ app.reason }}</td><td>{{ app.appliedOn }}</td>
            <td><span class="badge" :class="app.statusClass">{{ app.status }}</span></td>
            <td><button v-if="app.canCancel" class="btn btn-sm btn-danger">Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const balances = [
  { type:'Paid Leave (PL)',  remaining:18, used:4,  allocated:22, color:'#3b6d11' },
  { type:'Casual/Sick (CSL)',remaining:6,  used:2,  allocated:8,  color:'#3b6d11' },
  { type:'WFH',             remaining:16, used:8,  allocated:24, color:'#3b6d11' },
  { type:'Statutory Holiday',remaining:1,  used:13, allocated:14, color:'#854f0b' },
]
const applications = [
  { id:1, type:'PL – Paid Leave', badgeClass:'b-blue',  from:'28 Apr 2026', to:'28 Apr 2026', days:1, reason:'Personal',     appliedOn:'25 Apr 2026', status:'Approved', statusClass:'b-green', canCancel:false },
  { id:2, type:'WFH',             badgeClass:'b-teal',  from:'22 Apr 2026', to:'22 Apr 2026', days:1, reason:'WFH',          appliedOn:'20 Apr 2026', status:'Approved', statusClass:'b-green', canCancel:false },
  { id:3, type:'PL – Paid Leave', badgeClass:'b-blue',  from:'15 Mar 2026', to:'15 Mar 2026', days:1, reason:'Family event', appliedOn:'12 Mar 2026', status:'Approved', statusClass:'b-green', canCancel:false },
  { id:4, type:'CL',              badgeClass:'b-amber', from:'10 May 2026', to:'11 May 2026', days:2, reason:'Medical',      appliedOn:'08 May 2026', status:'Pending',  statusClass:'b-amber', canCancel:true  },
]
</script>
