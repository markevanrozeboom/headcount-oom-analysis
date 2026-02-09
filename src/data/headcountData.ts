/**
 * Headcount Out-of-Model Analysis Data
 *
 * Source: Physical Schools HC - YE'25 (Copy sheet), Staff Interim Assignments
 * Updated: February 2026
 *
 * DRIVER CATEGORIES:
 * 1. Training Hub — Austin campuses intentionally overstaffed for guide training
 * 2. Non-Standard Ratio — Schools running different student:guide ratios than model
 * 3. Pre-Launch — Schools with guides hired ahead of school opening
 * 4. Temporary — Health leave, maternity coverage, pipeline-based hires
 * 5. Timing — Guides hired proactively as enrollment approaches triggers
 * 6. Underhiring — Schools operating below model (offset)
 * 7. At Model — Schools staffed per model
 * 8. Staffing Gap — Schools with fewer guides than expected
 */

export type DriverCategory =
  | 'Training Hub'
  | 'Non-Standard Ratio'
  | 'Pre-Launch'
  | 'Temporary'
  | 'Timing'
  | 'Underhiring'
  | 'At Model'
  | 'Staffing Gap';

export type SchoolType = 'Alpha' | 'Alpha Microschool' | 'Non-Alpha' | 'Montessorium';

export type ModelStatus = 'over' | 'at' | 'under';

export interface School {
  name: string;
  enrolled: number;
  capacity: number;
  guidesActual: number;
  guidesModel: number;
  variance: number;
  annualCost: number; // estimated annual cost of excess (negative = savings)
  avgGuideSalary: number;
  studentGuideRatio: string;
  modelRatio: string;
  schoolType: SchoolType;
  driver: DriverCategory;
  status: ModelStatus;
  notes: string;
}

export interface InterimAssignment {
  guideName: string;
  role: string;
  homeCampus: string;
  deployments: string[];
  pctDeployedElsewhere: number;
}

// ============================================================================
// SCHOOL DATA
// ============================================================================

