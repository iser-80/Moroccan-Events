import './App.css';
import Main from './pages/main/main';
import Login from './pages/login/login'
import Register from './pages/register/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistPage from './pages/artist/artist';
import EventPage from './pages/event/eventPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        // to modidy later
        <Route path='/event' element={<EventPage />} />
        <Route path='/artist' element={<ArtistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
