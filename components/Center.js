import React from 'react'
import { View, StyleSheet } from 'react-native'

function Center({ children }) {
  return (
    <View style={styles.center}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    }
})

export default Center