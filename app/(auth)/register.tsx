import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/contexts/AuthContext";

const register = () => {
  const [showPassword, setShowPassword] = useState<any>("");

  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#385533", width: "100%" }}
    >
      <StatusBar style="auto" />

      <Animated.ScrollView
        entering={SlideInDown.duration(200).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <Image source={require("../../assets/images/Step1.png")} />
        </View>
        <View style={{ flexDirection: "column", gap: 5, marginBottom: 15 }}>
          <Text style={{ fontFamily: "Railway2", fontSize: 22 }}>
            Get Started
          </Text>
          <Text style={{ fontFamily: "Railway1" }}>
            Fill in your personal details
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 15, marginTop: 5 }}>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              First Name
            </Text>
            <TextInput
              placeholder="First Name"
              style={styles.inputStyles}
              value={firstname}
              onChangeText={setFirstname}
              placeholderTextColor="#55555"
            />
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Last Name
            </Text>
            <TextInput
              placeholder="Last Name"
              style={styles.inputStyles}
              value={lastname}
              onChangeText={setLastname}
              placeholderTextColor="#55555"
            />
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Phone Number
            </Text>
            <TextInput
              placeholder="Your Number"
              style={styles.inputStyles}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor="#55555"
            />
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Email Address
            </Text>
            <TextInput
              placeholder="Your Email"
              style={styles.inputStyles}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#55555"
            />
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Password
            </Text>
            <View>
              <TextInput
                placeholder="Password"
                style={styles.inputStyles}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#55555"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconStyle}
              >
                {showPassword ? (
                  <Ionicons name="eye-off" size={20} color="#555555" />
                ) : (
                  <Ionicons name="eye" size={20} color="#555555" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Link href={"/(auth)/registerPersonalDetails"} asChild>
          <TouchableOpacity style={styles.btnStyles}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 15,
                fontFamily: "Railway3",
                fontWeight: "300",
              }}
            >
              Procced
            </Text>
          </TouchableOpacity>
        </Link>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 10,
            fontSize: 15,
            fontFamily: "Railway3",
          }}
        >
          Have an account?
          <Link replace href={"/login"}>
            <Text style={{ color: "#385533" }}> Login</Text>
          </Link>
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    backgroundColor: "white",
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  inputStyles: {
    padding: 13,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 13,
    position: "relative",
    fontFamily: "Railway3",
  },
  btnStyles: {
    backgroundColor: "#385533",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  iconStyle: {
    position: "absolute",
    top: 20,
    right: 30,
  },
});
