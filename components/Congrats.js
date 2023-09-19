import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function CongratulationModal({ isVisible, onClose, message }) {
    useEffect(() => {
        if (isVisible) {
            // Close the modal automatically after a few seconds
            const timer = setTimeout(() => {
                onClose();
            }, 1500); // Adjust the duration as needed
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <Modal transparent={true} visible={isVisible} animation="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LottieView
                        source={require("../assets/anim-icons/animation_lmmygipm.json")} // Replace with your animation file
                        autoPlay
                        loop
                        speed={1}
                        style={styles.animation}
                    />
                    <Text style={styles.title}>Congratulations !!</Text>
                    <Text style={styles.message}>{message}</Text>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 12
    },
    modalContent: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        paddingVertical: 50,
        alignItems: "center",
    },
    animation: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    title: {
        fontSize: 18,
        color: "green",
        fontFamily: "Andika",
    },
    message: {
        fontSize: 16,
        color: "green",
        fontFamily: "Andika",
    },
});

export default CongratulationModal;
