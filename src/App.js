import { useEffect } from 'react';
import LandingPage from './pages/landingpage';

function App() {
  useEffect(() => {
    // Set document title as fallback
    document.title = 'Alchemy · ALCHEMOS';
  }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
}

export default App;
