import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api').then(
      response => response.json()
      ).then(
        data => {
        setBackendData(data)
      }
    )
  }, [])


  return (
    <div>
      <LandingPage />
    </div>
  );
}
export default App;