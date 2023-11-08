import './App.css';
import Hero from './sections/hero/hero';
import Navbar from './components/navbar/navbar';
import Events from './sections/events/events';
import Artists from './sections/artists/artists';

function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Events />
      <Artists/>
    </>
  );
}

export default App;
