<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px">
      <div style="font-size:13px;color:#888780">7 earnings · 6 deductions configured</div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-payroll-add-header')">+ Add Header</button>
    </div>

    <div class="card">
      <div class="card-title">Earnings (Additions)</div>
      <table>
        <thead>
          <tr><th>#</th><th>Header Name</th><th>Type</th><th>Formula / Basis</th><th>Day-wise</th><th>TDS</th><th>Rounding</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="h in earnings" :key="h.code">
            <td style="color:#888780;font-size:12px">{{ h.code }}</td>
            <td style="font-weight:600">{{ h.name }}</td>
            <td><span :class="['badge', h.typeBadge]">{{ h.type }}</span></td>
            <td style="font-size:12px;color:#888780">{{ h.formula }}</td>
            <td><span :class="['badge', h.daywise ? 'b-green' : 'b-gray']">{{ h.daywise ? 'Yes' : 'No' }}</span></td>
            <td><span :class="['badge', h.tds ? 'b-green' : 'b-gray']">{{ h.tds ? 'Yes' : 'No' }}</span></td>
            <td style="font-size:12px">{{ h.round }}</td>
            <td><span class="badge b-green">Active</span></td>
            <td><button class="btn btn-sm btn-icon">✏️</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">Deductions</div>
      <table>
        <thead>
          <tr><th>#</th><th>Header Name</th><th>Type</th><th>Formula / Basis</th><th>TDS</th><th>Rounding</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="h in deductions" :key="h.code">
            <td style="color:#888780;font-size:12px">{{ h.code }}</td>
            <td style="font-weight:600">{{ h.name }}</td>
            <td><span :class="['badge', h.typeBadge]">{{ h.type }}</span></td>
            <td style="font-size:12px;color:#888780">{{ h.formula }}</td>
            <td><span :class="['badge', h.tds ? 'b-green' : 'b-gray']">{{ h.tds ? 'Yes' : 'No' }}</span></td>
            <td style="font-size:12px">{{ h.round }}</td>
            <td><span :class="['badge', h.active ? 'b-green' : 'b-red']">{{ h.active ? 'Active' : 'Inactive' }}</span></td>
            <td><button class="btn btn-sm btn-icon">✏️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const earnings = [
  { code:'E01', name:'Basic Pay',                type:'Basic Pay', typeBadge:'b-blue',   formula:'Fixed (from grade)',              daywise:false, tds:true,  round:'Ceil' },
  { code:'E02', name:'HRA',                      type:'HRA',       typeBadge:'b-blue',   formula:'40% of Basic Pay',                daywise:false, tds:true,  round:'Ceil' },
  { code:'E03', name:'Conveyance Allowance',     type:'Other',     typeBadge:'b-gray',   formula:'Fixed ₹1,600/mo',                 daywise:false, tds:true,  round:'Ceil' },
  { code:'E04', name:'Medical Allowance',        type:'Other',     typeBadge:'b-gray',   formula:'Fixed ₹1,250/mo',                 daywise:false, tds:true,  round:'Ceil' },
  { code:'E05', name:'Special Allowance',        type:'Other',     typeBadge:'b-gray',   formula:'Gross − (Basic+HRA+Conv+Med)',    daywise:false, tds:true,  round:'Round' },
  { code:'E06', name:'Employer PF Contribution', type:'PF',        typeBadge:'b-purple', formula:'12% of Basic (max ₹1,800)',       daywise:true,  tds:true,  round:'Round' },
  { code:'E07', name:'Employer ESIC Contribution',type:'ESIC',     typeBadge:'b-teal',   formula:'3.25% of Gross',                  daywise:true,  tds:true,  round:'Round' },
]

const deductions = [
  { code:'D01', name:'Employee PF Contribution', type:'PF',      typeBadge:'b-purple', formula:'12% of Basic (max ₹1,800)',       tds:true,  round:'Round', active:true  },
  { code:'D02', name:'Employee ESIC Contribution',type:'ESIC',   typeBadge:'b-teal',   formula:'0.75% of Gross',                  tds:true,  round:'Round', active:true  },
  { code:'D03', name:'TDS',                      type:'TDS',     typeBadge:'b-orange', formula:'Projected annual TDS / 12',       tds:true,  round:'Round', active:true  },
  { code:'D04', name:'Professional Tax',         type:'Other',   typeBadge:'b-gray',   formula:'Slab-based (state)',              tds:false, round:'Ceil',  active:false },
  { code:'D05', name:'Salary Advance EMI',       type:'Advance', typeBadge:'b-gray',   formula:'Per active advance config',       tds:false, round:'Round', active:true  },
  { code:'D06', name:'Loss of Pay (LOP)',         type:'LOP',     typeBadge:'b-red',    formula:'Basic / working days × absent',   tds:true,  round:'Round', active:true  },
]
</script>
