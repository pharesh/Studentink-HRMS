<template>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Payroll Period Window</div>
      <div class="info-banner info-blue" style="font-size:12px">
        Defines which calendar days are included in each monthly payroll run. This configuration is
        <strong>locked</strong> once the first payroll run is processed.
      </div>

      <div class="section-title">Start Date</div>
      <div class="form-grid fg-2">
        <div class="form-group">
          <label class="form-label">Day <span class="req">*</span></label>
          <select class="form-input">
            <option>1st</option><option>5th</option><option>10th</option>
            <option>15th</option><option>20th</option><option selected>26th</option><option>28th</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Month <span class="req">*</span></label>
          <select class="form-input"><option selected>Previous Month</option><option>Current Month</option></select>
        </div>
      </div>

      <div class="section-title">End Date</div>
      <div class="form-grid fg-2">
        <div class="form-group">
          <label class="form-label">Day <span class="req">*</span></label>
          <select class="form-input">
            <option>1st</option><option>5th</option><option>10th</option>
            <option>15th</option><option>20th</option><option selected>25th</option><option>28th</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Month <span class="req">*</span></label>
          <select class="form-input"><option>Previous Month</option><option selected>Current Month</option></select>
        </div>
      </div>

      <div class="info-banner info-green" style="margin-top:11px">
        <strong>Current config:</strong> April payroll covers <strong>26 Mar – 25 Apr 2026</strong>
      </div>
      <div class="info-banner info-amber">
        ⚠️ Changing this after payroll has been processed requires <strong>Director approval</strong>. Change history is retained.
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button class="btn btn-sm">Revert</button>
        <button class="btn btn-primary btn-sm">Save Configuration</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Configuration Guide</div>
      <div style="font-size:13px;color:#5f5e5a;line-height:1.9">
        <p style="margin-bottom:9px"><strong style="color:#1a1a2e">How it works:</strong></p>
        <p style="margin-bottom:6px">• <strong>Start Date</strong> — the first day attendance is counted for this payroll month</p>
        <p style="margin-bottom:6px">• <strong>End Date</strong> — the last day attendance is counted</p>
        <p style="margin-bottom:6px">• <strong>Month selection</strong> — whether the day refers to the current or previous calendar month</p>
        <hr class="divider"/>
        <p style="margin-bottom:6px"><strong style="color:#1a1a2e">Example:</strong></p>
        <p style="margin-bottom:5px">Config: 26th Prev → 25th Current</p>
        <p style="margin-bottom:5px">→ April payroll = 26 Mar – 25 Apr</p>
        <p style="margin-bottom:5px">→ March payroll = 26 Feb – 25 Mar</p>
        <hr class="divider"/>
        <p style="color:#a32d2d;font-size:12px">⚠️ Avoid setting end day to 29, 30, or 31 — February will silently skip those dates.</p>
      </div>
      <div class="section-title">Change History</div>
      <div style="font-size:12px;color:#888780;line-height:1.8">
        <div style="padding:7px 0;border-bottom:1px solid #f0ede6">Changed by Nihar Sheth · 15 Jan 2026 · 26/Prev → 25/Curr</div>
        <div style="padding:7px 0">Changed by Manish Vekariya · 01 Apr 2025 · 1/Curr → 26/Prev</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
