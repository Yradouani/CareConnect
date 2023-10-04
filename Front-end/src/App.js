import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
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
          <Route path='//profil' exact element={<Profile />} />
          <Route path='/rendez-vous' exact element={<Appointments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
