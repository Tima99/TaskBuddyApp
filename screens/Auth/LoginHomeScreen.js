import React, { useState } from "react";
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import CapsuleButton from "../../components/CapsuleButton";
import SoftInput from "../../components/SoftInput";
import useForm from "../../hooks/useForm";
import { MaterialIcons } from '@expo/vector-icons';
import Error from "../../components/Error";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const { loading, error, setError, handleSubmit } = useForm();

    const handleClick = async () => {
        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const user_email = email.trim().toLowerCase();

        await handleSubmit(`/${user_email}/status`, {
            method: "GET",
            validator: () => {
                if (user_email.length <= 0 || !emailPattern.test(user_email))
                    return Promise.reject({ message: "Please provide valid email" });
            },
            onStatusOk: (user) => {
                if (user?.status)
                    navigation.navigate("LoginCredentials", {
                        email: user_email,
                        hasPassword: user.hasPassword,
                    });
                else if(!user.status)
                    // if status is false its means user has to verify their email via otp sent on given email
                    navigation.navigate("OtpInputScreen", { email: user_email, forEmailVerification: true })
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null} // Use null for Android
        >

            <Error>{error}</Error>

            <SoftInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmail(text);
                    setError(null);
                }}
                icon={<MaterialIcons name="email" size={22} color="#aaac" />}

            />

            <CapsuleButton onPress={handleClick} loading={loading}>
                Continue with Email
            </CapsuleButton>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 10,
        alignItems: "center",
    },
    input: {
        width: "100%", 
        padding: 6,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        fontSize: 19,
    },
    buttonContainer: {
        alignItems: "center",
        backgroundColor: "#007BFF", 
        padding: 15, 
        borderRadius: 30,
    },
});

export default LoginScreen;
