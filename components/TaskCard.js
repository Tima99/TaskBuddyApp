import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"; // Import an icon library (you can use any icon library you prefer)
import LottieAnim from "./LottieAnim";
import { useCount } from "../context/CompeleteTask";

function isAsyncFunction(fn) {
    return (
        fn instanceof Object.getPrototypeOf(async function () {}).constructor
    );
}

const TaskCard = ({
    task,
    openForDelete,
    setIsOpenForDelete,
    onDelete,
    index,
    onStatusComplete,
    taskComplete,
}) => {
    const swipeableRef = useRef(null);
    const [animatedValue] = useState(new Animated.Value(0));
    const [heightValue] = useState(new Animated.Value(0));
    const [tapCount, setTapCount] = useState(0);
    const [screenWidth, setScreenWidth] = useState(
        Dimensions.get("window").width
    );
    const [rightThreshold, setRightThreshold]  = useState(20)

    const handleSwipeOpen = () => {
        openForDelete?.current && openForDelete.current.close();
        setIsOpenForDelete(swipeableRef);
    };

    const animateCard = (isComplete) => {
        // Define the animations for both translateX and height
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: 2,
                duration: 300, // Adjust the duration as needed
                useNativeDriver: false,
                easing: Easing.linear,
            }),
            Animated.timing(heightValue, {
                toValue: 1,
                duration: 300, // Adjust the duration as needed
                useNativeDriver: false,
                easing: Easing.linear,
            }),
        ]).start(async () => {
            // after animation finish remove icon delete
            swipeableRef?.current.close();

            if (typeof isComplete === "boolean") {
                typeof onStatusComplete === "function" &&
                    (isAsyncFunction(onStatusComplete)
                        ? await onStatusComplete(index)
                        : onStatusComplete(index));
                return;
            }

            // after animation finish delete task
            typeof onDelete == "function" &&
                (isAsyncFunction(onDelete)
                    ? await onDelete(index)
                    : onDelete(index));
        });
    };
    const handleCardPress = () => {
        // Increment the tap count
        setTapCount((prevCount) => prevCount + 1);

        // Reset the tap count after a delay (500ms) if it's not a double-tap
        setTimeout(() => {
            if (tapCount === 1) {
                // Handle single-tap action here
                // console.log("Single tap");
            }
            setTapCount(0); // Reset the tap count
        }, 500);

        // If it's a double-tap, trigger the delete animation
        if (tapCount === 1) {
            if (!(typeof onStatusComplete === "function")) return;
            setScreenWidth((prev) => prev * -1);
            animateCard(true);
        }
    };

    return (
        <Swipeable
            ref={swipeableRef}
            friction={2}
            rightThreshold={rightThreshold}
            leftThreshold={0}
            onActivated={handleSwipeOpen}
            renderRightActions={() => {
                return (
                    <RectButton style={styles.deleteButton} enabled={false}>
                        <Feather
                            name="trash-2"
                            size={24}
                            color="red"
                            onPress={animateCard}
                        />
                    </RectButton>
                );
            }}
        >
            <TouchableOpacity onPress={handleCardPress} activeOpacity={1}>
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    translateX: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -screenWidth],
                                    }),
                                },
                            ],
                            height: heightValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-1, 0],
                            }),
                            maxHeight: "auto",
                        },
                    ]}
                >
                    <View style={styles.card}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDescription}>
                            {task.description}
                        </Text>

                        {taskComplete && (
                            <View>
                                <LottieAnim
                                    source={require("../assets/anim-icons/task-completed.json")} // Replace with your animation file
                                    autoPlay
                                    loop={false}
                                    speed={1}
                                    style={styles.animation}
                                ></LottieAnim>
                            </View>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 14,
        paddingHorizontal: 16,
        margin: 8,
        zIndex: 999,
        backgroundColor: "#fff",
        position: "relative",
    },
    taskTitle: {
        fontFamily: "AndikaBold",
        fontSize: 16,
    },
    taskDescription: {
        fontFamily: "Andika",
    },
    deleteButton: {
        // backgroundColor: "rgba(200, 0, 0, .05)",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 16,
        zIndex: 0,
        paddingLeft: 15,
        paddingRight: 26,
    },

    animation: {
        width: 100,
        position: "absolute",
        top: 0,
        right: 0,
        transform: [{ scale: 0.6 }, { translateX: 20 }, { translateY: -105 }],
    },
});

export default TaskCard;
