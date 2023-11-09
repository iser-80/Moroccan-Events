import './App.css';
import Hero from './sections/hero/hero';
import Navbar from './components/navbar/navbar';
import Events from './sections/events/events';
import Artists from './sections/artists/artists';
import About from './sections/about/about';
import Sponsor from './sections/news/Sponsor';

function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Events />
      <Artists/>
      <About />
      <Sponsor />
    </>
  );
}

export default App;
