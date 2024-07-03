import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { Link } from "expo-router";

const forgetPasswordSuccessful = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Animated.View
        entering={FadeInLeft.duration(200).delay(200)}
        exiting={FadeOutRight.duration(200).delay(200)}
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 100,
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Image
          source={require("@/assets/images/success.png")}
          style={{ width: 150, height: 150, objectFit: "contain" }}
        />
        <Text
          style={{
            fontFamily: "Railway3",
            fontSize: 30,
            textAlign: "center",
            lineHeight: 40,
          }}
        >
          Password Reset Successfully!
        </Text>
        <Text
          style={{
            color: "rgba(85, 85, 85, 1)",
            fontFamily: "Railway2",
            fontSize: 16,
          }}
        >
          Your Account Is Now Secure
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#555555",
            fontFamily: "Railway1",
            lineHeight: 30,
          }}
        >
          Your password has been updated successfully. You can now log in to
          Foodgrab using your new password.
        </Text>
        <Link replace href={"/(auth)/login"} asChild>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#385533",
              padding: 15,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Railway1",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </SafeAreaView>
  );
};

export default forgetPasswordSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
});
