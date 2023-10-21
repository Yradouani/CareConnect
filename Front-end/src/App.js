import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Appointments from './pages/Appointments';
import Connection from './pages/Connection';
import Home from './pages/Home';
import TokenExpirationHandler from './components/TokenExpirationHandler';

function App() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className="App">
      <BrowserRouter>
        <TokenExpirationHandler issuedAt={user?.issued_at} />
        <Routes>
          <Route path='/' exact element={<Connection />} />
          <Route path='/accueil' exact element={<Home user={user} />} />
          <Route path='/profil' exact element={<Profile user={user} />} />
          <Route path='/rendez-vous' exact element={<Appointments user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
