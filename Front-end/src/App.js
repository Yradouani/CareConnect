import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import Animals from './pages/Animals';
import { useState } from 'react';
import CustomersProfile from './pages/CustomersProfile';
import AnimalProfil from './pages/AnimalProfil';
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
          <Route path='/profil_client/id=:id' exact element={<CustomersProfile />} />
          <Route path='/profil_animal/id=:id' exact element={<AnimalProfil />} />
          <Route path='/animaux' exact element={<Animals />} />
          <Route path='/rendez-vous' exact element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
