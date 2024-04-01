import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const onboardThree = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 50,
          gap: 7,
        }}
      >
        <Image
          source={require("../../assets/images/ride3.png")}
          style={{ marginBottom: 50 }}
        />

        {/* ========= Text =============== */}
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Railway2",
            textAlign: "center",
          }}
        >
          Become a grabber
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "#606060",
            lineHeight: 25,
            fontSize: 15,
            fontFamily: "Railway3",
          }}
        >
          Drive, deliver and earn. Choose your own working hours, track your
          metrics, earn bonuses and withdraw easily to your account. Do more
          with our app.
        </Text>
      </View>
      <View style={{ width: "100%", flexDirection: "column", gap: 15 }}>
        <Link replace href={"/(auth)/register"} asChild>
          <TouchableOpacity style={styles.btnStyles}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 17,
                fontFamily: "Railway2",
                fontWeight: "300",
              }}
            >
              Sign up as a new grabber
            </Text>
          </TouchableOpacity>
        </Link>
        <Link replace href={"/(auth)/login"} asChild>
          <TouchableOpacity style={styles.btnStyles1}>
            <Text
              style={{
                textAlign: "center",
                color: "#385533",
                fontSize: 17,
                fontFamily: "Railway2",
                fontWeight: "300",
              }}
            >
              Login as a grabber
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default onboardThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "white",
  },

  btnStyles: {
    backgroundColor: "#385533",
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  btnStyles1: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#385533",
  },
});
