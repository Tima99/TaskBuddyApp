import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import H2 from "./H2";
import Center from "./Center";
import RoundButton from "./RoundButton";

const TaskDescriptionInput = ({ onNext , onPrev}) => {
    const [description, setDescription] = useState("");
    const [laoding, setLoading] = useState(false);
    const maxCharacters = 250;

    const handleDescriptionChange = (text) => {
        if (text.length <= maxCharacters) {
            setDescription(text);
        }
    };

    return (
        <View style={styles.container}>
            <H2 isBack={true} onBack={onPrev} >Step 2: Enter Description</H2>

            <View style={styles.inputContainer}>
                <FontAwesome
                    name="pencil"
                    size={24}
                    color="blue"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter task description"
                    value={description}
                    onChangeText={handleDescriptionChange}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top" // Align text to the top
                    scrollEnabled={true} // Enable scrolling for long text
                    autoFocus={true}
                    maxLength={maxCharacters}
                />
            </View>
            <Text style={styles.characterCount}>
                {maxCharacters - description.length} / {maxCharacters}
            </Text>

            <Center>
                <RoundButton onPress={() => onNext(description, setLoading)} laoding={laoding} ></RoundButton>
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
        alignItems: "flex-start", // Align to the top
        borderWidth: 1,
        borderColor: "blue",
        padding: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    characterCount: {
        alignSelf: "flex-end",
        color: "gray",
        fontSize: 11,
    },
});

export default TaskDescriptionInput;
