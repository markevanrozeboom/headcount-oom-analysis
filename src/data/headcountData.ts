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

export type TuitionTier = '$40K' | '$50K+' | 'Sub-$40K';

export interface School {
  name: string;
  enrolled: number;
  confirmedEnrollments: number; // from enrollment dashboard (may differ from SIS)
  capacity: number;
  guidesActual: number;
  guidesModel: number;
  variance: number;
  annualCost: number;
  avgGuideSalary: number;
  totalGuideCost: number;
  tuition: number;
  tuitionTier: TuitionTier;
  studentGuideRatio: string;
  modelRatio: string;
  schoolType: SchoolType;
  pricingModel: string; // from 2HL approved models (e.g. "$40K Alpha Microschool")
  driver: DriverCategory;
  status: ModelStatus;
  notes: string;
  // Schools Data Sheet fields
  state: string;
  city: string;
  gradeLevels: string;
  headOfSchool: string;
  openingDate: string; // e.g. "Aug 2025", "Jan 2026", "Pre-launch"
  locationType: string; // e.g. "Leased from 3rd party", "Owned by LOE"
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
  // --- OVER MODEL ---
  { name: 'Alpha School: Austin Spyglass', enrolled: 161, capacity: 212, guidesActual: 32, guidesModel: 15, variance: 17,
    annualCost: 2858000, avgGuideSalary: 168117, totalGuideCost: 5379758, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '5:1', modelRatio: '11:1', schoolType: 'Alpha', driver: 'Training Hub', status: 'over',
    notes: 'Always overstaffed — training grounds for guides deployed network-wide',
    confirmedEnrollments: 212, pricingModel: '$40K Alpha', state: 'Texas', city: 'Austin', gradeLevels: 'PK-8', headOfSchool: 'Heather McMahan', openingDate: 'Aug 2025', locationType: 'Leased from 5Y' },
  { name: 'Alpha School: Miami', enrolled: 67, capacity: 184, guidesActual: 10, guidesModel: 6, variance: 4,
    annualCost: 939000, avgGuideSalary: 234738, totalGuideCost: 2347375, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '7:1', modelRatio: '11:1', schoolType: 'Alpha', driver: 'Timing', status: 'over',
    notes: 'Hired proactively as enrollment approached trigger thresholds across 5 levels',
    confirmedEnrollments: 69, pricingModel: '$50K Alpha', state: 'Florida', city: 'Miami', gradeLevels: 'K-10', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha High School: Austin', enrolled: 50, capacity: 206, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 678000, avgGuideSalary: 169425, totalGuideCost: 1355400, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '6:1', modelRatio: '11:1', schoolType: 'Alpha', driver: 'Training Hub', status: 'over',
    notes: 'Austin training hub — guides trained here before deployment',
    confirmedEnrollments: 61, pricingModel: '$40K Alpha', state: 'Texas', city: 'Austin', gradeLevels: '9-12', headOfSchool: 'Chris Locke', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha School: Brownsville', enrolled: 40, capacity: 55, guidesActual: 9, guidesModel: 4, variance: 5,
    annualCost: 897000, avgGuideSalary: 179358, totalGuideCost: 1614223, tuition: 10000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '4:1', modelRatio: '25:1', schoolType: 'Alpha', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'Priced at $15K tuition (SpaceX) but staffed as Alpha with 1 guide per level',
    confirmedEnrollments: 42, pricingModel: '$15K Low Dollar', state: 'Texas', city: 'Brownsville', gradeLevels: 'PK-8', headOfSchool: 'Paige Fults', openingDate: 'Aug 2025', locationType: 'Owned by LOE' },
  { name: 'Texas Sports Academy', enrolled: 35, capacity: 1000, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 566000, avgGuideSalary: 141413, totalGuideCost: 1131300, tuition: 25000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '4:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'One guide per level after prior-year performance failure',
    confirmedEnrollments: 36, pricingModel: '$25K GT', state: 'Texas', city: 'Austin', gradeLevels: 'K-8', headOfSchool: 'Heather McMahan', openingDate: 'Aug 2025', locationType: 'Leased from 5Y' },
  { name: 'Alpha Scottsdale', enrolled: 32, capacity: 38, guidesActual: 8, guidesModel: 4, variance: 4,
    annualCost: 533000, avgGuideSalary: 133312, totalGuideCost: 1066500, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '4:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Temporary', status: 'over',
    notes: 'Health leave coverage + temporary guide from Tampa + pipeline-based hiring',
    confirmedEnrollments: 33, pricingModel: '$40K Microschool', state: 'Arizona', city: 'Scottsdale', gradeLevels: 'K-8', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Anywhere Center', enrolled: 27, capacity: 123, guidesActual: 7, guidesModel: 4, variance: 3,
    annualCost: 450000, avgGuideSalary: 150042, totalGuideCost: 1050295, tuition: 65000, tuitionTier: '$50K+',
    studentGuideRatio: '4:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Non-Standard Ratio', status: 'over',
    notes: 'Operating to 6:1 ratio — commitment made to New York families',
    confirmedEnrollments: 35, pricingModel: '$65K Microschool', state: 'New York', city: 'New York', gradeLevels: 'K-8', headOfSchool: 'Tasha Arnold', openingDate: 'Sep 2025', locationType: 'Leased from 3rd party' },
  { name: 'Nova Austin', enrolled: 47, capacity: 252, guidesActual: 6, guidesModel: 4, variance: 2,
    annualCost: 297000, avgGuideSalary: 148500, totalGuideCost: 891000, tuition: 15000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '8:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'Temporary', status: 'over',
    notes: 'Staffed for 70+ inherited students; one guide moved to Bastrop, one coaching out',
    confirmedEnrollments: 22, pricingModel: '$15K Low Dollar', state: 'Texas', city: 'Austin', gradeLevels: 'K-8', headOfSchool: 'Paige Fults', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Plano', enrolled: 7, capacity: 25, guidesActual: 4, guidesModel: 3, variance: 1,
    annualCost: 192000, avgGuideSalary: 192375, totalGuideCost: 769501, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '2:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Temporary', status: 'over',
    notes: 'Temp Lead Guide covering maternity leave through February',
    confirmedEnrollments: 10, pricingModel: '$50K Microschool', state: 'Texas', city: 'Plano', gradeLevels: 'K-5', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Charlotte', enrolled: 0, capacity: 40, guidesActual: 4, guidesModel: 3, variance: 1,
    annualCost: 143000, avgGuideSalary: 143100, totalGuideCost: 572401, tuition: 45000, tuitionTier: '$50K+',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guides deployed to Austin, Scottsdale, NY, Miami, Dorado',
    confirmedEnrollments: 0, pricingModel: '$45K Microschool', state: 'North Carolina', city: 'Charlotte', gradeLevels: 'K-5', headOfSchool: '', openingDate: 'Pre-launch', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Houston', enrolled: 0, capacity: 25, guidesActual: 4, guidesModel: 0, variance: 4,
    annualCost: 770000, avgGuideSalary: 192375, totalGuideCost: 769501, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guides deployed to Austin, Santa Barbara, NY, One Hope, Dorado',
    confirmedEnrollments: 0, pricingModel: '$40K Microschool', state: 'Texas', city: 'The Woodlands', gradeLevels: 'K-8', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Waypoint Academy', enrolled: 0, capacity: 25, guidesActual: 2, guidesModel: 0, variance: 2,
    annualCost: 263000, avgGuideSalary: 131626, totalGuideCost: 263251, tuition: 30000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '0:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guides 100% deployed to Austin L2 + MS workshops',
    confirmedEnrollments: 1, pricingModel: '$30K Outdoor', state: 'Texas', city: 'Dripping Springs', gradeLevels: 'K-8', headOfSchool: 'Heather McMahan', openingDate: 'Jan 2026', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Orlando', enrolled: 0, capacity: 25, guidesActual: 1, guidesModel: 0, variance: 1,
    annualCost: 162000, avgGuideSalary: 162001, totalGuideCost: 162001, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'over',
    notes: 'Pre-launch; guide deployed to Spotswood NJ, NY, Dorado',
    confirmedEnrollments: 0, pricingModel: '$50K Microschool', state: 'Florida', city: 'Orlando', gradeLevels: '', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  // --- AT MODEL ---
  { name: 'GT School: Georgetown', enrolled: 21, capacity: 180, guidesActual: 4, guidesModel: 4, variance: 0,
    annualCost: 0, avgGuideSalary: 135000, totalGuideCost: 540000, tuition: 25000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '5:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'At model; one guide per level',
    confirmedEnrollments: 21, pricingModel: '$25K GT', state: 'Texas', city: 'Georgetown', gradeLevels: 'K-8', headOfSchool: 'Heather McMahan', openingDate: 'Aug 2025', locationType: 'Leased from 5Y' },
  { name: 'Alpha Fort Worth', enrolled: 11, capacity: 18, guidesActual: 4, guidesModel: 4, variance: 0,
    annualCost: 0, avgGuideSalary: 138375, totalGuideCost: 553500, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '3:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model (was +1); guide cost = 126% of revenue at current enrollment',
    confirmedEnrollments: 11, pricingModel: '$40K Microschool', state: 'Texas', city: 'Fort Worth', gradeLevels: 'K-8', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'NextGen', enrolled: 10, capacity: 80, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 157500, totalGuideCost: 472500, tuition: 25000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '3:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'At model',
    confirmedEnrollments: 15, pricingModel: '$25K eSports', state: 'Texas', city: 'Austin', gradeLevels: '5-8', headOfSchool: 'Heather McMahan', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha San Francisco', enrolled: 19, capacity: 68, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 202509, totalGuideCost: 607527, tuition: 75000, tuitionTier: '$50K+',
    studentGuideRatio: '6:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
    confirmedEnrollments: 19, pricingModel: '$75K Microschool', state: 'California', city: 'San Francisco', gradeLevels: 'K-8', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Bushy Creek', enrolled: 16, capacity: 25, guidesActual: 2, guidesModel: 2, variance: 0,
    annualCost: 0, avgGuideSalary: 150000, totalGuideCost: 0, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '8:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'Rebrand of Montessorium Brushy Creek',
    confirmedEnrollments: 18, pricingModel: '$25K Montessorium', state: 'Texas', city: 'Cedar Park', gradeLevels: 'K-6', headOfSchool: 'Dr. Laura Mazer', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Lake Forest', enrolled: 12, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 154801, totalGuideCost: 464402, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '4:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; enrollment grew 5→12',
    confirmedEnrollments: 15, pricingModel: '$50K Microschool', state: 'California', city: 'Lake Forest', gradeLevels: 'K-5', headOfSchool: 'Tasha Arnold', openingDate: 'Sep 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Palm Beach', enrolled: 7, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 97065, totalGuideCost: 291195, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '2:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
    confirmedEnrollments: 7, pricingModel: '$50K Microschool', state: 'Florida', city: 'Palm Beach', gradeLevels: 'K-5', headOfSchool: 'Tasha Arnold', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Chantilly', enrolled: 4, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 159300, totalGuideCost: 477900, tuition: 65000, tuitionTier: '$50K+',
    studentGuideRatio: '1:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model',
    confirmedEnrollments: 5, pricingModel: '$65K Microschool', state: 'Virginia', city: 'Chantilly', gradeLevels: 'K-6', headOfSchool: '', openingDate: 'Oct 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Raleigh', enrolled: 0, capacity: 25, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 161996, totalGuideCost: 485989, tuition: 45000, tuitionTier: '$50K+',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; 2 guides deployed to Miami',
    confirmedEnrollments: 0, pricingModel: '$45K Microschool', state: 'North Carolina', city: 'Raleigh', gradeLevels: 'K-5', headOfSchool: '', openingDate: 'Jan 2026', locationType: '' },
  { name: 'Alpha Santa Barbara', enrolled: 12, capacity: 78, guidesActual: 3, guidesModel: 3, variance: 0,
    annualCost: 0, avgGuideSalary: 231993, totalGuideCost: 695978, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '4:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'At Model', status: 'at',
    notes: 'At model; ramping up',
    confirmedEnrollments: 13, pricingModel: '$50K Microschool', state: 'California', city: 'Santa Barbara', gradeLevels: 'K-9', headOfSchool: 'Tasha Arnold', openingDate: 'Sep 2025', locationType: 'Leased from 3rd party' },
  // --- UNDER MODEL ---
  { name: 'Nova Bastrop', enrolled: 15, capacity: 18, guidesActual: 3, guidesModel: 4, variance: -1,
    annualCost: -162000, avgGuideSalary: 162009, totalGuideCost: 486027, tuition: 15000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '5:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'Underhiring', status: 'under',
    notes: 'One position unfilled; quality risk if enrollment grows',
    confirmedEnrollments: 0, pricingModel: '$15K Low Dollar', state: 'Texas', city: 'Bastrop', gradeLevels: 'K-8', headOfSchool: 'Paige Fults', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  { name: 'Alpha Tampa', enrolled: 0, capacity: 25, guidesActual: 1, guidesModel: 3, variance: -2,
    annualCost: -270000, avgGuideSalary: 135000, totalGuideCost: 135000, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'under',
    notes: 'Pre-launch; guide deployed to Miami, Scottsdale, Palm Beach, SF, BTX',
    confirmedEnrollments: 1, pricingModel: '$40K Microschool', state: 'Florida', city: 'Tampa', gradeLevels: 'K-9', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Montessorium Brushy Creek', enrolled: 16, capacity: 25, guidesActual: 0, guidesModel: 2, variance: -2,
    annualCost: 0, avgGuideSalary: 202500, totalGuideCost: 405000, tuition: 25000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '0:1', modelRatio: '13:1', schoolType: 'Montessorium', driver: 'Staffing Gap', status: 'under',
    notes: 'Guides appear to have moved to Alpha Bushy Creek',
    confirmedEnrollments: 18, pricingModel: '$25K Montessorium', state: 'Texas', city: 'Cedar Park', gradeLevels: 'K-6', headOfSchool: 'Dr. Laura Mazer', openingDate: 'Aug 2025', locationType: 'Leased from 3rd party' },
  // --- ZERO ACTIVITY ---
  { name: 'Alpha Denver', enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
    confirmedEnrollments: 0, pricingModel: '$50K Microschool', state: 'Colorado', city: 'Denver', gradeLevels: '', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Alpha Maryland Bethesda', enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 50000, tuitionTier: '$50K+',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
    confirmedEnrollments: 0, pricingModel: '$50K Microschool', state: 'Maryland', city: 'Bethesda', gradeLevels: 'K-8', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Alpha Folsom', enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
    confirmedEnrollments: 0, pricingModel: '$50K Microschool', state: 'California', city: 'Folsom', gradeLevels: '', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Alpha Puerto Rico', enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
    confirmedEnrollments: 0, pricingModel: '$50K Microschool', state: 'Puerto Rico', city: 'Dorado', gradeLevels: 'K-8', headOfSchool: '', openingDate: 'Nov 2026', locationType: '' },
  { name: 'Alpha Piedmont', enrolled: 0, capacity: 25, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 40000, tuitionTier: '$40K',
    studentGuideRatio: '0:1', modelRatio: '8:1', schoolType: 'Alpha Microschool', driver: 'Pre-Launch', status: 'at',
    notes: 'Pre-launch; no staff assigned',
    confirmedEnrollments: 0, pricingModel: '$65K Microschool', state: 'California', city: 'Piedmont', gradeLevels: '', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
  { name: 'Alpha Brownsville Preschool', enrolled: 5, capacity: 20, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 10000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '0:1', modelRatio: '25:1', schoolType: 'Alpha', driver: 'At Model', status: 'at',
    notes: 'New; split from Brownsville main; no dedicated staff',
    confirmedEnrollments: 0, pricingModel: '$15K Low Dollar', state: 'Texas', city: 'Brownsville', gradeLevels: 'PK', headOfSchool: 'Paige Fults', openingDate: 'Aug 2025', locationType: 'Owned by LOE' },
  { name: 'Sports Academy: Carrollton', enrolled: 0, capacity: 0, guidesActual: 0, guidesModel: 0, variance: 0,
    annualCost: 0, avgGuideSalary: 0, totalGuideCost: 0, tuition: 25000, tuitionTier: 'Sub-$40K',
    studentGuideRatio: '0:1', modelRatio: '25:1', schoolType: 'Non-Alpha', driver: 'At Model', status: 'at',
    notes: 'No activity',
    confirmedEnrollments: 0, pricingModel: '$25K GT', state: 'Texas', city: 'Carrollton', gradeLevels: '', headOfSchool: '', openingDate: 'Pre-launch', locationType: '' },
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
// TUITION TIER ANALYSIS
// ============================================================================

export interface TuitionTierSummary {
  tier: TuitionTier;
  schools: number;
  enrolled: number;
  guides: number;
  modelGuides: number;
  ratio: number;
  avgSalary: number;
  totalGuideCost: number;
  revenue: number;
  guideCostPerStudent: number;
  guidePctRevenue: number;
  modelCost: number;
  excessCost: number;
  color: string;
}

export function getTuitionTierSummaries(): TuitionTierSummary[] {
  const tiers: TuitionTier[] = ['$40K', '$50K+', 'Sub-$40K'];
  const colors: Record<TuitionTier, string> = { '$40K': '#f59e0b', '$50K+': '#8b5cf6', 'Sub-$40K': '#06b6d4' };

  return tiers.map(tier => {
    const active = schools.filter(s => s.tuitionTier === tier && (s.guidesActual > 0 || s.enrolled > 0));
    const enrolled = active.reduce((s, x) => s + x.enrolled, 0);
    const guides = active.reduce((s, x) => s + x.guidesActual, 0);
    const modelGuides = active.reduce((s, x) => s + x.guidesModel, 0);
    const totalGuideCost = active.reduce((s, x) => s + x.totalGuideCost, 0);
    const revenue = active.reduce((s, x) => s + (x.enrolled * x.tuition), 0);
    const modelCost = active.reduce((s, x) => s + (x.guidesModel * x.avgGuideSalary), 0);

    return {
      tier,
      schools: active.length,
      enrolled,
      guides,
      modelGuides,
      ratio: guides > 0 ? enrolled / guides : 0,
      avgSalary: guides > 0 ? totalGuideCost / guides : 0,
      totalGuideCost,
      revenue,
      guideCostPerStudent: enrolled > 0 ? totalGuideCost / enrolled : 0,
      guidePctRevenue: revenue > 0 ? (totalGuideCost / revenue) * 100 : 0,
      modelCost,
      excessCost: totalGuideCost - modelCost,
      color: colors[tier],
    };
  }).filter(t => t.schools > 0);
}

// ============================================================================
// SALARY VS MODEL ANALYSIS
// ============================================================================

export interface SalaryFlag {
  school: string;
  pricingModel: string;
  name: string;
  role: string;
  actual: number;
  benchmark: number;
  delta: number;
  flag: 'over' | 'under' | 'ok' | 'no-benchmark';
}

export const salaryFlags: SalaryFlag[] = [
  // HS Austin
  { school: 'Alpha High School: Austin', pricingModel: '$40K Alpha', name: 'Chris Locke', role: 'Head of School', actual: 399984, benchmark: 200000, delta: 199984, flag: 'over' },
  { school: 'Alpha High School: Austin', pricingModel: '$40K Alpha', name: 'Cameron Sorsby', role: 'Guide', actual: 199992, benchmark: 100000, delta: 99992, flag: 'over' },
  { school: 'Alpha High School: Austin', pricingModel: '$40K Alpha', name: 'Garrett Livingston Rigby', role: 'Guide - other', actual: 150000, benchmark: 100000, delta: 50000, flag: 'over' },
  // Austin Spyglass
  { school: 'Alpha School: Austin Spyglass', pricingModel: '$40K Alpha', name: 'Shannon Peifer', role: 'Campus Coordinator', actual: 150000, benchmark: 60000, delta: 90000, flag: 'over' },
  { school: 'Alpha School: Austin Spyglass', pricingModel: '$40K Alpha', name: 'Julie Parrish', role: 'Guide', actual: 150000, benchmark: 100000, delta: 50000, flag: 'over' },
  { school: 'Alpha School: Austin Spyglass', pricingModel: '$40K Alpha', name: 'Alex Cruz', role: 'Guide', actual: 135000, benchmark: 100000, delta: 35000, flag: 'over' },
  { school: 'Alpha School: Austin Spyglass', pricingModel: '$40K Alpha', name: 'Spencer Opatrny', role: 'Guide Asst.', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Alpha School: Austin Spyglass', pricingModel: '$40K Alpha', name: 'Mia Schaubhut', role: 'Guide Asst.', actual: 81000, benchmark: 75000, delta: 6000, flag: 'over' },
  // Brownsville — systemic: Alpha comp at Low-Dollar pricing
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Giana Hesterberg', role: 'Guide', actual: 104000, benchmark: 75000, delta: 29000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Kathrine Ledesma', role: 'Campus Coord', actual: 100000, benchmark: 60000, delta: 40000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Desire Park', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Samantha Hilton', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Tyisha Brooks', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Zijin Zhang', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Patricia Ana Kelley', role: 'Guide Asst.', actual: 60000, benchmark: 40000, delta: 20000, flag: 'over' },
  { school: 'Alpha School: Brownsville', pricingModel: '$15K Low Dollar', name: 'Neftali Tavares', role: 'Guide Asst.', actual: 52000, benchmark: 40000, delta: 12000, flag: 'over' },
  // Nova Austin — same pattern
  { school: 'Nova Austin', pricingModel: '$15K Low Dollar', name: 'Gwen Hurst', role: 'Guide Asst.', actual: 104000, benchmark: 40000, delta: 64000, flag: 'over' },
  { school: 'Nova Austin', pricingModel: '$15K Low Dollar', name: 'Christopher Todd White', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Nova Austin', pricingModel: '$15K Low Dollar', name: 'Cole Ransdell', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Nova Austin', pricingModel: '$15K Low Dollar', name: 'Mackenzie Hannah Shiau', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Nova Austin', pricingModel: '$15K Low Dollar', name: 'Robert Jesus Eakin', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  // Charlotte
  { school: 'Alpha Charlotte', pricingModel: '$40K Microschool', name: 'Timothy Andrew Berry', role: 'Lead Guide', actual: 200000, benchmark: 150000, delta: 50000, flag: 'over' },
  { school: 'Alpha Charlotte', pricingModel: '$40K Microschool', name: 'Jenna Christine Klemm', role: 'Guide', actual: 120000, benchmark: 100000, delta: 20000, flag: 'over' },
  { school: 'Alpha Charlotte', pricingModel: '$40K Microschool', name: 'Timothy Patrick Sheehy', role: 'Guide', actual: 120000, benchmark: 100000, delta: 20000, flag: 'over' },
  { school: 'Alpha Charlotte', pricingModel: '$40K Microschool', name: 'Jenna Elizabeth York', role: 'Campus Coord', actual: 75000, benchmark: 60000, delta: 15000, flag: 'over' },
  // Raleigh
  { school: 'Alpha Raleigh', pricingModel: '$40K Microschool', name: 'Courtney Elisabeth Fenner', role: 'Lead Guide', actual: 200000, benchmark: 150000, delta: 50000, flag: 'over' },
  { school: 'Alpha Raleigh', pricingModel: '$40K Microschool', name: 'Tamara Yvonne Stephenson', role: 'Guide', actual: 120000, benchmark: 100000, delta: 20000, flag: 'over' },
  { school: 'Alpha Raleigh', pricingModel: '$40K Microschool', name: 'Jennifer Renee Greenham', role: 'Guide', actual: 120000, benchmark: 100000, delta: 20000, flag: 'over' },
  // Scottsdale
  { school: 'Alpha Scottsdale', pricingModel: '$40K Microschool', name: 'Morgan Routh', role: 'Guide', actual: 135000, benchmark: 100000, delta: 35000, flag: 'over' },
  { school: 'Alpha Scottsdale', pricingModel: '$40K Microschool', name: 'Patricio Hernandez', role: 'Guide', actual: 135000, benchmark: 100000, delta: 35000, flag: 'over' },
  // Nova Bastrop
  { school: 'Nova Bastrop', pricingModel: '$15K Low Dollar', name: 'Ashley Storms', role: 'Lead Guide', actual: 155720, benchmark: 150000, delta: 5720, flag: 'over' },
  { school: 'Nova Bastrop', pricingModel: '$15K Low Dollar', name: 'Stephanie Gasch', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  { school: 'Nova Bastrop', pricingModel: '$15K Low Dollar', name: 'Jessica Allyson Criss', role: 'Guide', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  // Miami
  { school: 'Alpha School: Miami', pricingModel: '$50K Alpha', name: 'Maria Elena Mejia', role: 'Campus Coord', actual: 100000, benchmark: 75000, delta: 25000, flag: 'over' },
  // Houston
  { school: 'Alpha Houston', pricingModel: '$40K Microschool', name: 'Milli J Patel', role: 'Guide', actual: 120000, benchmark: 100000, delta: 20000, flag: 'over' },
  // NextGen
  { school: 'NextGen', pricingModel: '$25K GT', name: 'Christopher Sean Ahrens', role: 'Campus Coord', actual: 100000, benchmark: 60000, delta: 40000, flag: 'over' },
];

export function getSalarySummaryBySchool() {
  const map: Record<string, { school: string; model: string; count: number; totalDelta: number; flags: SalaryFlag[] }> = {};
  for (const f of salaryFlags) {
    if (!map[f.school]) map[f.school] = { school: f.school, model: f.pricingModel, count: 0, totalDelta: 0, flags: [] };
    map[f.school].count++;
    map[f.school].totalDelta += f.delta;
    map[f.school].flags.push(f);
  }
  return Object.values(map).sort((a, b) => b.totalDelta - a.totalDelta);
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
