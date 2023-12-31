import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import req from "../api/req";
import { useCredentials } from "../context/CredentialsContext";
import checkTokenExpiration from "../utils/checkTokenExpiration";
import * as SecureStore from "expo-secure-store";
import STORE from "../constants";
import LottieAnim from "../components/LottieAnim";
import Error from "../components/Error";
import * as Network from "expo-network";
import Anchor from "../components/Anchor";

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const { accessToken, setToken } = useCredentials();
    const [isConnected, setIsConnected] = useState(true);

    async function generateNewToken() {
        try {
            const refreshToken = await SecureStore.getItemAsync(
                STORE.REFRESH_TOKEN
            );

            const res = await req.get("/refresh/token", {
                headers: {
                    Authorization: refreshToken,
                },
            });

            if (!res.data?.access_token)
                throw new Error("Somthing went wrong...");

            await SecureStore.setItemAsync(
                STORE.ACCESS_TOKEN,
                res.data?.access_token
            );
            setToken(res.data?.access_token);
            return res.data?.access_token;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    const fetchPlayerProfile = async () => {
        try {
            let authToken = accessToken;
            const isTokenExpire = checkTokenExpiration(authToken);

            if (isTokenExpire) authToken = await generateNewToken();

            const res = await req.get("/user", {
                headers: {
                    Authorization: authToken,
                },
            });

            if (res.data?._id) {
                setUser(res.data);
            }
        } catch (error) {
            console.log(error);
            setUser({ error: error?.message || error });
        }
    };

    const checkNetwork = async () => {
        try {
            const network = await Network.getNetworkStateAsync();
            if (!network.isConnected) return setIsConnected(false);
            setIsConnected(true);
            if (!user?.email) {
                await fetchPlayerProfile();
            }
        } catch (error) {
            console.log(error?.message || error);
        }
    };

    useEffect(() => {
        checkNetwork()
    }, []);

    return (
        <View style={styles.container}>
            {isConnected ? (
                user ? (
                    user.error ? (
                        <Text
                            style={{
                                fontFamily: "Andika",
                                fontSize: 15,
                                color: "red",
                            }}
                        >
                            {user.error}
                        </Text>
                    ) : (
                        <View style={styles.card}>
                            <LottieAnim
                                source={require("../assets/anim-icons/verified-user.json")} // Replace with your animation file
                                autoPlay
                                loop
                                speed={1}
                                style={styles.animation}
                            />
                            <Text style={styles.userTitle}>{user.email}</Text>
                            <Text style={styles.smallText}>
                                {new Date(user.createdAt).toLocaleString()}
                            </Text>
                        </View>
                    )
                ) : (
                    <ActivityIndicator size={"large"} color="blue" />
                )
            ) : (
                <View style={{ alignItems: "center" }}>
                    {/* <LottieAnim
                        source={require("../assets/anim-icons/no-internet.json")}
                        autoPlay
                        loop
                        speed={1}
                        style={styles.noInternetAnimation}
                    /> */}
                    <Error>{"No Internet Connection"}</Error>

                    <Anchor fontSize={13} onPress={checkNetwork}>
                        Try Again
                    </Anchor>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
    },

    card: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 32,
        paddingHorizontal: 50,
        margin: 8,
        zIndex: 999,
        backgroundColor: "#fff",
        position: "relative",
    },
    userTitle: {
        fontFamily: "AndikaBold",
        fontSize: 16,
    },
    emailVerified: {
        fontFamily: "Andika",
    },
    animation: {
        width: 100,
        position: "absolute",
        top: 0,
        left: 0,
        transform: [{ scale: 0.6 }, { translateX: -80 }, { translateY: -60 }],
    },
    noInternetAnimation: {
        width: 100,
    },
});

export default ProfileScreen;
