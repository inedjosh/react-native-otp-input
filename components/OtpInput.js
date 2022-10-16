import React, { useEffect, useState, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const OtpInput = (props) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const digitsArr = new Array(props.maxLength).fill(0);

  const textInputRef = useRef(null);

  const handleBlur = () => {
    setInputIsFocused(false);
  };

  const handlePress = () => {
    setInputIsFocused(true);
    textInputRef?.current?.focus();
  };

  useEffect(() => {
    props.setOtpReady(props.otp.length === props.maxLength);

    return () => props.setOtpReady(false);
  }, [props.otp]);

  const mapDigitFromInput = (value, index) => {
    const emptyInputChar = "";
    const digit = props.otp[index] || emptyInputChar;

    const isCurrentDigit = index === props.otp.length;
    const isLastDigit = index === props.maxLength - 1;
    const isCodeFull = props.otp.length === props.maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const OTPInputFocused = {
      borderColor: "green",
      borderWidth: 2,
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    };

    const OTPInput = {
      borderColor: "#ccc",
      borderWidth: 2,
      width: 40,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    };

    const styledInputBox =
      inputIsFocused && isDigitFocused ? OTPInputFocused : OTPInput;

    return (
      <View style={styledInputBox} key={index}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.div}>
      <TouchableOpacity
        style={{
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={handlePress}
      >
        {digitsArr.map(mapDigitFromInput)}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        selectionColor={"#008325"}
        autoCorrect={false}
        autoCapitalize="none"
        importantForAutofill={"no"}
        value={props.otp}
        onChangeText={props.setOtp}
        keyboardType="number-pad"
        maxLength={props.maxLength}
        returnKeyType={"done"}
        textContentType="oneTimeCode"
        ref={textInputRef}
        onBlur={handleBlur}
        {...props}
      />
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  div: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
