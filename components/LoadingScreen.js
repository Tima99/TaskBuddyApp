import React, { useState } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function FullScreenModal({ visible, lottie }) {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => {
                // Handle modal closing
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {lottie ? (
                        <LottieView
                            source={lottie} // Replace with your animation file
                            autoPlay
                            loop
                            speed={1}
                            style={styles.animation}
                        />
                    ) : (
                        <ActivityIndicator size="large" color="#007BFF" />
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    animation: {
        width: 70,
        height: 70,
        color: "red",
    },
});

export default FullScreenModal;
