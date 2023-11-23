import styles from './App.module.css'
import Main from './pages/main/main';
import Login from './pages/login/login'
import Register from './pages/register/register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistPage from './pages/artist/artist';
import EventPage from './pages/event/eventPage'
import CreateEvent from './pages/createEvent/createEvent';
import CheckoutSuccess from './pages/checkouts/checkoutSuccess';
import CheckoutFailed from './pages/checkouts/checkoutFailed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        // to modidy later
        <Route path='/event/:eventId' element={<EventPage />} />
        <Route path='/artist' element={<ArtistPage />} />

        // test
        <Route path='/addEvent' element={<CreateEvent />} />

        // test checkouts
        <Route path='/checkout-success' element={ <CheckoutSuccess/> } />  
        <Route path='/checkout-failed' element={ <CheckoutFailed/> } />     

      </Routes>
    </Router>
  );
}

export default App;
