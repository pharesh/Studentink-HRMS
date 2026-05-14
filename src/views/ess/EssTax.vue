<template>
  <div>
    <div class="info-banner info-amber">⚠ Tax Declaration deadline: <strong>15 May 2026</strong>. Submit proofs for all declared investments to prevent excess TDS.</div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">
          Tax Regime &amp; Income
          <select class="form-input" style="width:auto;font-size:10px"><option>New Regime (FY 2025–26)</option><option>Old Regime</option></select>
        </div>
        <div class="info-banner info-blue" style="font-size:10px"><strong>New Regime selected.</strong> Std. deduction ₹75,000 applied. No 80C/80D benefits.</div>
        <table>
          <thead><tr><th>Income Head</th><th>Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td>Basic Salary</td><td>8,40,000</td></tr>
            <tr><td>HRA Received</td><td>1,44,000</td></tr>
            <tr><td>Special Allowance</td><td>1,20,000</td></tr>
            <tr><td>Other Income</td><td><input type="number" class="form-input" style="width:90px" value="0"/></td></tr>
            <tr style="background:#f0f7e6"><td style="font-weight:600">Gross Income</td><td style="font-weight:600">₹11,04,000</td></tr>
            <tr style="background:#f0f7e6"><td style="font-weight:600">Std. Deduction</td><td style="font-weight:600">- ₹75,000</td></tr>
            <tr style="background:#e6f1fb"><td style="font-weight:700">Taxable Income</td><td style="font-weight:700">₹10,29,000</td></tr>
            <tr style="background:#e6f1fb"><td style="font-weight:700">Estimated TDS/yr</td><td style="font-weight:700">₹1,09,200</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">
          Investment Declarations (80C / 80D)
          <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-add-declaration')">+ Add</button>
        </div>
        <table>
          <thead><tr><th>Section</th><th>Investment</th><th>Declared (₹)</th><th>Proof</th><th></th></tr></thead>
          <tbody>
            <tr><td>80C</td><td>PPF</td><td>50,000</td><td><span class="badge b-green">Uploaded</span></td><td><button class="btn btn-sm">View</button></td></tr>
            <tr><td>80C</td><td>ELSS MF</td><td>50,000</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-sm btn-primary">Upload</button></td></tr>
            <tr><td>80D</td><td>Health Insurance</td><td>25,000</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-sm btn-primary">Upload</button></td></tr>
            <tr style="background:#f0f7e6"><td colspan="2" style="font-weight:600">Total Declared</td><td style="font-weight:600">₹1,25,000</td><td colspan="2"></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
</script>
