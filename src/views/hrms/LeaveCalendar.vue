<template>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Create Leave Calendar Year</div>
      <div class="form-grid fg-2">
        <div class="form-group"><label class="form-label">Title <span class="req">*</span></label><input class="form-input" value="2027" placeholder="e.g. 2027"/></div>
        <div class="form-group"><label class="form-label">Note</label><input class="form-input" placeholder="Optional note"/></div>
        <div class="form-group"><label class="form-label">Start Date <span class="req">*</span></label><input type="date" class="form-input" value="2027-01-01"/></div>
        <div class="form-group"><label class="form-label">End Date <span class="req">*</span></label><input type="date" class="form-input" value="2027-12-31"/></div>
      </div>
      <label style="font-size:11px;display:flex;align-items:center;gap:6px;margin-bottom:9px"><input type="checkbox" checked/> Set as Current year (deactivates previous)</label>
      <label style="font-size:11px;display:flex;align-items:center;gap:6px;margin-bottom:9px"><input type="checkbox" checked/> Auto-assign holidays from Holiday Master on activation</label>
      <div class="info-banner info-blue" style="font-size:10px">Leave Calendar Year is separate from the financial year and does not affect attendance computation.</div>
      <div style="display:flex;justify-content:flex-end"><button class="btn btn-primary btn-sm">Create Year</button></div>
    </div>
    <div class="card">
      <div class="card-title">Calendar Years</div>
      <table>
        <thead><tr><th>Year</th><th>Period</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600">2026</td><td style="font-size:10px;color:#888780">1 Jan – 31 Dec 2026</td><td><span class="badge b-blue">Current</span></td><td><button class="btn btn-sm btn-icon">✏️</button></td></tr>
          <tr><td style="font-weight:600">2025</td><td style="font-size:10px;color:#888780">1 Jan – 31 Dec 2025</td><td><span class="badge b-gray">Inactive</span></td><td><button class="btn btn-sm btn-icon">✏️</button></td></tr>
          <tr><td style="font-weight:600">2024</td><td style="font-size:10px;color:#888780">1 Jan – 31 Dec 2024</td><td><span class="badge b-gray">Inactive</span></td><td><button class="btn btn-sm btn-icon">✏️</button></td></tr>
          <tr><td style="font-weight:600">2019–20</td><td style="font-size:10px;color:#888780">1 Jun 2019 – 31 Mar 2020</td><td><span class="badge b-gray">Inactive</span></td><td><button class="btn btn-sm btn-icon">✏️</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>
