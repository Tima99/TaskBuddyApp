import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import CapsuleButton from "../../components/CapsuleButton";
import SoftInput from "../../components/SoftInput";
import LoadingScreen from "../../components/LoadingScreen";
import useForm from "../../hooks/useForm";
import Error from "../../components/Error";
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';
import STORE from "../../constants"
import passwordValidator from "../../utils/passwordValidation";

const LoginCredentials = ({ route, navigation }) => {
    const { email, hasPassword } = route.params;
    const [isResetModalVisible, setResetModalVisible] = useState(false); // State for controlling modal visibility

    const [password, setPassword] = useState("");

    const { error, setError, loading, handleSubmit } = useForm();

    const handleClick = async () => {
            await handleSubmit(`/auth/user`, {
                formData: { email, password },
                validator: () => passwordValidator(password),
                onStatusOk: async (data) => {
                    try {
                        // save tokens to expo-secure-store once status is 200 or ok ( data.acess_token and data.refresh_token )
                        await SecureStore.setItemAsync(STORE.REFRESH_TOKEN, data.refresh_token);
                        await SecureStore.setItemAsync(STORE.ACCESS_TOKEN, data.access_token);
                        
                        // after store secure keys - navigate user to Home
                        navigation.navigate("TabNavigator")
                    } catch (error) {
                        return Promise.reject(error)
                    }
                }
            });
    };

    const handleResetPassword = async () => {
        setResetModalVisible(true)
        const data = await handleSubmit(`/resend/otp/${email}`, { method: "GET" });
        // const data  = await delay(5000)
        setResetModalVisible(false)
        if(!data) return
        navigation.navigate("OtpInputScreen", { email });
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null} // Use null for Android
        >
            <Error>
                {error}
            </Error>

            <SoftInput
                placeholder={hasPassword ? "Enter Password" : "Create Password"}
                secureTextEntry
                onChangeText={(text) => {
                    setPassword(text);
                    setError(null);
                }}
                maxLength={15}
                rightBtn={hasPassword ? {
                    text: "Reset Password",
                    onPress: handleResetPassword,
                } : {}}
                icon={<FontAwesome name="lock" />}

            />

            <CapsuleButton onPress={handleClick} loading={loading && !isResetModalVisible} >
                Let's Go 
            </CapsuleButton>

            {isResetModalVisible ? <LoadingScreen lottie={require('../../assets/anim-icons/animation_email_sent.json')}/> : null}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 40,
        alignItems: "center", // Center horizontally
    },
    input: {
        width: "100%", // Take full width
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    buttonContainer: {
        alignItems: "center", // Center horizontally
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
});

export default LoginCredentials;
