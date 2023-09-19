import React from "react";

import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import Anchor from "./Anchor";

function SoftInput(props) {

    const modifiedIcon = React.cloneElement(props.icon, {
        style: { ...props.icon.props.style, color: "#aaac" }, // Change the color
        size: 22
    });

    return (
        <View style={styles.inputContainer}>
            <View style={styles.icon}>{modifiedIcon}</View>
            <TextInput style={styles.input} {...props} />
            {props.rightBtn && 
                <Anchor onPress={props.rightBtn?.onPress} style={styles.rightBtn} fontSize={12} >
                    {props.rightBtn.text}
                </Anchor>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
        position: "relative",
        justifyContent: "center",
    },
    input: {
        width: "100%", // Take full width
        padding: 6,
        paddingHorizontal: 35,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        fontSize: 19,
        borderBottomColor: "#007BFF",
        borderBottomWidth: 1.2,
    },
    icon: {
        position: "absolute",
        left: 5,
    },
    rightBtn: {
        position: "absolute",
        right: 0,
        padding: 5
    },
});

export default SoftInput;
