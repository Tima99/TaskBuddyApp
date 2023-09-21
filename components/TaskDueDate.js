import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import CheckBox from "@react-native-community/checkbox";
// import DateTimePicker from "@react-native-datetimepicker";
// import DateTimePicker from '@react-native-community/datetimepicker';


const TaskDueDateInput = ({ onComplete }) => {
    const [dueDate, setDueDate] = useState("");
    const [reminder, setReminder] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === "ios");
        setDate(currentDate);

        // Format the date and time to your desired format
        const formattedDate = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
        }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        setDueDate(formattedDate);
    };

    const showDateTimePicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Step 3: Enter Due Date</Text>
            <View style={styles.inputContainer}>
                <FontAwesome
                    name="calendar"
                    size={24}
                    color="blue"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Due Date (e.g., YYYY-MM-DD HH:mm)"
                    value={dueDate}
                    onChangeText={(text) => setDueDate(text)}
                    onFocus={showDateTimePicker} // Show date picker when input is focused
                />
            </View>
            <View style={styles.reminderContainer}>
                {/* <CheckBox
                    value={reminder}
                    onValueChange={(newValue) => setReminder(newValue)}
                /> */}
                <Text style={styles.reminderText}>Set Reminder</Text>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={handleDatePicker}
                />
            )}
            <FontAwesome
                name="check-circle"
                size={24}
                color="green"
                onPress={() => onComplete(dueDate, reminder)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
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
    reminderContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    reminderText: {
        marginLeft: 10,
    },
});

export default TaskDueDateInput;
