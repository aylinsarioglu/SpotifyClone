import React, {createContext, useEffect, useState} from 'react';
import {ArtistAPIOptions} from '../utils/apiOptions';
import axios from 'axios';

export const ArtistContext = createContext();

export const ArtistProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // IIFE (inmediately invoking function expression)
    // anında çalışan fonksiyon ifadesi

    (async () => {
      const options = ArtistAPIOptions;

      try {
        const response = await axios.request(options);
        console.log('Artist API Response:', JSON.stringify(response.data, null, 2));
        const data = response.data?.artists?.items || [];
        console.log('Parsed artists data:', data);
        setArtists(data);
      } catch (error) {
        console.log('Artist API Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};
