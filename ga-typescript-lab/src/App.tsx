import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './App.css';
// Import the new data array name
import samplesWithHRbpm from './datahandler';
// Import the new interface name
import type { ProcessedHRSample } from './datahandler';

function App() {
  // Update state to use the new interface type
  const [hrHistory, setHrHistory] = useState<ProcessedHRSample[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  async function simulateRealTimeHR(delaySeconds: number) {
    setIsRunning(true);
    setHrHistory([]); // Clear previous data

    // Use the new data array name
    for (let i = 0; i < samplesWithHRbpm.length; i++) {
      console.log(samplesWithHRbpm[i]);
      // Add to state array
      setHrHistory(prev => [...prev, samplesWithHRbpm[i]]);
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }

    setIsRunning(false);
  }

  return (
    <>
      <h1>Heart Rate Monitor (BPM)</h1>
      <button onClick={() => simulateRealTimeHR(1)} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start'}
      </button>
      <p>Collected {hrHistory.length} of {samplesWithHRbpm.length} samples</p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={hrHistory}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          {/* Update YAxis label and dataKey to use 'HRbpm' */}
          <YAxis domain={['dataMin - 10', 'dataMax + 10']} label={{ value: 'HR (BPM)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {/* Update dataKey to 'HRbpm' */}
          <Line type="monotone" dataKey="HRbpm" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h2>History (Last 10)</h2>
      <ul>
        {/* Update display key to 'HRbpm' */}
        {hrHistory.slice(-10).map((sample, index) => (
          <li key={index}>HRbpm: {sample.HRbpm.toFixed(2)}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
