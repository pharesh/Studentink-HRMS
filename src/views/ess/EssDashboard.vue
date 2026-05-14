<template>
  <div>
    <div class="stat-grid g4" style="margin-bottom:11px">
      <div class="stat-card"><div class="stat-label">Leave Balance (PL)</div><div class="stat-val" style="color:#3b6d11">18.0</div><div class="stat-sub">Days remaining</div></div>
      <div class="stat-card"><div class="stat-label">Present This Month</div><div class="stat-val">24</div><div class="stat-sub">Out of 27 working days</div></div>
      <div class="stat-card"><div class="stat-label">Pending Leaves</div><div class="stat-val" style="color:#185FA5">1</div><div class="stat-sub">Under manager review</div></div>
      <div class="stat-card"><div class="stat-label">Apr Payslip</div><div class="stat-val" style="font-size:14px"><span class="badge b-green" style="font-size:11px">Published</span></div><div class="stat-sub">₹58,160 net pay</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">April 2026 Attendance Summary</div>
        <div class="att-grid">
          <div v-for="day in attDays" :key="day.num" class="att-cell" :class="day.cls">
            <div class="day-num">{{ day.num }}</div>
            <div class="day-code">{{ day.code }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Quick Actions</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <button class="btn" @click="modalStore.openModal('modal-apply-leave')" style="text-align:left">🗂 Apply for Leave</button>
          <button class="btn" @click="modalStore.openModal('modal-regularization')" style="text-align:left">📅 Attendance Regularization</button>
          <button class="btn" @click="router.push({ name: 'ess-payslip' })" style="text-align:left">📄 Download Payslip</button>
          <button class="btn" @click="router.push({ name: 'ess-tax' })" style="text-align:left">🧾 Tax Declaration</button>
          <button class="btn" @click="modalStore.openModal('modal-profile-update')" style="text-align:left">👤 Request Profile Update</button>
        </div>
        <div class="section-title" style="margin-top:13px">Leave Balance Summary</div>
        <div v-for="lb in leaveBalances" :key="lb.type">
          <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px">
            <span>{{ lb.type }}</span><span style="font-weight:600;color:#3b6d11">{{ lb.remaining }}</span>
          </div>
          <div class="prog-bar"><div class="prog-fill" :style="{ width: lb.pct + '%' }"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'
const router     = useRouter()
const modalStore = useModalStore()

const attDays = [
  { num:'',  code:'',   cls:'att-cell att-hdr att-blank' }, { num:'',  code:'',   cls:'att-cell att-hdr att-blank' },
  { num:'1', code:'P',  cls:'att-cell att-P' }, { num:'2', code:'P',  cls:'att-cell att-P' },
  { num:'3', code:'LP', cls:'att-cell att-LP'}, { num:'4', code:'P',  cls:'att-cell att-P' },
  { num:'5', code:'WO', cls:'att-cell att-W' }, { num:'6', code:'WO', cls:'att-cell att-W' },
  { num:'7', code:'P',  cls:'att-cell att-P' }, { num:'8', code:'P',  cls:'att-cell att-P' },
  { num:'9', code:'P',  cls:'att-cell att-P' }, { num:'10',code:'P',  cls:'att-cell att-P' },
  { num:'11',code:'P',  cls:'att-cell att-P' }, { num:'12',code:'WO', cls:'att-cell att-W' },
  { num:'13',code:'WO', cls:'att-cell att-W' }, { num:'14',code:'SH', cls:'att-cell att-SH'},
]
const leaveBalances = [
  { type:'Paid Leave (PL)',    remaining:'18.0 days', pct:75 },
  { type:'Casual/Sick (CSL)', remaining:'6.0 days',  pct:60 },
  { type:'Work From Home',    remaining:'16.0 days',  pct:67 },
]
</script>
