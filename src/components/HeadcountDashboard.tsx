import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { schools, interimAssignments, getDriverSummaries, getPortfolioMetrics, type School, type DriverCategory, type ModelStatus } from '../data/headcountData';

// ============================================================================
// HELPERS
// ============================================================================

const fmt = (n: number): string => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

const fmtNum = (n: number): string => n.toLocaleString();

const varianceClass = (v: number) => v > 0 ? 'text-red-400' : v < 0 ? 'text-emerald-400' : 'text-slate-400';
const varianceText = (v: number) => v > 0 ? `+${v}` : `${v}`;

const statusDot = (s: ModelStatus) => {
  if (s === 'over') return 'bg-red-500';
  if (s === 'under') return 'bg-emerald-500';
  return 'bg-slate-500';
};

// ============================================================================
// TYPES
// ============================================================================

type Tab = 'overview' | 'drivers' | 'schools' | 'interim';
type StatusFilter = 'all' | 'over' | 'at' | 'under';
type SortKey = 'name' | 'enrolled' | 'guidesActual' | 'variance' | 'annualCost';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const KpiCard: React.FC<{ label: string; value: string; sub?: string; accent?: string }> = ({ label, value, sub, accent }) => (
  <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
    <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-2xl font-bold ${accent || 'text-white'}`}>{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

const Toggle: React.FC<{ options: { id: string; label: string }[]; value: string; onChange: (v: string) => void }> = ({ options, value, onChange }) => (
  <div className="flex items-center gap-1 bg-slate-700/60 rounded-lg p-1">
    {options.map(o => (
      <button key={o.id} onClick={() => onChange(o.id)}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${value === o.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-300 hover:text-white'}`}>
        {o.label}
      </button>
    ))}
  </div>
);

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

const HeadcountDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>('overview');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('variance');
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedDriver, setExpandedDriver] = useState<string | null>(null);
  const [expandedCampus, setExpandedCampus] = useState<string | null>(null);

  const metrics = useMemo(() => getPortfolioMetrics(), []);
  const drivers = useMemo(() => getDriverSummaries(), []);

  const filteredSchools = useMemo(() => {
    let list = [...schools];
    if (statusFilter === 'over') list = list.filter(s => s.variance > 0);
    else if (statusFilter === 'at') list = list.filter(s => s.variance === 0);
    else if (statusFilter === 'under') list = list.filter(s => s.variance < 0);
    list.sort((a, b) => {
      const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
      if (typeof av === 'string') return sortAsc ? (av as string).localeCompare(bv as string) : (bv as string).localeCompare(av as string);
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return list;
  }, [statusFilter, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const interimByCampus = useMemo(() => {
    const map: Record<string, typeof interimAssignments> = {};
    for (const a of interimAssignments) {
      if (!map[a.homeCampus]) map[a.homeCampus] = [];
      map[a.homeCampus].push(a);
    }
    return map;
  }, []);

  const driverSchools = (driver: DriverCategory) => schools.filter(s => s.driver === driver && s.variance !== 0);

  // ========== TABS ==========

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: '📊' },
    { id: 'drivers', label: 'Driver Analysis', icon: '🎯' },
    { id: 'schools', label: 'School Detail', icon: '📋' },
    { id: 'interim', label: 'Interim Assignments', icon: '🔄' },
  ];

  // PIE DATA
  const pieData = drivers.map(d => ({ name: d.driver, value: Math.max(d.annualCost, 0) }));
  const PIE_COLORS = drivers.map(d => d.color);

  // BAR DATA for top over-model schools
  const barData = schools
    .filter(s => s.variance > 0)
    .sort((a, b) => b.annualCost - a.annualCost)
    .slice(0, 8)
    .map(s => ({ name: s.name.replace(/^Alpha (School: )?/, '').replace(' Academy', ''), cost: s.annualCost / 1000, excess: s.variance }));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* HEADER */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Headcount Out-of-Model Analysis</h1>
            <p className="text-sm text-slate-400 mt-1">
              {metrics.totalSchools} schools&nbsp;&nbsp;|&nbsp;&nbsp;{fmtNum(metrics.totalEnrolled)} students&nbsp;&nbsp;|&nbsp;&nbsp;{metrics.totalGuides} guides&nbsp;&nbsp;|&nbsp;&nbsp;Updated Feb 2026
            </p>
          </div>
          <Toggle
            options={[
              { id: 'all', label: 'All Schools' },
              { id: 'over', label: `Over Model (${metrics.overModelSchools})` },
              { id: 'at', label: `At Model (${metrics.atModelSchools})` },
              { id: 'under', label: `Under (${metrics.underModelSchools})` },
            ]}
            value={statusFilter}
            onChange={v => setStatusFilter(v as StatusFilter)}
          />
        </div>
      </div>

      {/* TAB BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <div className="flex gap-1 bg-slate-800/60 rounded-lg p-1 w-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === t.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ================================================================
            OVERVIEW TAB
            ================================================================ */}
        {tab === 'overview' && (
          <>
            {/* KPI ROW */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <KpiCard label="Total Guides" value={`${metrics.totalGuides}`} sub={`Model: ${metrics.totalModel}`} />
              <KpiCard label="Excess Guides" value={`+${metrics.totalVariance}`} sub={`${metrics.overModelSchools} schools over model`} accent="text-red-400" />
              <KpiCard label="Annual OOM Cost" value={fmt(metrics.overModelCost)} sub="Estimated annualized" accent="text-amber-400" />
              <KpiCard label="Student:Guide" value={`${metrics.studentGuideRatio.toFixed(1)}:1`} sub="Model targets 8:1 to 25:1" />
              <KpiCard label="Utilization" value={`${metrics.capacityUtilization.toFixed(1)}%`} sub={`${fmtNum(metrics.totalEnrolled)} / ${fmtNum(metrics.totalCapacity)} seats`} />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PIE: Cost by Driver */}
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">OOM Cost by Driver Category</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: '#475569' }}
                      fontSize={11} fill="#8884d8">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* BAR: Top excess schools */}
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Top Schools by OOM Cost ($K)</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} layout="vertical" margin={{ left: 80, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={80} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }}
                      formatter={(v: number) => [`$${v.toFixed(0)}K`, 'Annual Cost']} />
                    <Bar dataKey="cost" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DRIVER SUMMARY TABLE */}
            <div className="table-card">
              <div className="px-5 py-4 border-b border-slate-700">
                <h3 className="text-sm font-semibold text-slate-300">Cost by Driver Category</h3>
                <p className="text-xs text-slate-500 mt-1">Click a row to expand school detail</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left px-5 py-3 text-xs uppercase">Driver</th>
                    <th className="text-right px-4 py-3 text-xs uppercase">Schools</th>
                    <th className="text-right px-4 py-3 text-xs uppercase">Excess Guides</th>
                    <th className="text-right px-4 py-3 text-xs uppercase">Annual Cost</th>
                    <th className="text-right px-4 py-3 text-xs uppercase">% of Total</th>
                    <th className="text-left px-4 py-3 text-xs uppercase">Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map(d => (
                    <React.Fragment key={d.driver}>
                      <tr className="cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => setExpandedDriver(expandedDriver === d.driver ? null : d.driver)}>
                        <td className="px-5 py-3 font-medium">
                          <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: d.color }} />
                          {expandedDriver === d.driver ? '▼' : '▶'} {d.driver}
                        </td>
                        <td className="text-right px-4 py-3">{d.schools}</td>
                        <td className={`text-right px-4 py-3 font-mono ${d.excessGuides > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{varianceText(d.excessGuides)}</td>
                        <td className="text-right px-4 py-3 font-mono">{fmt(d.annualCost)}</td>
                        <td className="text-right px-4 py-3">{d.pctOfTotal.toFixed(0)}%</td>
                        <td className="px-4 py-3 text-xs text-slate-400">{d.nature}</td>
                      </tr>
                      {expandedDriver === d.driver && driverSchools(d.driver).map(s => (
                        <tr key={s.name} className="bg-slate-800/50">
                          <td className="px-5 py-2 pl-10 text-xs text-slate-300">{s.name}</td>
                          <td className="text-right px-4 py-2 text-xs">{s.enrolled} students</td>
                          <td className={`text-right px-4 py-2 text-xs font-mono ${varianceClass(s.variance)}`}>{varianceText(s.variance)}</td>
                          <td className="text-right px-4 py-2 text-xs font-mono">{s.annualCost !== 0 ? fmt(s.annualCost) : '—'}</td>
                          <td className="text-right px-4 py-2 text-xs">{s.studentGuideRatio}</td>
                          <td className="px-4 py-2 text-xs text-slate-500">{s.notes}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {/* TOTAL ROW */}
                  <tr className="font-bold border-t border-slate-600">
                    <td className="px-5 py-3">TOTAL</td>
                    <td className="text-right px-4 py-3">{drivers.reduce((s, d) => s + d.schools, 0)}</td>
                    <td className="text-right px-4 py-3 font-mono text-red-400">+{drivers.reduce((s, d) => s + Math.max(d.excessGuides, 0), 0)}</td>
                    <td className="text-right px-4 py-3 font-mono">{fmt(drivers.reduce((s, d) => s + d.annualCost, 0))}</td>
                    <td className="text-right px-4 py-3">100%</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DECISIONS NEEDED */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h3 className="text-sm font-semibold text-amber-400 mb-3">⚡ Decisions Outstanding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Austin Training Hub', cost: '$3.5M/yr', q: 'Formalize as central investment with a cap, or reduce?' },
                  { title: 'Product Ratios (BTX, NYC, TSA)', cost: '$1.9M/yr', q: 'Update models to match actual ratios, or revert to standard?' },
                  { title: 'Pre-Launch Staffing Policy', cost: '~$1.1M/yr', q: 'When do schools enroll students or release guides?' },
                  { title: 'Temporary Variance', cost: '~$1.0M/yr', q: 'Scottsdale, Plano, Nova Austin — have these self-resolved?' },
                ].map(d => (
                  <div key={d.title} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{d.title}</span>
                      <span className="text-xs font-mono text-amber-400">{d.cost}</span>
                    </div>
                    <p className="text-xs text-slate-400">{d.q}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ================================================================
            DRIVERS TAB
            ================================================================ */}
        {tab === 'drivers' && (
          <>
            {drivers.map(d => (
              <div key={d.driver} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="px-5 py-4 flex items-center justify-between border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <div>
                      <h3 className="text-base font-semibold text-white">{d.driver}</h3>
                      <p className="text-xs text-slate-400">{d.nature}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-amber-400 font-mono">{fmt(d.annualCost)}</div>
                    <div className="text-xs text-slate-500">{varianceText(d.excessGuides)} guides · {d.pctOfTotal.toFixed(0)}% of total</div>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase">
                      <th className="text-left px-5 py-2">School</th>
                      <th className="text-right px-3 py-2">Students</th>
                      <th className="text-right px-3 py-2">Guides</th>
                      <th className="text-right px-3 py-2">Model</th>
                      <th className="text-right px-3 py-2">Variance</th>
                      <th className="text-right px-3 py-2">Ratio</th>
                      <th className="text-right px-3 py-2">Cost</th>
                      <th className="text-left px-3 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driverSchools(d.driver).map(s => (
                      <tr key={s.name} className="border-t border-slate-700/30 hover:bg-slate-700/30">
                        <td className="px-5 py-2.5 text-slate-200">{s.name}</td>
                        <td className="text-right px-3 py-2.5 font-mono">{s.enrolled}</td>
                        <td className="text-right px-3 py-2.5 font-mono">{s.guidesActual}</td>
                        <td className="text-right px-3 py-2.5 font-mono text-slate-500">{s.guidesModel}</td>
                        <td className={`text-right px-3 py-2.5 font-mono font-semibold ${varianceClass(s.variance)}`}>{varianceText(s.variance)}</td>
                        <td className="text-right px-3 py-2.5 text-slate-400">{s.studentGuideRatio}</td>
                        <td className="text-right px-3 py-2.5 font-mono">{s.annualCost !== 0 ? fmt(s.annualCost) : '—'}</td>
                        <td className="px-3 py-2.5 text-xs text-slate-500 max-w-xs">{s.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </>
        )}

        {/* ================================================================
            SCHOOLS TAB
            ================================================================ */}
        {tab === 'schools' && (
          <div className="table-card">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-300">All Schools ({filteredSchools.length})</h3>
                <p className="text-xs text-slate-500 mt-1">Click column headers to sort</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr>
                    {([
                      ['name', 'School'],
                      ['enrolled', 'Enrolled'],
                      ['guidesActual', 'Guides'],
                      ['', 'Model'],
                      ['variance', 'Variance'],
                      ['annualCost', 'Annual Cost'],
                      ['', 'Ratio'],
                      ['', 'Type'],
                      ['', 'Driver'],
                    ] as [string, string][]).map(([key, label]) => (
                      <th key={label}
                        className={`px-4 py-3 text-xs uppercase ${key ? 'cursor-pointer hover:text-white' : ''} ${label === 'School' ? 'text-left' : 'text-right'}`}
                        onClick={() => key && handleSort(key as SortKey)}>
                        {label} {sortKey === key ? (sortAsc ? '▲' : '▼') : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map(s => (
                    <tr key={s.name} className="border-t border-slate-700/20 hover:bg-slate-700/30">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${statusDot(s.status)}`} />
                          <span className="text-slate-200">{s.name}</span>
                        </div>
                      </td>
                      <td className="text-right px-4 py-2.5 font-mono">{s.enrolled || '—'}</td>
                      <td className="text-right px-4 py-2.5 font-mono">{s.guidesActual || '—'}</td>
                      <td className="text-right px-4 py-2.5 font-mono text-slate-500">{s.guidesModel || '—'}</td>
                      <td className={`text-right px-4 py-2.5 font-mono font-semibold ${varianceClass(s.variance)}`}>
                        {s.variance !== 0 ? varianceText(s.variance) : '—'}
                      </td>
                      <td className="text-right px-4 py-2.5 font-mono">
                        {s.annualCost !== 0 ? fmt(s.annualCost) : '—'}
                      </td>
                      <td className="text-right px-4 py-2.5 text-slate-400">{s.enrolled > 0 ? s.studentGuideRatio : '—'}</td>
                      <td className="text-right px-4 py-2.5">
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">{s.schoolType}</span>
                      </td>
                      <td className="text-right px-4 py-2.5 text-xs text-slate-500">{s.driver}</td>
                    </tr>
                  ))}
                  {/* TOTAL */}
                  <tr className="font-bold border-t-2 border-slate-600">
                    <td className="px-4 py-3">PORTFOLIO ({filteredSchools.length})</td>
                    <td className="text-right px-4 py-3 font-mono">{filteredSchools.reduce((s, x) => s + x.enrolled, 0)}</td>
                    <td className="text-right px-4 py-3 font-mono">{filteredSchools.reduce((s, x) => s + x.guidesActual, 0)}</td>
                    <td className="text-right px-4 py-3 font-mono text-slate-500">{filteredSchools.reduce((s, x) => s + x.guidesModel, 0)}</td>
                    <td className={`text-right px-4 py-3 font-mono ${varianceClass(filteredSchools.reduce((s, x) => s + x.variance, 0))}`}>
                      {varianceText(filteredSchools.reduce((s, x) => s + x.variance, 0))}
                    </td>
                    <td className="text-right px-4 py-3 font-mono">{fmt(filteredSchools.filter(x => x.annualCost > 0).reduce((s, x) => s + x.annualCost, 0))}</td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================
            INTERIM TAB
            ================================================================ */}
        {tab === 'interim' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KpiCard label="Guides Tracked" value={`${interimAssignments.length}`} sub="Across 7 home campuses" />
              <KpiCard label="Avg Deploy %" value={`${Math.round(interimAssignments.reduce((s, a) => s + a.pctDeployedElsewhere, 0) / interimAssignments.length)}%`} sub="Time spent away from home campus" />
              <KpiCard label="Home Campuses" value={`${Object.keys(interimByCampus).length}`} sub="Sending guides to other schools" />
              <KpiCard label="Top Receiver" value="NYC" sub="Support from 4 source campuses" accent="text-indigo-400" />
            </div>

            <div className="space-y-4">
              {Object.entries(interimByCampus).map(([campus, staff]) => (
                <div key={campus} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-700/30 transition-colors"
                    onClick={() => setExpandedCampus(expandedCampus === campus ? null : campus)}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{expandedCampus === campus ? '▼' : '▶'}</span>
                      <div>
                        <span className="font-semibold text-white">{campus}</span>
                        <span className="text-xs text-slate-500 ml-2">{staff.length} staff</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400">
                        Avg {Math.round(staff.reduce((s, a) => s + a.pctDeployedElsewhere, 0) / staff.length)}% deployed elsewhere
                      </span>
                    </div>
                  </div>
                  {expandedCampus === campus && (
                    <table className="w-full text-sm border-t border-slate-700/50">
                      <thead>
                        <tr className="text-xs text-slate-500 uppercase">
                          <th className="text-left px-5 py-2">Name</th>
                          <th className="text-left px-3 py-2">Role</th>
                          <th className="text-left px-3 py-2">Deployments</th>
                          <th className="text-right px-5 py-2">% Elsewhere</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staff.map(a => (
                          <tr key={a.guideName} className="border-t border-slate-700/20">
                            <td className="px-5 py-2 text-slate-200">{a.guideName}</td>
                            <td className="px-3 py-2 text-slate-400">{a.role}</td>
                            <td className="px-3 py-2">
                              <div className="flex flex-wrap gap-1">
                                {a.deployments.map(d => (
                                  <span key={d} className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{d}</span>
                                ))}
                              </div>
                            </td>
                            <td className="text-right px-5 py-2 font-mono">
                              <span className={a.pctDeployedElsewhere >= 80 ? 'text-amber-400' : a.pctDeployedElsewhere >= 50 ? 'text-blue-400' : 'text-slate-400'}>
                                {a.pctDeployedElsewhere}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>

            {/* Receiving schools summary */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Schools Receiving the Most Support</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { school: 'New York / Anywhere Center', level: 'High', sources: 'Charlotte, Houston, Orlando, Raleigh' },
                  { school: 'Miami', level: 'High', sources: 'Tampa, Raleigh (Greenham, Friend since S3)' },
                  { school: 'Austin', level: 'Medium', sources: 'Houston, Charlotte, Waypoint' },
                  { school: 'Scottsdale', level: 'Medium', sources: 'Tampa (Newton), Charlotte (Berry, Sheehy)' },
                ].map(r => (
                  <div key={r.school} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{r.school}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${r.level === 'High' ? 'bg-red-900/40 text-red-300' : 'bg-amber-900/40 text-amber-300'}`}>{r.level}</span>
                    </div>
                    <p className="text-xs text-slate-500">Sources: {r.sources}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-600">
        Data: Physical Schools HC - YE'25 · Schools Data Sheet · Staff Interim Assignments · Updated February 2026
      </div>
    </div>
  );
};

export default HeadcountDashboard;
