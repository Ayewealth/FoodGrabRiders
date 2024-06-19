import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CELL_COUNT = 4;

const otp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const getEmail = async () => {
    try {
      const jsonValue: any = await AsyncStorage.getItem("userEmail");
      setEmail(jsonValue);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            token: otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok || response.status === 200) {
        alert(data.mssg);
        router.replace("/(auth)/congrats");
      } else {
        alert(data.mssg);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View>
          <Text style={{ fontFamily: "Railway2", fontSize: 20 }}>
            OTP Verification
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontFamily: "Railway1",
              fontSize: 13,
              color: "#606060",
            }}
          >
            Thank you for signing up, Enter the 4-digit that we have sent via
            the phone number +234 728-1047-820
          </Text>
        </View>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={otp}
          onChangeText={setOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: "sms-otp",
            default: "one-time-code",
          })}
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol}
            </Text>
          )}
        />

        <TouchableOpacity style={styles.btnContainer} onPress={handleVerify}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Verify my account</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default otp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },

  input: {
    height: 50,
    width: "100%",
    borderColor: "#D1D1D199",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  btnContainer: {
    backgroundColor: "#385533",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },

  btnText: {
    fontFamily: "Railway2",
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    paddingHorizontal: 30,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#D1D1D199",
    textAlign: "center",
    borderRadius: 10,
    fontFamily: "Railway2",
  },
  focusCell: {
    borderColor: "#8CD480",
  },
});
