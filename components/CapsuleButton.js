import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

function CapsuleButton(props) {
    const { loading } = props;
    const btnColor = { backgroundColor: loading ? "#67b0ff" : "#007BFF" };

    return (
        <TouchableOpacity
            {...props}
            style={{ ...styles.buttonContainer, ...btnColor, marginVertical: props.marginVertical || 20 }}
            activeOpacity={0.5}
            disabled={loading}
        >
            <Text style={styles.buttonText}>
                <ActivityIndicator
                    size="small"
                    color="white"
                    style={styles.activityIndicator}
                    animating={loading}
                />
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center", // Center horizontally
        backgroundColor: "#007BFF", // Button background color
        padding: 10, // Add padding for a larger touch area
        borderRadius: 30, // Adjust this value for the desired button roundness
        justifyContent: "center",
    },
    buttonText: {
        color: "white", // Text color
        fontSize: 19,
        fontFamily: "Andika", // Use the custom font here
        transform: [{ translateX: -10 }],
    },
    activityIndicator: {
        transform: [{ translateX: -10 - 5 }, { translateY: 3 }],
    },
});

export default CapsuleButton;
