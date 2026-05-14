import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const PAGE_TITLES = {
  // HRMS
  'hrms-dashboard':        'Dashboard',
  'hrms-staff':            'Staff Directory',
  'hrms-staff-detail':     'Employee Profile',
  'hrms-profile-requests': 'Profile Change Requests',
  'hrms-holiday':          'Holiday Master',
  'hrms-leave-calendar':   'Calendar Year',
  'hrms-leave-types':      'Leave Type Configuration',
  'hrms-employee-leave':   'Employee Leave Balances',
  'hrms-leave-ledger':     'Leave Ledger',
  'hrms-shift-master':     'Shift Master',
  'hrms-shift-assign':     'Shift Assignments',
  'hrms-att-computation':  'Attendance Computation',
  'hrms-att-reports':      'Attendance Reports',
  'hrms-evaluation':       'Performance Evaluation',
  // NESTS
  'nests-dashboard':       'NESTS — National Dashboard',
  'nests-schools':         'EMRS Schools',
  'nests-grades':          '7th Pay Commission Grades',
  'nests-allowances':      'Special Allowances',
  'nests-header-perms':    'Header Permissions',
  'nests-increment':       'Annual Increment Chart',
  'nests-gis':             'Group Insurance Scheme',
  'nests-reports':         'National Reports',
  // ESS
  'ess-dashboard':         'My Dashboard',
  'ess-leave':             'My Leave',
  'ess-leave-approval':    'Team Leave Requests',
  'ess-attendance':        'My Attendance',
  'ess-payslip':           'My Payslips',
  'ess-tax':               'Tax Declaration',
  'ess-profile':           'My Profile',
  // Payroll
  'payroll-dashboard':       'Dashboard',
  'payroll-financial-year':  'Financial Year',
  'payroll-period':          'Payroll Period Window',
  'payroll-headers':         'Salary Headers (Components)',
  'payroll-grade-pay':       'Grade Pay',
  'payroll-run-payroll':     'Run Payroll — April 2026',
  'payroll-arrears':         'Arrears',
  'payroll-advances':        'Salary Advance / Loans',
  'payroll-payslips':        'Payslips',
  'payroll-employee-salary': 'Salary Profiles',
  'payroll-tax-declarations':'Tax Declarations',
  'payroll-tds':             'TDS Summary',
  'payroll-reports':         'Payroll Reports',
}

export const useAppStore = defineStore('app', () => {
  const mode = ref('hrms')  // 'hrms' | 'nests' | 'ess' | 'payroll'
  const activeRoute = ref('hrms-dashboard')
  const sidebarOpen = ref(false)

  const pageTitle = computed(() => PAGE_TITLES[activeRoute.value] ?? 'Dashboard')

  const modeLabel = computed(() => {
    if (mode.value === 'nests')   return 'NESTS Super-Admin'
    if (mode.value === 'ess')     return 'Employee Self-Service'
    if (mode.value === 'payroll') return 'Payroll Module'
    return 'HR Admin · Jaynik'
  })

  function setMode(m) {
    mode.value = m
    sidebarOpen.value = false
  }

  function setRoute(r) {
    activeRoute.value = r
    sidebarOpen.value = false
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function closeSidebar() {
    sidebarOpen.value = false
  }

  return { mode, activeRoute, sidebarOpen, pageTitle, modeLabel, setMode, setRoute, toggleSidebar, closeSidebar }
})
