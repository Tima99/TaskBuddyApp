import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function H2({ children, onBack, isBack = false }) {
    return (
        <View style={{ position: "relative" }}>
            {isBack && (
                <Ionicons
                    name="chevron-back"
                    size={21}
                    color="black"
                    style={{ position: "absolute", top: 5, left: -5 }}
                    onPress={onBack}
                />
            )}

            <View style={{ transform: [{ translateX: isBack ? 20 : 0 }] }}>
                <Text style={styles.heading}>{children}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        marginBottom: 10,
        fontFamily: "Andika",
    },
});

export default H2;
