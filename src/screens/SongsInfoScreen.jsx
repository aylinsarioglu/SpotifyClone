import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SCREENS} from '../utils/helpers';
import axios from 'axios';
import {TrackAPIOptions} from '../utils/apiOptions';
import {
  ArrowLeft2,
  Heart,
  More,
  Play,
  Spotify,
} from 'iconsax-react-native';

const SongsInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {album} = route.params || {};
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gerçek şarkı verilerini API'den çek
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Albüm URI'sinden ID çıkar
        const albumId = album?.uri?.split(':').pop() || '';
        
        if (albumId) {
          const options = TrackAPIOptions(albumId);
          const response = await axios.request(options);
          
          const tracks = response.data?.items?.map((item, index) => ({
            id: item.data?.id || `track-${index}`,
            title: item.data?.name || `Track ${index + 1}`,
            artist: item.data?.artists?.items?.[0]?.profile?.name || album?.artist || 'Unknown Artist',
            thumbnail: album?.coverArt || '',
            hasLyrics: true,
            duration: item.data?.duration?.totalMilliseconds / 1000 || 180,
            audioUrl: item.data?.previewUrl || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(index % 10) + 1}.mp3`,
            videoUrl: item.data?.previewUrl || null,
            lyrics: generateLyrics(item.data?.name || `Track ${index + 1}`, album?.artist),
          })) || [];
          
          setSongs(tracks);
        } else {
          // Fallback: Albüm adına göre şarkılar oluştur
          setSongs(getSongsForAlbum());
        }
      } catch (error) {
        console.log('Error fetching tracks:', error);
        // Hata durumunda fallback şarkılar
        setSongs(getSongsForAlbum());
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [album]);

  // Şarkı sözleri oluştur
  const generateLyrics = (songTitle, artist) => {
    const titleWords = songTitle.toLowerCase().split(' ');
    const lyrics = [
      `${songTitle} is playing`,
      `From ${artist || 'this artist'}`,
      'Listen to the melody',
      'Feel the rhythm',
      'Dance to the beat',
      'Enjoy the music',
    ];
    return lyrics;
  };

  // Albüm adına göre benzersiz şarkılar oluştur (fallback)
  const getSongsForAlbum = () => {
    const albumName = album?.name || 'Unknown Album';
    const artistName = album?.artist || 'Unknown Artist';
    const albumNameLower = albumName.toLowerCase();

    // Albüm adından hash oluştur (her albüm için farklı şarkılar)
    const albumHash = albumName
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Şarkı şablonları
    const songTemplates = [
      {
        title: `${albumName.split(' ')[0] || 'Track'} 1`,
        lyrics: [
          'First song from this album',
          'Listen to the melody',
          'Feel the rhythm',
          'Dance to the beat',
          'Enjoy the music',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Track'} 2`,
        lyrics: [
          'Second track begins',
          'Music fills the air',
          'Hearts start to beat',
          'In perfect harmony',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Track'} 3`,
        lyrics: [
          'Third song plays',
          'Emotions rise',
          'Memories flow',
          'Time stands still',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Track'} 4`,
        lyrics: [
          'Fourth track',
          'Music continues',
          'Feel the energy',
          'Let it flow',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Track'} 5`,
        lyrics: [
          'Fifth song',
          'Still going strong',
          'The beat goes on',
          'Never ending',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Track'} 6`,
        lyrics: [
          'Final track',
          'But not the end',
          'Music lives on',
          'In our hearts',
        ],
      },
    ];

    // Albüm hash'ine göre şarkıları karıştır ve özelleştir
    const shuffledTemplates = [...songTemplates];
    for (let i = shuffledTemplates.length - 1; i > 0; i--) {
      const j = (albumHash + i) % (i + 1);
      [shuffledTemplates[i], shuffledTemplates[j]] = [
        shuffledTemplates[j],
        shuffledTemplates[i],
      ];
    }

    // Türkçe içerik kontrolü
    const isTurkish =
      albumNameLower.includes('türk') ||
      albumNameLower.includes('turk') ||
      artistName.toLowerCase().includes('türk') ||
      artistName.toLowerCase().includes('turk') ||
      albumNameLower.includes('şarkı') ||
      albumNameLower.includes('pop') ||
      albumNameLower.includes('hits');

    // Türkçe şarkılar için özel şablonlar
    const turkishTemplates = [
      {
        title: `${albumName.split(' ')[0] || 'Şarkı'} 1`,
        lyrics: [
          'Bu albümden ilk şarkı',
          'Müziği dinle',
          'Ritmi hisset',
          'Dans et',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Şarkı'} 2`,
        lyrics: [
          'İkinci parça başlıyor',
          'Müzik havayı dolduruyor',
          'Kalpler atmaya başlıyor',
          'Mükemmel uyum içinde',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Şarkı'} 3`,
        lyrics: [
          'Üçüncü şarkı çalıyor',
          'Duygular yükseliyor',
          'Anılar akıyor',
          'Zaman duruyor',
        ],
      },
      {
        title: `${albumName.split(' ')[0] || 'Şarkı'} 4`,
        lyrics: [
          'Dördüncü parça',
          'Müzik devam ediyor',
          'Enerjiyi hisset',
          'Akışına bırak',
        ],
      },
    ];

    const templates = isTurkish ? turkishTemplates : shuffledTemplates.slice(0, 4);

    return templates.map((template, index) => ({
      id: albumHash + index + 1,
      title: template.title,
      artist: artistName,
      thumbnail: album?.coverArt || '',
      hasLyrics: true,
      duration: 180 + (index * 30), // 3-5 dakika arası
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(albumHash % 10) + index + 1}.mp3`,
      videoUrl: null,
      lyrics: template.lyrics,
    }));
  };

  return (
    <LinearGradient colors={['#040305', '#131624']} style={{flex: 1}}>
      <ScrollView style={{marginTop: 50}} contentContainerStyle={{paddingBottom: 100}}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Playlist Cover */}
        <View style={styles.coverContainer}>
          <Image
            source={{uri: album?.coverArt || ''}}
            style={styles.coverImage}
          />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Tune in to Top Tracks from {album?.artist || 'Various Artists'} and
          many more
        </Text>

        {/* Creator */}
        <View style={styles.creatorContainer}>
          <Spotify color="#1DB954" size={20} />
          <Text style={styles.creatorText}>Spotify</Text>
        </View>

        {/* Stats */}
        <Text style={styles.stats}>191,165 likes • 3h 45min</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart color="white" size={24} variant="Outline" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <More color="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Play color="#000" size={32} variant="Bold" />
          </TouchableOpacity>
        </View>

        {/* Songs List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading songs...</Text>
          </View>
        ) : (
          <View style={styles.songsList}>
            {songs.map((song, index) => (
              <Pressable
                key={song.id}
                style={styles.songItem}
                onPress={() =>
                  navigation.navigate(SCREENS.SONGS, {song, album, songs})
                }>
                <Image
                  source={{uri: song.thumbnail}}
                  style={styles.songThumbnail}
                />
                <View style={styles.songInfo}>
                  <View style={styles.songTitleRow}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    {song.hasLyrics && (
                      <View style={styles.lyricsTag}>
                        <Text style={styles.lyricsText}>LYRICS</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <TouchableOpacity>
                  <More color="#B3B3B3" size={20} />
                </TouchableOpacity>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default SongsInfoScreen;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    marginBottom: 10,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: 280,
    height: 280,
    borderRadius: 8,
  },
  description: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  creatorText: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  stats: {
    color: '#B3B3B3',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: '#B3B3B3',
    fontSize: 16,
  },
  songsList: {
    paddingHorizontal: 15,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  songThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
  },
  songTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  songTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  lyricsTag: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  lyricsText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '700',
  },
  songArtist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
});