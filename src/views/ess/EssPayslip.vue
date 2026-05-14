<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;flex-wrap:wrap;gap:7px">
      <div style="display:flex;gap:7px;flex-wrap:wrap">
        <select class="form-input" style="width:auto"><option>April 2026</option><option>March 2026</option><option>February 2026</option><option>January 2026</option></select>
        <select class="form-input" style="width:auto"><option>FY 2025–26</option><option>FY 2024–25</option></select>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-sm">Download PDF</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-payslip-preview')">Preview Payslip</button>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Payslip History</div>
      <table>
        <thead><tr><th>Month</th><th>FY</th><th>Gross Pay</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="p in payslips" :key="p.month">
            <td>{{ p.month }}</td><td>{{ p.fy }}</td><td>{{ p.gross }}</td><td>{{ p.deductions }}</td>
            <td style="font-weight:600;color:#3b6d11">{{ p.net }}</td>
            <td><span class="badge b-green">Published</span></td>
            <td><button class="btn btn-sm btn-primary">Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card" style="background:#fafaf8">
      <div class="card-title">FY 2025–26 YTD Summary</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        <div style="text-align:center;padding:10px;background:#fff;border:1px solid #e0ddd6;border-radius:8px"><div style="font-size:16px;font-weight:700">₹11.4L</div><div style="font-size:10px;color:#888">Total Gross</div></div>
        <div style="text-align:center;padding:10px;background:#fff;border:1px solid #e0ddd6;border-radius:8px"><div style="font-size:16px;font-weight:700;color:#e24b4a">₹2.28L</div><div style="font-size:10px;color:#888">Total Deductions</div></div>
        <div style="text-align:center;padding:10px;background:#fff;border:1px solid #e0ddd6;border-radius:8px"><div style="font-size:16px;font-weight:700;color:#3b6d11">₹9.12L</div><div style="font-size:10px;color:#888">Net Earned</div></div>
        <div style="text-align:center;padding:10px;background:#fff;border:1px solid #e0ddd6;border-radius:8px"><div style="font-size:16px;font-weight:700;color:#185FA5">₹1.06L</div><div style="font-size:10px;color:#888">TDS Deducted</div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const payslips = [
  { month:'April 2026',    fy:'2025–26', gross:'₹1,18,000', deductions:'₹23,800', net:'₹94,200' },
  { month:'March 2026',    fy:'2025–26', gross:'₹1,18,000', deductions:'₹23,800', net:'₹94,200' },
  { month:'February 2026', fy:'2025–26', gross:'₹1,18,000', deductions:'₹23,800', net:'₹94,200' },
  { month:'January 2026',  fy:'2025–26', gross:'₹1,15,000', deductions:'₹22,900', net:'₹92,100' },
]
</script>
