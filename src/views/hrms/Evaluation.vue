<template>
  <div>
    <div class="toolbar">
      <select class="form-input" style="width:auto;padding:5px 8px"><option>FY 2025–26</option><option>FY 2024–25</option></select>
      <select class="form-input" style="width:auto;padding:5px 8px"><option>All Employees</option><option>Development</option><option>Support</option></select>
      <div class="toolbar-right">
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-review-template')">+ Start Review Cycle</button>
      </div>
    </div>
    <div class="info-banner info-blue" style="font-size:10px">Review templates are configurable: <strong>OKR/Competency style</strong> for corporate orgs · <strong>ACR style</strong> for EMRS/govt schools.</div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Employee</th><th>Period</th><th>Template</th><th>Self-Assessment</th><th>Manager Review</th><th>HR Sign-off</th><th>Score</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="rev in reviews" :key="rev.employee">
            <td style="font-weight:600">{{ rev.employee }}</td>
            <td>{{ rev.period }}</td>
            <td><span class="chip">{{ rev.template }}</span></td>
            <td><span class="badge" :class="rev.selfClass">{{ rev.self }}</span></td>
            <td><span class="badge" :class="rev.mgrClass">{{ rev.mgr }}</span></td>
            <td><span class="badge" :class="rev.hrClass">{{ rev.hr }}</span></td>
            <td><span v-if="rev.score" style="font-weight:600;color:#185FA5">{{ rev.score }}</span><span v-else>—</span></td>
            <td><span class="badge" :class="rev.statusClass">{{ rev.status }}</span></td>
            <td><button class="btn btn-sm" :class="rev.btnClass">{{ rev.btnLabel }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const reviews = [
  { employee:'Alpesh Kothari', period:'FY 2025–26', template:'OKR', self:'Done', selfClass:'b-green', mgr:'Done', mgrClass:'b-green', hr:'Done', hrClass:'b-green', score:'4.2/5.0', status:'Published',    statusClass:'b-green', btnLabel:'View',       btnClass:'' },
  { employee:'Priya Mehta',    period:'FY 2025–26', template:'OKR', self:'Done', selfClass:'b-green', mgr:'Pending', mgrClass:'b-amber', hr:'—', hrClass:'b-gray',  score:null,     status:'Under Review',  statusClass:'b-amber', btnLabel:'Review Now', btnClass:'btn-primary' },
  { employee:'Rahul Joshi',    period:'FY 2025–26', template:'OKR', self:'Pending', selfClass:'b-amber', mgr:'—', mgrClass:'b-gray', hr:'—', hrClass:'b-gray',  score:null,     status:'Draft',         statusClass:'b-amber', btnLabel:'Remind',     btnClass:'' },
]
</script>
