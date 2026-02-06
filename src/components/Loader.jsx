import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.loader} > 
      <ActivityIndicator style={"large"} color={"#1DB954"} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"

    }
})