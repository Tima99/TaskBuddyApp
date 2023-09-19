import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Keyboard } from "react-native";
import useForm from "../../hooks/useForm";
import RoundButton from "../../components/RoundButton";
import Error from "../../components/Error";
import useTimer from "../../hooks/useTimer";
import Anchor from "../../components/Anchor";

/**
 * This screen used for two purposes
 * 1. When email needs to verify - means when user's email is not yet created or verify 
 * 2. When email needs to confirm- means when user's wants to reset password
 * 
 * For indicating for which purpose its come, we used a boolean named (forEmailVerification)
 * if **true** 
 *      we used api for email otp verification and navigate user to Password screen 
 * else 
 *      we used api for reset password email confimation and navigate user to Reset Password screen
 */

const inputRefs = Array(4).fill(null);

const OTPIconInput = ({ route , navigation }) => {
    // email and forEmailVerification
    const { email , forEmailVerification } = route.params;
    const [value, setValue] = useState(["", "", "", ""]);
    const { error, setError, loading, handleSubmit } = useForm();
    const { seconds, isActive, startTimer, resetTimer } = useTimer(30); // timer for resend otp
    const [isResendOtp, setIsResendOtp] = useState(false)

    useEffect(() => {
        // Focus the first input when the component mounts
        inputRefs[0]?.focus();
        startTimer()
    }, []);

    async function handleClick() {

        const apiRoute = forEmailVerification ? '/otp/status' : '/reset/otp/status'
        
        await handleSubmit(apiRoute, {
            formData: { email, otp: value.join("") },
            validator: () => {
                if (email.trim().length <= 0 || value.some((i) => !i))
                    return Promise.reject("Invalid OTP");
            },
            onStatusOk: (data) => {
                if(forEmailVerification)
                    // if its for email verification , we needs to navigate user to Create Password screen so we give hasPassword to false 
                    navigation.navigate("LoginCredentials", { email, hasPassword: false })
                else
                    // if not for email verification thats its meets our second case which is for email confimation
                    // than navigate user to Reset Password Screen
                    navigation.navigate("ResetPasswordScreen", { email })
            },
        });

    }
    
    // resend otp
    async function ResendOtp(){
        setIsResendOtp(true)
        await handleSubmit(`/resend/otp/${email}`, { 
            method: 'GET',
            onStatusOk: () => {
                startTimer();
            } 
        })
        setIsResendOtp(false)
    }

    // Function to focus the next input when a digit is entered
    const focusNextInput = (index) => {
        if (index < inputRefs.length - 1) {
            inputRefs[index + 1].focus();
        }
    };

    // Function to focus the previous input when deleting a digit or pressing 'Backspace'
    const focusPreviousInput = (index) => {
        if (index > 0) {
            inputRefs[index - 1].focus();
        }
    };

    // Function to handle OTP input for each field
    const handleInputChange = (text, index) => {
        const updatedValue = [...value];
        updatedValue[index] = text;
        setValue(updatedValue);

        if (text !== "") {
            focusNextInput(index);
        } else {
            focusPreviousInput(index);
        }
    };

    // Handle backspace key press
    const handleBackspace = (index, event) => {
        setError(null);
        if (event.nativeEvent.key === "Backspace") {
            const updatedValue = [...value];
            if (updatedValue[index] === "") updatedValue[index - 1] = "";
            else updatedValue[index] = "";
            setValue(updatedValue);
            focusPreviousInput(index);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headingWraper}>
                <Text style={styles.heading}>Enter OTP</Text>
                <View style={{justifyContent: "center"}}>
                    <Anchor 
                        disabled={seconds > 0 || isResendOtp} 
                        onPress={ResendOtp} 
                        fontSize = {13} 
                        textColor={(seconds > 0 || isResendOtp) && 'grey'}
                    >
                        {
                            isResendOtp ?
                            "Sending..."
                            :
                            `Resend OTP ${seconds > 0 ? `(${seconds.toString().padStart(2, '0')}s)` : ''}`
                        }
                    </Anchor>
                </View>
            </View>

            <View style={styles.main}>
                <Error>{error}</Error>

                <View style={styles.blocksWraper}>
                    {inputRefs.map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs[index] = ref)}
                            style={{ ...styles.input }}
                            value={value[index]}
                            onChangeText={(text) =>
                                handleInputChange(text, index)
                            }
                            onKeyPress={(event) =>
                                handleBackspace(index, event)
                            }
                            keyboardType="numeric"
                            enterKeyHint="done"
                            // onSubmitEditing={() => inputRefs[index + 1]?.focus()} 
                            maxLength={1}
                            autoFocus={index === 0}
                            cursorColor="#3999ff"
                            keyboardShouldPersistTaps="handled" // Prevents keyboard from hiding
                        />
                    ))}
                </View>

                <RoundButton onPress={handleClick} loading={loading} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 5,
        marginTop: 70,
    },
    headingWraper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 15
    },
    heading: {
        fontSize: 25,
        fontFamily: "Andika",
    },
    main: {
        marginTop: 10,
        width: "100%",
        alignItems: "center",
        gap: 0,
    },
    blocksWraper: {
        flexDirection: "row",
    },
    input: {
        width: 50,
        height: 50,
        margin: 5,
        fontSize: 22,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#3999ff",
        borderRadius: 5,
        marginBottom: 30
    },
});

export default OTPIconInput;
