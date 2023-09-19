import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

function capitalizeFirstLetter(str) {
    if(!str) return null
    // Use a regular expression to match the first letter
    // and convert it to uppercase, and the rest to lowercase
    return str.replace(/^(.)(.*)$/, (_, firstChar, restOfString) => {
        return firstChar.toUpperCase() + restOfString.toLowerCase();
    });
}

function Error({ children }) {
    return (
        <View style={styles.errorWraper}>
            <MaterialIcons
                name="error"
                size={20}
                color="red"
                style={{ opacity: Number(!!children) }}
            />
            <Text style={styles.message}>{capitalizeFirstLetter(children) || ' '}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorWraper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 5,
    },
    message: {
        color: "red",
        justifyContent: "center",
        fontFamily: "Andika",
    },
})

export default Error;
