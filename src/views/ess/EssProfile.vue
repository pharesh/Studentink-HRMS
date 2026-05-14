<template>
  <div>
    <div class="info-banner info-blue" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:7px">
      <span>Profile updates are reviewed by HR before being applied. Sensitive fields (PAN, Bank) require document proof.</span>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-profile-update')">Request Update</button>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">Personal Information</div>
        <div class="emp-field"><span class="efl">Full Name</span><span class="efv">Alpesh Kothari</span></div>
        <div class="emp-field"><span class="efl">Date of Birth</span><span class="efv">12 March 1990</span></div>
        <div class="emp-field"><span class="efl">Gender</span><span class="efv">Male</span></div>
        <div class="emp-field"><span class="efl">Mobile</span><span class="efv">+91 98765 43210</span></div>
        <div class="emp-field"><span class="efl">Personal Email</span><span class="efv">alpesh.kothari@gmail.com</span></div>
        <div class="emp-field"><span class="efl">PAN</span><span class="efv">ABCPK●●●●F <span style="font-size:9px;color:#888">🔒AES</span></span></div>
        <div class="emp-field"><span class="efl">Aadhaar</span><span class="efv">●●●● ●●●● 7842 <span style="font-size:9px;color:#888">🔒</span></span></div>
      </div>
      <div class="card">
        <div class="card-title">Employment &amp; Bank Details</div>
        <div class="emp-field"><span class="efl">Employee ID</span><span class="efv">EMP-0014</span></div>
        <div class="emp-field"><span class="efl">Designation</span><span class="efv">Senior Developer</span></div>
        <div class="emp-field"><span class="efl">Department</span><span class="efv">Development</span></div>
        <div class="emp-field"><span class="efl">Date of Joining</span><span class="efv">10 June 2019</span></div>
        <div class="emp-field"><span class="efl">Reporting Manager</span><span class="efv">Manish Vekariya</span></div>
        <div class="emp-field"><span class="efl">Bank Account</span><span class="efv">●●●●●●●3812 – HDFC <span style="font-size:9px;color:#888">🔒AES</span></span></div>
        <div class="emp-field"><span class="efl">IFSC</span><span class="efv">HDFC000●●●●</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
</script>
