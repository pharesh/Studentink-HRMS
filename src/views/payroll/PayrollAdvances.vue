<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px">
      <div style="font-size:13px;color:#888780">4 active loans · ₹2,40,000 outstanding</div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-payroll-add-advance')">+ New Advance</button>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th><th>Total Advance (₹)</th><th>Monthly EMI (₹)</th>
            <th>Paid</th><th>Balance (₹)</th><th>Tenure</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in advances" :key="a.name">
            <td>
              <div style="font-weight:600">{{ a.name }}</div>
              <div style="font-size:11px;color:#888780">{{ a.id }}</div>
            </td>
            <td>{{ a.total }}</td>
            <td>{{ a.emi }}</td>
            <td>
              <div style="font-size:12px;color:#888780">{{ a.paidLabel }}</div>
              <div class="prog-bar" style="width:90px">
                <div class="prog-fill" :style="{ width: a.pct + '%', background: a.pct === 100 ? '#9ecf58' : '#185FA5' }"></div>
              </div>
            </td>
            <td :style="a.pct === 100 ? 'font-weight:600;color:#3b6d11' : 'font-weight:600'">{{ a.balance }}</td>
            <td>{{ a.tenure }}</td>
            <td><span :class="['badge', a.pct === 100 ? 'b-gray' : 'b-green']">{{ a.pct === 100 ? 'Closed' : 'Active' }}</span></td>
            <td><button class="btn btn-sm">History</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const advances = [
  { name:'Priya Mehta',    id:'EMP-002', total:'60,000',  emi:'5,000',  paidLabel:'4/12 EMIs',  pct:33,  balance:'40,000', tenure:'8 months left' },
  { name:'Rahul Joshi',    id:'EMP-018', total:'1,20,000',emi:'10,000', paidLabel:'3/12 EMIs',  pct:25,  balance:'90,000', tenure:'9 months left' },
  { name:'Sunita Rao',     id:'EMP-039', total:'50,000',  emi:'5,000',  paidLabel:'5/10 EMIs',  pct:50,  balance:'25,000', tenure:'5 months left' },
  { name:'Kiran Patel',    id:'EMP-012', total:'30,000',  emi:'10,000', paidLabel:'3/3 EMIs',   pct:100, balance:'0',      tenure:'Closed' },
]
</script>
