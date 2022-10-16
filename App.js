import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import OtpInput from "./components/OtpInput";

export default function App() {
  const [otp, setOtp] = useState("");
  const MAX_LENGTH = 4;
  const [otpReady, setOtpReady] = useState(false);

  return (
    <View style={styles.container}>
      <OtpInput
        otp={otp}
        setOtp={setOtp}
        setOtpReady={setOtpReady}
        maxLength={MAX_LENGTH}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
