import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import { useState } from 'react';
import Appointments from './pages/Appointments';
import Connection from './pages/Connection';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Connection />} />
          <Route path='/accueil' exact element={<Home />} />
          <Route path='/clients' exact element={<Customers />} />
          <Route path='/rendez-vous' exact element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
