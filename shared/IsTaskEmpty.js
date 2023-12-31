import { StyleSheet , View } from "react-native";

import { useLoadingTodos } from "../context/LoadingTaskContext";
import LottieAnim from "../components/LottieAnim";
import { useEffect } from "react";
import { useCount } from "../context/CompeleteTask";

export default function IsTaskEmpty(WrapComponent, { completed }) {
    return function (props) {
        const { todos } = useLoadingTodos();
        const { setCompleteTaskCount } = useCount()

        useEffect(() => {
            setCompleteTaskCount(prev => todos.filter(todo => todo.isCompleted).length)
        }, [todos])

        return todos.filter(todo => (todo.isCompleted === completed) ).length <= 0 ? (
            <View style={styles.emptyContainer}>
                <LottieAnim
                    source={require("../assets/anim-icons/empty-task.json")} // Replace with your animation file
                    autoPlay
                    loop
                    speed={1}
                    style={styles.animation}
                />
            </View>
        ) : (
            <WrapComponent {...props} />
        );
    };
}
const styles = StyleSheet.create({
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    animation: {
        width: 380,
        opacity: 0.7
    }
})
