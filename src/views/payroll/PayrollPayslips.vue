<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:13px;align-items:center;flex-wrap:wrap">
      <select class="form-input" style="width:auto">
        <option>All Employees</option><option>Alpesh Kothari</option><option>Priya Mehta</option><option>Manish Vekariya</option>
      </select>
      <select class="form-input" style="width:auto">
        <option>FY 2026–27</option><option>FY 2025–26</option>
      </select>
      <select class="form-input" style="width:auto">
        <option>All Months</option><option>April 2026</option><option>March 2026</option><option>February 2026</option>
      </select>
      <button class="btn btn-sm" style="margin-left:auto">Bulk Download</button>
      <button class="btn btn-sm btn-primary">Filter</button>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr><th>Employee</th><th>Month</th><th>Gross (₹)</th><th>Deductions (₹)</th><th>Net Pay (₹)</th><th>Published</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="p in payslips" :key="p.name + p.month">
            <td>
              <div style="font-weight:600">{{ p.name }}</div>
              <div style="font-size:11px;color:#888780">{{ p.id }}</div>
            </td>
            <td>{{ p.month }}</td>
            <td>{{ p.gross }}</td>
            <td>{{ p.ded }}</td>
            <td style="font-weight:600">{{ p.net }}</td>
            <td style="font-size:12px;color:#888780">{{ p.published || '—' }}</td>
            <td><span :class="['badge', p.status === 'Published' ? 'b-green' : 'b-amber']">{{ p.status }}</span></td>
            <td><button class="btn btn-sm" @click="modalStore.openModal('modal-payroll-payslip')">{{ p.status === 'Published' ? 'View PDF' : 'Preview' }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-banner info-amber">
      Once a payslip is in <strong>Paid</strong> status, its data is locked and cannot be modified by any subsequent payroll changes.
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const payslips = [
  { name:'Alpesh Kothari',  id:'EMP-001', month:'Apr 2026', gross:'68,000',   ded:'9,840',  net:'58,160', published:null,         status:'Pending'   },
  { name:'Alpesh Kothari',  id:'EMP-001', month:'Mar 2026', gross:'68,000',   ded:'9,840',  net:'58,160', published:'31 Mar 2026', status:'Published' },
  { name:'Priya Mehta',     id:'EMP-002', month:'Mar 2026', gross:'24,000',   ded:'3,200',  net:'20,800', published:'31 Mar 2026', status:'Published' },
  { name:'Manish Vekariya', id:'EMP-004', month:'Mar 2026', gross:'1,08,000', ded:'14,400', net:'93,600', published:'31 Mar 2026', status:'Published' },
]
</script>
