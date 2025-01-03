import { useState, useEffect } from 'react';
import './scss/styles.scss';

function App() {
  const [error, setError] = useState();
  const [albums, setAlbums] = useState();

  useEffect(() => {
    const getAlbums = async () => {
      setError(undefined);
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const data = await response.json();
        console.log(data.feed.entry);
        setAlbums(data.feed.entry);
      }
      catch(e) {
        setError('Sorry, there was an error getting the albums. Please try again later.');
        console.error(`Error with fetching data: ${e}`);
      }
    }
    getAlbums();
  }, []);

  return (
    <div className="container">
      <h1>iTunes Top 100 Albums</h1>
       <button className="btn btn-primary">Primary button</button>
       { error && <p>{error}</p> }
       { !error && albums && albums.map((album) => (
         <div key={album.id.attributes['im:id']}>{album['im:name'].label}</div>
       ))}
    </div>
  )
}

export default App
