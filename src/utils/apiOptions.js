export  const AlbumAPIOptions = {
      method: 'GET',
      url: 'https://spotify81.p.rapidapi.com/search',
      params: {
        q: 'Türkiyede popüler',
        type: 'albums',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': 'e95a5a5f1emsh00a2cc6a4e5db6dp19fb12jsn41d41ee0c1ff',
        'x-rapidapi-host': 'spotify81.p.rapidapi.com',
      },
    };

export const ArtistAPIOptions = {
    method: 'GET',
    url: 'https://spotify81.p.rapidapi.com/search',
    params: {
      q: 'Türkiyede popüler olanlar',
      type: 'artists',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5',
    },
    headers: {
      'x-rapidapi-key': 'e95a5a5f1emsh00a2cc6a4e5db6dp19fb12jsn41d41ee0c1ff',
      'x-rapidapi-host': 'spotify81.p.rapidapi.com',
    },
  };

export const TrackAPIOptions = (albumId) => ({
  method: 'GET',
  url: 'https://spotify81.p.rapidapi.com/album_tracks',
  params: {
    id: albumId,
    offset: '0',
    limit: '20',
  },
  headers: {
    'x-rapidapi-key': 'e95a5a5f1emsh00a2cc6a4e5db6dp19fb12jsn41d41ee0c1ff',
    'x-rapidapi-host': 'spotify81.p.rapidapi.com',
  },
});