import React from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // You may need to install the Expo vector icons package

function CircleButtonWithArrow({ onPress, loading }) {
    const btnColor = { backgroundColor: loading ? "#67b0ff" : "#007BFF" };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.circleButton, ...btnColor }}
            activeOpacity={0.5}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="white"
                    style={styles.activityIndicator}
                    animating={true}
                />
            ) : (
                <FontAwesome name="arrow-right" size={24} color="white" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circleButton: {
        width: 54, // Adjust as needed for the desired size
        height: 54, // Adjust as needed for the desired size
        borderRadius: 32, // Half of the width/height to make it a circle
        backgroundColor: "#007BFF", // Button background color
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
});

export default CircleButtonWithArrow;
