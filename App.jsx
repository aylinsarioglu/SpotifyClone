import { StyleSheet, Text, View,SafeAreaView} from 'react-native'
import React from 'react'
import Routes from './src/navigation/Routes'
import { AlbumProvider } from './src/context/AlbumContext'
import { ArtistProvider } from './src/context/ArtistContext'
import { PlayerProvider } from './src/context/PlayerContext'

const App = () => {
  return (
 <AlbumProvider>
   <ArtistProvider>
     <PlayerProvider>
       <Routes />
     </PlayerProvider>
   </ArtistProvider>
 </AlbumProvider>
  )
}

export default App

const styles = StyleSheet.create({})