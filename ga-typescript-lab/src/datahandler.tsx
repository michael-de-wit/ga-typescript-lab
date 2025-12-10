import data from '../data/Running_2025-10-10T06_48_58.json';

// Define interface outside component (only once)
export interface Sample {
  TimeISO8601?: string;
  HR?: number;
  [key: string]: any;
}

export interface HRSample {
  HR: number;
  TimeISO8601?: string;
  [key: string]: any;
}

// Process data once, not on every render
const samples: Sample[] = data.DeviceLog.Samples;
export const samplesWithHR: HRSample[] = samples.filter(
  (item): item is HRSample => 'HR' in item && typeof item.HR === 'number'
);

export default samplesWithHR;