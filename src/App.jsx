import './index.css'
import Featured from './sections/Featured'
import Footer from './sections/Footer';
import HeroSection from './sections/Hero'
import Step from './sections/Step';
import Testing from './sections/Testing';

function App() {
  return (
    <div>
      <HeroSection />
      <Featured />
      <Step />
      <Testing />
      <Footer />
    </div>
  );
}

export default App
