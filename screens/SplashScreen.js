// SplashScreen.js
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
// import { useNavigation } from '@react-navigation/native';
import LottieAnim from "../components/LottieAnim";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <LottieAnim
                source={require("../assets/anim-icons/buddy_splash_icon.json")} // Replace with your animation file
                autoPlay
                loop
                speed={1}
                style={styles.animation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // image: {
    //     width: 500, // Adjust the width and height as needed
    //     height: 500,
    // },
    animation: {
        width: 120,
        height: 120,
    },
});

export default SplashScreen;
