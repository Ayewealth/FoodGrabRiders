import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState<any>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#385533" }}>
      <StatusBar style="auto" />

      <Animated.View
        entering={SlideInDown.duration(200).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={styles.container}
      >
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../assets/images/Step1.png")} />
        </View>
        <View style={{ flexDirection: "column", gap: 5 }}>
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
              placeholderTextColor="#11182744"
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
              placeholderTextColor="#11182744"
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
              placeholderTextColor="#11182744"
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
              placeholderTextColor="#11182744"
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
                placeholderTextColor="#11182744"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconStyle}
              >
                {showPassword ? (
                  <Ionicons name="eye-off" size={20} color="#11182744" />
                ) : (
                  <Ionicons name="eye" size={20} color="#11182744" />
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 15,
    backgroundColor: "white",
    marginTop: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  inputStyles: {
    padding: 10,
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
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  iconStyle: {
    position: "absolute",
    top: 15,
    right: 30,
  },
});