export const schools: School[] = [
  {
    name: 'Alpha School: Austin Spyglass',
    enrolled: 161, capacity: 212, guidesActual: 32, guidesModel: 15, variance: 17,
    annualCost: 2858000, avgGuideSalary: 168117,
    studentGuideRatio: '5:1', modelRatio: '11:1',
    schoolType: 'Alpha', driver: 'Training Hub', status: 'over',
    notes: 'Always overstaffed — training grounds for guides deployed network-wide',
  },
  {
    name: 'Alpha School: Miami',
    enrolled: 67, capacity: 184, guidesActual: 10, guidesModel: 6, variance: 4,
    annualCost: 939000, avgGuideSalary: 234738,
    studentGuideRatio: '7:1', modelRatio: '11:1',
    schoolType: 'Alpha', driver: 'Timing', status: 'over',
    notes: 'Hired proactively as enrollment approached trigger thresholds across 5 levels',
  },
  {
    name: 'Alpha High School: Austin',
    enrolled: 50, capacity: 206, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 678000, avgGuideSalary: 169425,
    studentGuideRatio: '6:1', modelRatio: '11:1',
    schoolType: 'Alpha', driver: 'Training Hub', status: 'over',
    notes: 'Austin training hub — guides trained here before deployment',
  },
  {
    name: 'Alpha School: Brownsville',
    enrolled: 40, capacity: 55, guidesActual: 9, guidesModel: 4, variance: 5,
    annualCost: 897000, avgGuideSalary: 179358,
    studentGuideRatio: '4:1', modelRatio: '25:1',
    schoolType: 'Alpha', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'Priced at $15K tuition (SpaceX collaboration) but staffed as Alpha with 1 guide per level',
  },
  {
    name: 'Texas Sports Academy',
    enrolled: 35, capacity: 1000, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 566000, avgGuideSalary: 141413,
    studentGuideRatio: '4:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'One guide per level after prior-year performance failure; flagship recovery investment',
  },
  {
    name: 'Alpha Scottsdale',
    enrolled: 32, capacity: 38, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 533000, avgGuideSalary: 133312,
    studentGuideRatio: '4:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Temporary', status: 'over',
    notes: 'Health leave coverage + temporary guide from Tampa + pipeline-based hiring',
  },
  {
    name: 'Alpha Anywhere Center',
    enrolled: 27, capacity: 123, guidesActual: 7, guidesModel: 4, variance: 3,
    annualCost: 450000, avgGuideSalary: 150042,
    studentGuideRatio: '4:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'Operating to 6:1 ratio — commitment made to New York families',
  },
  {
    name: 'Nova Austin',
    enrolled: 47, capacity: 252, guidesActual: 6, guidesModel: 4, variance: 2,
    annualCost: 297000, avgGuideSalary: 148500,
    studentGuideRatio: '8:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'Temporary', status: 'over',
    notes: 'Staffed for 70+ inherited students; one guide moved to Bastrop, one coaching out',
  },
  {
    name: 'Alpha Plano',
    enrolled: 7, capacity: 25, guidesActual: 4, guidesModel: 3, variance: 1,
    annualCost: 192000, avgGuideSalary: 192375,
    studentGuideRatio: '2:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Temporary', status: 'over',
    notes: 'Temp Lead Guide covering maternity leave through February',
  },
  {
    name: 'Alpha Charlotte',
    enrolled: 0, capacity: 40, guidesActual: 4, guidesModel: 3, variance: 1,
    annualCost: 143000, avgGuideSalary: 143100,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; 3 guides deployed to Austin, Scottsdale, NY, Miami, Dorado',
  },
  {
    name: 'Alpha Houston',
    enrolled: 0, capacity: 25, guidesActual: 4, guidesModel: 0, variance: 4,
    annualCost: 770000, avgGuideSalary: 192375,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guides deployed to Austin, Santa Barbara, NY, One Hope, Dorado',
  },
  {
    name: 'Waypoint Academy',
    enrolled: 0, capacity: 25, guidesActual: 2, guidesModel: 0, variance: 2,
    annualCost: 263000, avgGuideSalary: 131626,
    studentGuideRatio: '0:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guides 100% deployed to Austin L2 + MS workshops; 1 student enrolled Jan',
  },
  {
    name: 'Alpha Orlando',
    enrolled: 0, capacity: 25, guidesActual: 1, guidesModel: 0, variance: 1,
    annualCost: 162000, avgGuideSalary: 162001,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guide deployed to Spotswood NJ, NY, Dorado',
  },
  // --- AT MODEL ---
  {
    name: 'GT School: Georgetown',
    enrolled: 21, capacity: 180, guidesActual: 4, guidesModel: 4, variance: 0,
    annualCost: 0, avgGuideSalary: 141413,
    studentGuideRatio: '5:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'At model; one guide per level',
  },
  {
    name: 'Alpha Fort Worth',
    enrolled: 11, capacity: 18, guidesActual: 4, guidesModel: 4, variance: 0,
    annualCost: 0, avgGuideSalary: 138375,
    studentGuideRatio: '3:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'Now at model (was +1); enrollment grew 9→11',
  },
  {
    name: 'NextGen',
    enrolled: 10, capacity: 80, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 148500,
    studentGuideRatio: '3:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'At model',
  },
  {
    name: 'Alpha San Francisco',
    enrolled: 19, capacity: 68, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '6:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
  },
  {
    name: 'Alpha Bushy Creek',
    enrolled: 16, capacity: 25, guidesActual: 2, guidesModel: 2, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '8:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'New school; appears to be rebrand of Montessorium Brushy Creek',
  },
  {
    name: 'Alpha Lake Forest',
    enrolled: 12, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '4:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; enrollment grew 5→12',
  },
  {
    name: 'Alpha Palm Beach',
    enrolled: 7, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '2:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
  },
  {
    name: 'Alpha Chantilly',
    enrolled: 4, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '1:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
  },
  {
    name: 'Alpha Raleigh',
    enrolled: 0, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; 2 guides deployed to Miami through end of school year',
  },
  {
    name: 'Alpha Santa Barbara',
    enrolled: 12, capacity: 78, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 150000,
    studentGuideRatio: '4:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; ramping up',
  },
  // --- UNDER MODEL ---
  {
    name: 'Nova Bastrop',
    enrolled: 15, capacity: 18, guidesActual: 3, guidesModel: 4, variance: -1,
    annualCost: -162000, avgGuideSalary: 162009,
    studentGuideRatio: '5:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'Underhiring', status: 'under',
    notes: 'One position unfilled; quality risk if enrollment grows',
  },
  {
    name: 'Alpha Tampa',
    enrolled: 0, capacity: 25, guidesActual: 1, guidesModel: 3, variance: -2,
    annualCost: -270000, avgGuideSalary: 135000,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'under',
    notes: 'Pre-launch; both guides deployed to Miami, Scottsdale, Palm Beach, SF, BTX',
  },
  {
    name: 'Montessorium Brushy Creek',
    enrolled: 16, capacity: 25, guidesActual: 0, guidesModel: 2, variance: -2,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '13:1',
    schoolType: 'Montessorium', driver: 'Staffing Gap', status: 'under',
    notes: 'Guides appear to have moved to Alpha Bushy Creek',
  },
  // --- ZERO ACTIVITY ---
  {
    name: 'Alpha Denver',
    enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
  },
  {
    name: 'Alpha Maryland Bethesda',
    enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
  },
  {
    name: 'Alpha Folsom',
    enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
  },
  {
    name: 'Alpha Puerto Rico',
    enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
  },
  {
    name: 'Alpha Piedmont',
    enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '8:1',
    schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
  },
  {
    name: 'Alpha Brownsville Preschool',
    enrolled: 5, capacity: 20, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '25:1',
    schoolType: 'Alpha', driver: 'At Model', status: 'at',
    notes: 'New; split from Brownsville main; no dedicated staff',
  },
  {
    name: 'Sports Academy: Carrollton',
    enrolled: 0, capacity: 0, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0,
    studentGuideRatio: '0:1', modelRatio: '25:1',
    schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'No activity',
  },
];

