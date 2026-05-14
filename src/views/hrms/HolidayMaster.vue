<template>
  <div>
    <div class="info-banner info-green">When a new Leave Calendar Year is activated, holidays are <strong>auto-assigned</strong> to all active employees via background job.</div>
    <div class="toolbar">
      <select class="form-input" style="width:auto;padding:5px 8px"><option>2026</option><option>2025</option></select>
      <select class="form-input" style="width:auto;padding:5px 8px">
        <option>All Types</option><option>National Holiday</option><option>Regional</option><option>Restricted</option><option>Academy-Specific</option>
      </select>
      <div class="toolbar-right">
        <button class="btn btn-sm">⬇ Export</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-add-holiday')">+ Add Holiday</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Date</th><th>Day</th><th>Holiday Name</th><th>Type</th><th>Applies To</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="h in holidays" :key="h.date">
            <td>{{ h.date }}</td><td>{{ h.day }}</td>
            <td style="font-weight:600">{{ h.name }}</td>
            <td><span class="badge" :class="h.badgeClass">{{ h.type }}</span></td>
            <td>{{ h.appliesTo }}</td>
            <td><span class="badge b-green">Active</span></td>
            <td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">✏️</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="font-size:10px;color:#888780;padding:2px 4px">14 holidays configured for 2026 · 8 national/regional · 1 academy-specific</div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const holidays = [
  { date:'14 Jan 2026', day:'Wed', name:'Makar Sankranti',  type:'Regional',         badgeClass:'b-gold',  appliesTo:'All' },
  { date:'26 Jan 2026', day:'Mon', name:'Republic Day',     type:'National',         badgeClass:'b-blue',  appliesTo:'All' },
  { date:'18 Mar 2026', day:'Wed', name:'Holi',             type:'Regional',         badgeClass:'b-gold',  appliesTo:'All' },
  { date:'14 Apr 2026', day:'Tue', name:'Ambedkar Jayanti', type:'National',         badgeClass:'b-blue',  appliesTo:'All' },
  { date:'15 Aug 2026', day:'Sat', name:'Independence Day', type:'National',         badgeClass:'b-blue',  appliesTo:'All' },
  { date:'02 Oct 2026', day:'Fri', name:'Gandhi Jayanti',   type:'National',         badgeClass:'b-blue',  appliesTo:'All' },
  { date:'20 Oct 2026', day:'Tue', name:'Diwali',           type:'Regional',         badgeClass:'b-gold',  appliesTo:'All' },
  { date:'09 Nov 2026', day:'Mon', name:'Gujarati New Year',type:'Academy-Specific', badgeClass:'b-teal',  appliesTo:'Ahmedabad Branch' },
]
</script>
