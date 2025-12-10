import { useState } from 'react';
import './App.css';
import samplesWithHR from './datahandler';
import type { HRSample } from './datahandler';

function App() {
  const [hrHistory, setHrHistory] = useState<HRSample[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  async function simulateRealTimeHR(delaySeconds: number) {
    setIsRunning(true);
    setHrHistory([]); // Clear previous data
    
    for (let i = 0; i < samplesWithHR.length; i++) {
      console.log(samplesWithHR[i]);
      // Add to state array
      setHrHistory(prev => [...prev, samplesWithHR[i]]);
      await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }
    
    setIsRunning(false);
  }
  
  return (
    <>
      <h1>Heart Rate Monitor</h1>
      <button onClick={() => simulateRealTimeHR(1)} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start'}
      </button>
      <p>Collected {hrHistory.length} of {samplesWithHR.length} samples</p>
      
      <h2>History (Last 10)</h2>
      <ul>
        {hrHistory.slice(-10).map((sample, index) => (
          <li key={index}>HR: {sample.HR.toFixed(2)}</li>
        ))}
      </ul>
    </>
  );
}

export default App;