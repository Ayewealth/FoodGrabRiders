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

const forgetPasswordNew = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
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

  const handleForgetPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/recoverPassword?step=THIRD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok || response.status === 200) {
        alert(data.mssg);
        router.replace("/(auth)/(forget)/forgetPasswordSuccessful");
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

  const togglePasswordVisibility = () => {
    setShowPassword1(!showPassword1);
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
              Set a New Password
            </Text>
            <Text
              style={{
                fontFamily: "Railway1",
                fontSize: 16,
                color: "#555555",
                lineHeight: 30,
              }}
            >
              Please enter new password.
            </Text>
          </View>

          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              placeholder="New Password"
              style={styles.inputStyles}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword1}
            />

            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconStyle}
            >
              {showPassword1 ? (
                <Ionicons name="eye-off-outline" size={22} color="#555555" />
              ) : (
                <Ionicons name="eye-outline" size={22} color="#555555" />
              )}
            </TouchableOpacity>
          </View>

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
                Update Password
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default forgetPasswordNew;

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
