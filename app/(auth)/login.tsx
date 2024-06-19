import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/contexts/AuthContext";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserData, setUserToken } = useContext(AuthContext);

  const router = useRouter();

  const signin = async () => {
    setIsLoading(true);

    try {
      let response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUserToken(data.token);
        setUserData(data.data);
        await AsyncStorage.setItem("isAuthenticated", JSON.stringify(true));
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        router.replace("/(app)/(tabs)/");
      } else {
        alert(data.mssg);
        console.log(data.mssg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#385533" }}>
      <StatusBar style="light" />
      <Animated.View
        entering={SlideInDown.duration(200).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={styles.container}
      >
        <Text style={{ fontFamily: "Railway2", fontSize: 25 }}>Login</Text>
        <Text style={{ fontFamily: "Railway1", fontSize: 15 }}>
          Welcome back, login to place your order today
        </Text>

        <View style={{ paddingTop: 0 }}>
          <View style={styles.inputDiv}>
            <Text
              style={{
                fontFamily: "Railway3",
                paddingBottom: 10,
                fontSize: 15,
              }}
            >
              Email address
            </Text>
            <TextInput
              placeholder="Email address"
              style={styles.inputStyles}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputDiv}>
            <Text
              style={{
                fontFamily: "Railway3",
                paddingBottom: 10,
                fontSize: 15,
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
              />

              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconStyle}
              >
                {showPassword ? (
                  <Ionicons name="eye-off" color={"#555555"} size={20} />
                ) : (
                  <Ionicons name="eye" color={"#555555"} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnStyles} onPress={signin}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Railway2",
              color: "white",
              textAlign: "center",
            }}
          >
            {isLoading ? <ActivityIndicator color={"white"} /> : "Signin"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            paddingTop: 10,
            fontSize: 13,
            fontFamily: "Railway3",
          }}
        >
          Don’t have an account?
          <Link replace href={"/register"}>
            <Text style={{ color: "#385533" }}> Sign up</Text>
          </Link>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    marginTop: 100,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },

  inputDiv: {
    paddingTop: 20,
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
