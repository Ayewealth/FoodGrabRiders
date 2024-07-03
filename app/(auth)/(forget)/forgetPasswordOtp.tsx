import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import AuthHeader from "@/components/AuthHeader";
import { Ionicons } from "@expo/vector-icons";

const forgetPasswordOtp = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getEmail = async () => {
    try {
      const jsonValue: any = await AsyncStorage.getItem("forgetEmail");
      setEmail(jsonValue);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/recoverPassword?step=SECOND",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            token: resetCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok || response.status === 200) {
        alert(data.mssg);
        router.replace("/(auth)/(forget)/forgetPasswordNew");
      } else {
        alert(data.mssg);
        console.log(data.mssg);
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
    <Animated.View
      entering={FadeInLeft.duration(200).delay(200)}
      exiting={FadeOutRight.duration(200).delay(200)}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <AuthHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, marginTop: 15 }}
      >
        <View style={{ flexDirection: "column", gap: 20, width: "100%" }}>
          <View style={{ flexDirection: "column", gap: 10, width: "100%" }}>
            <Text style={{ fontFamily: "Railway2", fontSize: 28 }}>
              Verify With OTP
            </Text>
            <Text
              style={{
                fontFamily: "Railway1",
                fontSize: 16,
                color: "#555555",
                lineHeight: 30,
              }}
            >
              Please verify your email address by entering the code we've sent
              to your inbox. Enter a new password for your Welearn account.
            </Text>
          </View>

          <TextInput
            placeholder="Enter Otp"
            style={styles.inputStyles}
            value={resetCode}
            onChangeText={setResetCode}
          />

          <TouchableOpacity
            onPress={handleSendOtp}
            style={{
              alignItems: "center",
              backgroundColor: "#385533",
              padding: 15,
              borderRadius: 10,
              width: "100%",
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  fontFamily: "Railway2",
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                Verify
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default forgetPasswordOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  inputStyles: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "Railway3",
    fontSize: 14,
    color: "555555",
    width: "100%",
  },
  iconStyle: {
    position: "absolute",
    top: 17,
    right: 30,
  },
});
