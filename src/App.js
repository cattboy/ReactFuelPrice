import React, { useState } from 'react';
import FuelTable from './FuelTable';

/* Simplified App component for testing purposes */
function App() {
  const [fuelData] = useState([
    { location: 'Location A', price: 1.23 },
    { location: 'Location B', price: 2.34 }
  ]);

  return (
    <div className="App">
      <h1>Fuel Prices - QLD</h1>
      <FuelTable data={fuelData} />
    </div>
  );
}

export default App; 