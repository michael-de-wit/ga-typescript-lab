import data from '../data/Running_2025-10-10T06_48_58.json';

// Define the interface for the original raw data objects
export interface RawSample {
  TimeISO8601?: string;
  HR?: number; // This will become HRbps
  [key: string]: any;
}

// Define the interface for the final processed data objects
export interface ProcessedHRSample {
  HRbps: number; // Heart Rate in beats per second
  HRbpm: number; // Heart Rate in beats per minute
  TimeISO8601?: string;
  [key: string]: any;
}

// Process data once to rename and calculate new fields
const rawSamples: RawSample[] = data.DeviceLog.Samples;

export const samplesWithHRbpm: ProcessedHRSample[] = rawSamples
  .filter(
    (item): item is Required<RawSample> => 'HR' in item && typeof item.HR === 'number'
  )
  .map(item => {
    // Calculate HRbpm (HRbps * 60)
    const hrBps = item.HR;
    const hrBpm = hrBps * 60;

    // Create the new object structure
    return {
      HRbps: hrBps,
      HRbpm: hrBpm,
      TimeISO8601: item.TimeISO8601,
      ...item // Include other original properties if needed
    };
  });

export default samplesWithHRbpm;
