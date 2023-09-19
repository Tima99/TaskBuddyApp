import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

function Anchor( props ) {
    const { fontSize, textColor }= props

    return (
        <TouchableHighlight
            style={{...styles.btn, ...props?.design}}
            {...props}
            underlayColor="rgba(200,200,255, 0.5)"
        >
            <Text style={{...styles.text, fontSize: fontSize || 16, color: textColor || "blue"}}>{props.children}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    btn: {
        padding: 4,
        paddingHorizontal: 12,
    },
    text: {
        fontFamily: "Andika",
    },
});

export default Anchor;
