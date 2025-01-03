import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    const getAlbums = async () => {
      setError(undefined);
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const data = await response.json()
        console.log(data);
      }
      catch(e) {
        setError('Sorry, there was an error getting the albums. Please try again later.');
        console.error(`Error with fetching data: ${e}`);
      }
    }
    getAlbums();
  }, []);

  return (
    <>
      <h1>iTunes Top 100 Albums</h1>
      {error && <p>{error}</p>}
    </>
  )
}

export default App
