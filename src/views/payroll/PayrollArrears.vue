<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px">
      <div style="font-size:13px;color:#888780">1 active arrear configuration</div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-payroll-add-arrear')">+ Configure Arrear</button>
    </div>

    <div class="tbl-wrap" style="margin-bottom:14px">
      <table>
        <thead>
          <tr><th>Title</th><th>Arrear Period</th><th>Rate of Pay</th><th>Est. Liability</th><th>Employees</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="a in arrears" :key="a.title">
            <td style="font-weight:600">{{ a.title }}</td>
            <td style="font-size:12px;color:#888780">{{ a.period }}</td>
            <td>{{ a.rate }}</td>
            <td style="font-weight:600">{{ a.liability }}</td>
            <td>{{ a.emp }}</td>
            <td><span :class="['badge', a.active ? 'b-green' : 'b-gray']">{{ a.active ? 'Active' : 'Inactive' }}</span></td>
            <td>
              <div style="display:flex;gap:4px">
                <button class="btn btn-sm">Preview</button>
                <button :class="['btn btn-sm', a.active ? 'btn-danger' : '']">{{ a.active ? 'Deactivate' : 'Reactivate' }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-banner info-blue">
      Active arrears are included as a separate line item in the <strong>next payroll run</strong> after activation.
      Preview total liability before activating.
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const arrears = [
  { title:'Annual Increment Arrear Q4 2025', period:'01 Jan 2026 – 31 Mar 2026', rate:'Current Basic Pay', liability:'₹1,84,000', emp:54, active:true  },
  { title:'Diwali Bonus 2025',               period:'01 Oct 2025 – 31 Oct 2025', rate:'Custom override',   liability:'₹3,20,000', emp:52, active:false },
]
</script>
