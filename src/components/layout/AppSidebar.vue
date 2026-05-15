<template>
  <div class="sidebar-root">
  <!-- Mobile backdrop -->
  <div
    class="sidebar-backdrop"
    :class="{ active: appStore.sidebarOpen }"
    @click="appStore.closeSidebar()"
  />

  <aside class="sidebar" :class="{ 'mobile-open': appStore.sidebarOpen }">
    <div class="logo-area">
      <div>
        <div class="logo-text">studentink</div>
        <div class="logo-sub">Jaynik Eduserve · HR Admin</div>
      </div>
    </div>

    <div class="mode-pills">
      <div class="mode-pill" :class="{ active: appStore.mode === 'hrms' }"    @click="switchMode('hrms')">HRMS</div>
      <div class="mode-pill" :class="{ active: appStore.mode === 'nests' }"   @click="switchMode('nests')">NESTS</div>
      <div class="mode-pill" :class="{ active: appStore.mode === 'ess' }"     @click="switchMode('ess')">Portal</div>
      <div class="mode-pill" :class="{ active: appStore.mode === 'payroll' }" @click="switchMode('payroll')">Payroll</div>
    </div>

    <!-- HRMS NAV -->
    <template v-if="appStore.mode === 'hrms'">
      <div class="nav-section">
        <div class="nav-label">Overview</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-dashboard') }" :to="{ name: 'hrms-dashboard' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📊</span>Dashboard
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-group-label" @click="mastersOpen = !mastersOpen">
          <span>Masters</span>
          <span class="nav-chevron" :class="{ open: mastersOpen }">›</span>
        </div>
        <div class="nav-group-items" :class="{ open: mastersOpen }">
          <RouterLink class="nav-item nav-item-sub" :class="{ active: isActive('hrms-departments') }" :to="{ name: 'hrms-departments' }" @click="appStore.closeSidebar()">
            <span class="nav-icon">🏢</span>Departments
          </RouterLink>
        </div>
      </div>
      <div class="nav-section">
        <div class="nav-label">People</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-staff') }" :to="{ name: 'hrms-staff' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">👥</span>Staff Master
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-profile-requests') }" :to="{ name: 'hrms-profile-requests' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🔔</span>Profile Requests<span class="nav-badge">3</span>
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Leave</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-holiday') }" :to="{ name: 'hrms-holiday' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📆</span>Holiday Master
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-leave-calendar') }" :to="{ name: 'hrms-leave-calendar' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📅</span>Calendar Year
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-leave-types') }" :to="{ name: 'hrms-leave-types' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">⚙️</span>Leave Types
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-employee-leave') }" :to="{ name: 'hrms-employee-leave' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🗂️</span>Employee Leave
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-leave-ledger') }" :to="{ name: 'hrms-leave-ledger' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📒</span>Leave Ledger
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Shifts</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-shift-master') }" :to="{ name: 'hrms-shift-master' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🕐</span>Shift Master
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-shift-assign') }" :to="{ name: 'hrms-shift-assign' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🗓</span>Shift Assignments
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Attendance</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-att-computation') }" :to="{ name: 'hrms-att-computation' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🔢</span>Computation Grid
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-att-reports') }" :to="{ name: 'hrms-att-reports' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📈</span>Att. Reports
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Evaluation</div>
        <RouterLink class="nav-item" :class="{ active: isActive('hrms-evaluation') }" :to="{ name: 'hrms-evaluation' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">⭐</span>Reviews
        </RouterLink>
      </div>
    </template>

    <!-- NESTS NAV -->
    <template v-if="appStore.mode === 'nests'">
      <div class="nav-section">
        <div class="nav-label">NESTS Overview</div>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-dashboard') }" :to="{ name: 'nests-dashboard' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🏫</span>National Dashboard
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-schools') }" :to="{ name: 'nests-schools' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📋</span>All Schools (740+)
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Configuration</div>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-grades') }" :to="{ name: 'nests-grades' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🏷️</span>7th Pay Commission
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-allowances') }" :to="{ name: 'nests-allowances' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">💰</span>Special Allowances
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-header-perms') }" :to="{ name: 'nests-header-perms' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🔐</span>Header Permissions
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-increment') }" :to="{ name: 'nests-increment' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📊</span>Increment Chart
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-gis') }" :to="{ name: 'nests-gis' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🛡️</span>Group Insurance
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Reports</div>
        <RouterLink class="nav-item" :class="{ active: isActive('nests-reports') }" :to="{ name: 'nests-reports' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📑</span>National Reports
        </RouterLink>
      </div>
    </template>

    <!-- ESS NAV -->
    <template v-if="appStore.mode === 'ess'">
      <div class="nav-section">
        <div class="nav-label">Self Service</div>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-dashboard') }" :to="{ name: 'ess-dashboard' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🏠</span>My Dashboard
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-leave') }" :to="{ name: 'ess-leave' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🗂️</span>My Leave
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-leave-approval') }" :to="{ name: 'ess-leave-approval' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">✅</span>Team Leaves<span class="nav-badge">2</span>
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-attendance') }" :to="{ name: 'ess-attendance' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📅</span>My Attendance
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-payslip') }" :to="{ name: 'ess-payslip' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📄</span>Payslips
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-tax') }" :to="{ name: 'ess-tax' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🧾</span>Tax Declaration
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('ess-profile') }" :to="{ name: 'ess-profile' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">👤</span>My Profile
        </RouterLink>
      </div>
    </template>

    <!-- PAYROLL NAV -->
    <template v-if="appStore.mode === 'payroll'">
      <div class="nav-section">
        <div class="nav-label">Overview</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-dashboard') }" :to="{ name: 'payroll-dashboard' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📊</span>Dashboard
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Configuration</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-financial-year') }" :to="{ name: 'payroll-financial-year' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📅</span>Financial Year
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-period') }" :to="{ name: 'payroll-period' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🗓️</span>Payroll Period
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-headers') }" :to="{ name: 'payroll-headers' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">⚙️</span>Salary Headers
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-grade-pay') }" :to="{ name: 'payroll-grade-pay' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🏷️</span>Grade Pay
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Payroll Run</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-run-payroll') }" :to="{ name: 'payroll-run-payroll' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">▶️</span>Run Payroll
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-arrears') }" :to="{ name: 'payroll-arrears' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📋</span>Arrears
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-advances') }" :to="{ name: 'payroll-advances' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">💳</span>Salary Advance
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Employee</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-payslips') }" :to="{ name: 'payroll-payslips' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📄</span>Payslips
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-employee-salary') }" :to="{ name: 'payroll-employee-salary' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">👤</span>Salary Profiles
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Tax</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-tax-declarations') }" :to="{ name: 'payroll-tax-declarations' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📝</span>Tax Declarations
        </RouterLink>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-tds') }" :to="{ name: 'payroll-tds' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">🧾</span>TDS Summary
        </RouterLink>
      </div>
      <div class="nav-section">
        <div class="nav-label">Reports</div>
        <RouterLink class="nav-item" :class="{ active: isActive('payroll-reports') }" :to="{ name: 'payroll-reports' }" @click="appStore.closeSidebar()">
          <span class="nav-icon">📈</span>Payroll Reports
        </RouterLink>
      </div>
    </template>
  </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/useAppStore'

const router   = useRouter()
const appStore = useAppStore()

const mastersOpen = ref(true)

function isActive(name) {
  return router.currentRoute.value.name === name
}

function switchMode(m) {
  appStore.setMode(m)
  const firstRoutes = {
    hrms:    'hrms-dashboard',
    nests:   'nests-dashboard',
    ess:     'ess-dashboard',
    payroll: 'payroll-dashboard',
  }
  router.push({ name: firstRoutes[m] })
}
</script>

<style scoped>
.sidebar-root { display: contents; }

/* Collapsible nav group */
.nav-group-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #b4b2a9;
  padding: 6px 16px 3px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}
.nav-group-label:hover { color: #5f5e5a; }

.nav-chevron {
  font-size: 14px;
  line-height: 1;
  display: inline-block;
  transition: transform 0.22s ease;
  color: #c8c5bc;
}
.nav-chevron.open { transform: rotate(90deg); }

.nav-group-items {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s ease;
}
.nav-group-items.open { max-height: 600px; }

/* Slightly indented sub-items */
.nav-item-sub { padding-left: 28px; }
</style>
