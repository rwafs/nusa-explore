import './index.css'
import Featured from './sections/Featured'
import Footer from './sections/Footer';
import HeroSection from './sections/Hero'
import Step from './sections/Step';
import Testimoni from './sections/Testimoni';

function App() {
  return (
    <div>
      <HeroSection />
      <Featured />
      <Step />
      <Testimoni />
      <Footer />
    </div>
  );
}

export default App
