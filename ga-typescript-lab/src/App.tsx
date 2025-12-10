import { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

import './App.css';
// Import the new data array name
import samplesWithHRbpm from './datahandler';
// Import the new interface name
import type { ProcessedHRSample } from './datahandler';

function App() {
  // rawHistory accumulates all data immediately in the background
  const rawHistoryRef = useRef<ProcessedHRSample[]>([]);
  
  // chartData is the state that is actually displayed and updated every 5 seconds
  const [chartData, setChartData] = useState<ProcessedHRSample[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [samplesProcessed, setSamplesProcessed] = useState(0);

  // Function to sync the accumulated data to the chart's state
  const syncChartData = () => {
    // Only display the last 200 samples
    setChartData([...rawHistoryRef.current].slice(-200));
  };

  async function simulateRealTimeHR(delaySeconds: number) {
    if (isRunning) return;

    setIsRunning(true);
    rawHistoryRef.current = []; // Clear previous data
    setChartData([]);
    setSamplesProcessed(0);

    // Set up the interval to update the chart display every 5000ms (5 seconds)
    const syncInterval = setInterval(syncChartData, 5000);

    // Use the new data array name
    for (let i = 0; i < samplesWithHRbpm.length; i++) {
      // console.log(samplesWithHRbpm[i]); // Keep this out of production code
      
      // Add data to the ref immediately (does not trigger re-render)
      rawHistoryRef.current.push(samplesWithHRbpm[i]);
      
      setSamplesProcessed(i + 1);
      
      // Keep the await for the "real-time" simulation speed
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }

    // After the loop finishes:
    clearInterval(syncInterval); // Stop the interval updater
    syncChartData(); // Final update to make sure all data is rendered
    setIsRunning(false);
  }

  return (
    <>
      <h1>Heart Rate Monitor (BPM)</h1>
      <button onClick={() => simulateRealTimeHR(1)} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start (1s delay per sample)'}
      </button>
      <p>
        Collected {rawHistoryRef.current.length} of {samplesWithHRbpm.length} samples. 
        {isRunning ? `Processing: ${samplesProcessed}` : 'Finished.'}
      </p>
      <p>Chart is displaying {chartData.length} points and updates every 5 seconds.</p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData} // Use the periodically updated state
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis domain={['dataMin - 10', 'dataMax + 10']} label={{ value: 'HR (BPM)', angle: -90, position: 'insideLeft' }} />
          
          <Legend />
          <Line type="linear" dataKey="HRbpm" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h2>History (Last 10)</h2>
      <ul>
        {/* Use the raw history ref for the instant list update */}
        {rawHistoryRef.current.slice(-10).map((sample, index) => (
          <li key={index}>HRbpm: {sample.HRbpm.toFixed(2)}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