// ============================================================================
// INTERIM ASSIGNMENTS
// ============================================================================

export const interimAssignments: InterimAssignment[] = [
  { guideName: 'Christina Romero', role: 'Lead Guide', homeCampus: 'Houston',
    deployments: ['Santa Barbara', 'Austin L2', 'Houston', 'Dorado'], pctDeployedElsewhere: 60 },
  { guideName: 'Phoebe Weaver', role: 'Reading Specialist', homeCampus: 'Houston',
    deployments: ['One Hope', 'NY', 'Future 2 project'], pctDeployedElsewhere: 80 },
  { guideName: 'Milli Patel', role: 'Guide', homeCampus: 'Houston',
    deployments: ['Training'], pctDeployedElsewhere: 0 },
  { guideName: 'David Beaton', role: 'Lead Guide', homeCampus: 'Tampa',
    deployments: ['Miami (interim Lead)', 'Palm Beach', 'BTX', 'Guide Training'], pctDeployedElsewhere: 90 },
  { guideName: 'Jackson Newton', role: 'Guide', homeCampus: 'Tampa',
    deployments: ['Scottsdale', 'SF'], pctDeployedElsewhere: 85 },
  { guideName: 'Eric Salgado', role: 'Lead Guide', homeCampus: 'Orlando',
    deployments: ['Orlando', 'Spotswood NJ', 'Dorado'], pctDeployedElsewhere: 70 },
  { guideName: 'Samantha Gaboian', role: 'Guide', homeCampus: 'Orlando',
    deployments: ['NY', 'Remote RS'], pctDeployedElsewhere: 90 },
  { guideName: 'Timothy Berry', role: 'Lead Guide', homeCampus: 'Charlotte',
    deployments: ['Austin', 'Lake Forest', 'Scottsdale', 'CLT', 'Dorado'], pctDeployedElsewhere: 75 },
  { guideName: 'Timothy Sheehy', role: 'Guide', homeCampus: 'Charlotte',
    deployments: ['Austin', 'Scottsdale', 'CLT/Chantilly', 'NY', 'Miami', 'Dorado'], pctDeployedElsewhere: 90 },
  { guideName: 'Joanna Sanner', role: 'Guide', homeCampus: 'Charlotte',
    deployments: ['CLT', 'ATX', 'SF', 'SB', 'Dorado'], pctDeployedElsewhere: 70 },
  { guideName: 'Courtney Fenner', role: 'Lead Guide', homeCampus: 'Raleigh',
    deployments: ['Chantilly', 'Miami', 'Raleigh info sessions'], pctDeployedElsewhere: 55 },
  { guideName: 'Jennifer Greenham', role: 'Guide', homeCampus: 'Raleigh',
    deployments: ['In training', 'Miami'], pctDeployedElsewhere: 50 },
  { guideName: 'Tamara Friend', role: 'Guide', homeCampus: 'Raleigh',
    deployments: ['In training', 'Miami'], pctDeployedElsewhere: 50 },
  { guideName: 'Erica Kinney', role: 'Reading Specialist', homeCampus: 'Raleigh',
    deployments: ['Training'], pctDeployedElsewhere: 0 },
  { guideName: 'Bryan Gordon', role: 'Lead Guide', homeCampus: 'Waypoint Academy',
    deployments: ['Alpha Austin L2 + MS workshop'], pctDeployedElsewhere: 100 },
  { guideName: 'Patrick Kern', role: 'Guide', homeCampus: 'Waypoint Academy',
    deployments: ['Alpha Austin L2 + MS workshop'], pctDeployedElsewhere: 100 },
  { guideName: 'Christina Morris', role: 'Guide', homeCampus: 'Waypoint Academy',
    deployments: ['Training'], pctDeployedElsewhere: 0 },
  { guideName: 'Jennifer Walrod', role: 'Lead Guide', homeCampus: '2HL',
    deployments: ['SF', 'L3 camping'], pctDeployedElsewhere: 100 },
  { guideName: 'Katie Boye', role: 'Lead Guide', homeCampus: '2HL',
    deployments: ['Living Water', 'L2 snowboarding'], pctDeployedElsewhere: 100 },
];

