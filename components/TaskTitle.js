// TaskTitleInput.js
import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import H2 from "./H2";
import Center from "./Center";
import RoundButton from "./RoundButton";

const TaskTitleInput = ({ onNext, cacheData }) => {
    const [title, setTitle] = useState(cacheData || "");


    return (
        <View style={styles.container}>
            <H2>Step 1: Enter Title</H2>
            <View style={styles.inputContainer}>
                <FontAwesome
                    name="pencil"
                    size={24}
                    color="blue"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter task title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    autoFocus={!!cacheData}
                    maxLength={30}
                />
            </View>
            <Center>
                <RoundButton onPress={() => onNext(title)}></RoundButton>
            </Center>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "blue",
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
});

export default TaskTitleInput;
