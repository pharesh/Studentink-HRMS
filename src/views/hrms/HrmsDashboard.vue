<template>
  <div>
    <div class="stat-grid g4" style="margin-bottom:11px">
      <div class="stat-card" @click="modalStore.openModal('modal-present')">
        <div class="stat-label">Total Employees</div>
        <div class="stat-val">56</div>
        <div class="stat-sub">54 active · 2 pre-joining</div>
      </div>
      <div class="stat-card" @click="modalStore.openModal('modal-present')">
        <div class="stat-label">Present Today</div>
        <div class="stat-val" style="color:#3b6d11">47</div>
        <div class="stat-sub">Click to view list</div>
      </div>
      <div class="stat-card" @click="modalStore.openModal('modal-absent')">
        <div class="stat-label">Absent Today</div>
        <div class="stat-val" style="color:#e24b4a">4</div>
        <div class="stat-sub">2 unauthorised</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">On Leave Today</div>
        <div class="stat-val" style="color:#185FA5">3</div>
        <div class="stat-sub">Paid Leave: 2 · SH: 1</div>
      </div>
    </div>
    <div class="stat-grid g4">
      <div class="stat-card">
        <div class="stat-label">Late Present</div>
        <div class="stat-val" style="color:#854f0b">2</div>
        <div class="stat-sub">Marked today</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Week Off Today</div>
        <div class="stat-val">0</div>
        <div class="stat-sub">Sunday is off</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending Requests</div>
        <div class="stat-val" style="color:#534ab7">3</div>
        <div class="stat-sub">Profile change requests</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Apr Payroll</div>
        <div class="stat-val" style="font-size:14px"><span class="badge b-amber" style="font-size:11px">Processing</span></div>
        <div class="stat-sub">Pending publish</div>
      </div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">Employees on Leave Today</div>
        <table>
          <thead><tr><th>Name</th><th>Leave Type</th><th>Full/Half</th><th>Dept.</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">Alpesh Kothari</td><td><span class="badge b-blue">Paid Leave</span></td><td>Full Day</td><td>Development</td></tr>
            <tr><td style="font-weight:600">Priya Mehta</td><td><span class="badge b-blue">Paid Leave</span></td><td>Half Day (AM)</td><td>Support</td></tr>
            <tr><td style="font-weight:600">Rahul Joshi</td><td><span class="badge b-gold">Statutory Holiday</span></td><td>Full Day</td><td>Development</td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Late Present Today</div>
        <table>
          <thead><tr><th>Name</th><th>In Time</th><th>Grace</th><th>Shift</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">Sunita Rao</td><td style="color:#854f0b;font-weight:600">10:22</td><td>09:45</td><td>Shift 1</td></tr>
            <tr><td style="font-weight:600">Kiran Patel</td><td style="color:#854f0b;font-weight:600">10:31</td><td>10:15</td><td>Shift 2</td></tr>
          </tbody>
        </table>
        <hr class="divider"/>
        <div class="card-title" style="margin-bottom:8px">Absent Today (Unauthorised)</div>
        <table>
          <thead><tr><th>Name</th><th>Dept.</th><th>Last Present</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">Deepa Shah</td><td>Support</td><td>29 Apr 2026</td></tr>
            <tr><td style="font-weight:600">Manoj Kumar</td><td>Sales</td><td>28 Apr 2026</td></tr>
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
