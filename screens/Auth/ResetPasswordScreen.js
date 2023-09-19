import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CapsuleButton from "../../components/CapsuleButton";
import useForm from "../../hooks/useForm";
import { MaterialIcons } from "@expo/vector-icons";
import CongratulationModal from "../../components/Congrats";
import Anchor from "../../components/Anchor";
import passwordValidator from "../../utils/passwordValidation";

function ResetPasswordScreen({ route, navigation }) {
    const { email } = route.params;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading, error, setError, handleSubmit } = useForm();

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleClick = async () => {
        const validator = () => {
            if (password.length <= 0 || confirmPassword.length <= 0)
                return Promise.reject("All fields are required");    
            if (password !== confirmPassword) {
                return Promise.reject("Password and Confirm Password does not match");
            }
            return passwordValidator(password)
        };

        await handleSubmit(`/reset/password`, {
            formData: { email, password, confirmPassword },
            validator,
            onStatusOk: () => {
                setShowModal(true);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reset Password</Text>

            <View style={styles.errorWraper}>
                <MaterialIcons name="error" size={20} color="red" style={{opacity: Number(!!error) }} />
                <Text style={styles.message}>{error}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => {
                    setError(null);
                    setPassword(text);
                }}
                importantForAutofill="no"
                autoFocus={true}
            />
            <TextInput
                style={{...styles.input, marginBottom: 30}}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => {
                    setError(null);
                    setConfirmPassword(text);
                }}
                importantForAutofill="no"
            />

            <CapsuleButton loading={loading} onPress={handleClick}>
                Reset Password
            </CapsuleButton>

            <View style={styles.anchorWraper}>
                <Anchor
                    onPress={() => navigation.navigate("LoginHomeScreen")}
                >Log in</Anchor>
            </View>

            <CongratulationModal
                isVisible={showModal}
                onClose={() => {
                    setShowModal(false);
                    // if user is able to reset password than he must have password exists
                    navigation.navigate("LoginCredentials", { email , hasPassword: true })
                }}
                message="Password Reset Successfully"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 24,
        marginBottom: 10,
    },
    errorWraper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 5,
    },
    message: {
        color: "red",
        justifyContent: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    link: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
        marginTop: 25,
    },
    anchorWraper:{
        alignItems: "center",
        marginTop: 20
    }
});

export default ResetPasswordScreen;