// ============================================================================
// DRIVER CATEGORY SUMMARIES
// ============================================================================

export interface DriverSummary {
  driver: DriverCategory;
  schools: number;
  excessGuides: number;
  annualCost: number;
  pctOfTotal: number;
  nature: string;
  color: string;
}

export function getDriverSummaries(): DriverSummary[] {
  const totalCost = schools.filter(s => s.variance > 0).reduce((sum, s) => sum + s.annualCost, 0);

  const groups: Record<string, { schools: Set<string>; excess: number; cost: number; nature: string; color: string }> = {
    'Training Hub': { schools: new Set(), excess: 0, cost: 0, nature: 'Intentional — needs formal approval', color: '#f59e0b' },
    'Non-Standard Ratio': { schools: new Set(), excess: 0, cost: 0, nature: 'Intentional — needs model update', color: '#8b5cf6' },
    'Pre-Launch': { schools: new Set(), excess: 0, cost: 0, nature: 'Cost real; labor deployed elsewhere', color: '#3b82f6' },
    'Temporary': { schools: new Set(), excess: 0, cost: 0, nature: 'Should self-resolve; track it', color: '#06b6d4' },
    'Timing': { schools: new Set(), excess: 0, cost: 0, nature: 'Will normalize with enrollment', color: '#10b981' },
    'Underhiring': { schools: new Set(), excess: 0, cost: 0, nature: 'Quality risk', color: '#6b7280' },
  };

  for (const s of schools) {
    if (s.driver in groups && s.variance !== 0) {
      groups[s.driver].schools.add(s.name);
      groups[s.driver].excess += s.variance;
      groups[s.driver].cost += s.annualCost;
    }
  }

  return Object.entries(groups)
    .filter(([, g]) => g.schools.size > 0)
    .map(([driver, g]) => ({
      driver: driver as DriverCategory,
      schools: g.schools.size,
      excessGuides: g.excess,
      annualCost: g.cost,
      pctOfTotal: totalCost > 0 ? (g.cost / totalCost) * 100 : 0,
      nature: g.nature,
      color: g.color,
    }))
    .sort((a, b) => b.annualCost - a.annualCost);
}

// ============================================================================
// PORTFOLIO METRICS
// ============================================================================

export function getPortfolioMetrics() {
  const active = schools.filter(s => s.guidesActual > 0 || s.enrolled > 0);
  const totalEnrolled = schools.reduce((s, x) => s + x.enrolled, 0);
  const totalCapacity = schools.reduce((s, x) => s + x.capacity, 0);
  const totalGuides = schools.reduce((s, x) => s + x.guidesActual, 0);
  const totalModel = schools.reduce((s, x) => s + x.guidesModel, 0);
  const totalVariance = schools.reduce((s, x) => s + x.variance, 0);
  const overModelCost = schools.filter(s => s.variance > 0).reduce((s, x) => s + x.annualCost, 0);
  const overModelSchools = schools.filter(s => s.variance > 0).length;
  const atModelSchools = schools.filter(s => s.variance === 0).length;
  const underModelSchools = schools.filter(s => s.variance < 0).length;

  return {
    totalSchools: schools.length,
    activeSchools: active.length,
    totalEnrolled,
    totalCapacity,
    capacityUtilization: totalCapacity > 0 ? (totalEnrolled / totalCapacity) * 100 : 0,
    totalGuides,
    totalModel,
    totalVariance,
    studentGuideRatio: totalGuides > 0 ? totalEnrolled / totalGuides : 0,
    overModelCost,
    overModelSchools,
    atModelSchools,
    underModelSchools,
  };
}
