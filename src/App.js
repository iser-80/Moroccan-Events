import './App.css';
import Hero from './sections/hero/hero';
import Navbar from './components/navbar/navbar';
import Events from './sections/events/events';

function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Events />
    </>
  );
}

export default App;
