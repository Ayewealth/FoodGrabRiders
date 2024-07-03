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
import React, { useContext, useState } from "react";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import AuthHeader from "@/components/AuthHeader";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/contexts/AuthContext";

const forgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { userToken } = useContext(AuthContext);

  const handleForgetPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/recoverPassword?step=FIRST",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok || response.status === 200) {
        await AsyncStorage.setItem("forgetEmail", email);
        alert(data.mssg);
        router.replace("/(auth)/(forget)/forgetPasswordOtp");
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
              Forgot Your Password?
            </Text>
            <Text
              style={{
                fontFamily: "Railway1",
                fontSize: 16,
                color: "#555555",
                lineHeight: 30,
              }}
            >
              Enter the email associated with your account and we'll send you a
              link to reset your password.
            </Text>
          </View>

          <TextInput
            placeholder="Email Address"
            style={styles.inputStyles}
            value={email}
            onChangeText={setEmail}
          />

          <View
            style={{ alignItems: "center", flexDirection: "column", gap: 30 }}
          >
            <TouchableOpacity
              onPress={handleForgetPassword}
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
                  Send Reset Mail
                </Text>
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Railway1",
                color: "#0F0F0F",
                fontSize: 14,
              }}
            >
              Remembered your password?{" "}
              <Link
                style={{ color: "#385533", fontFamily: "Railway2" }}
                href={"/(auth)/login"}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default forgetPassword;

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
});
