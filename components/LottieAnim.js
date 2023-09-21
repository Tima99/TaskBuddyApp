import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const LottieAnim = (props) => {
  try {
    return (
      <View>
        <LottieView
          {...props}
        />
      </View>
    );
  } catch (error) {
    console.error("Lottie Animation Error:", error);
    return null; // Render nothing or an error message if needed
  }
};

export default LottieAnim;
