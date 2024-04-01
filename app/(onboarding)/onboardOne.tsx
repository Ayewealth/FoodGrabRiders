import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const onboardOne = () => {
  const router = useRouter();

  const hasSeenScreen = async () => {
    await AsyncStorage.setItem("seenScreen", JSON.stringify(true));
    router.replace("/(onboarding)/onboardTwo");
  };
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
          source={require("../../assets/images/ride1.png")}
          style={{ marginBottom: 50 }}
        />

        {/* ========= Text =============== */}
        <Image source={require("../../assets/images/Step1.png")} />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Railway2",
            textAlign: "center",
          }}
        >
          Quench your craving
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
          Find your favorite meal from your favorite restaurants and we will
          deliver it to your door step
        </Text>
      </View>
      <Link replace href={"/(onboarding)/onboardTwo"} asChild>
        <TouchableOpacity style={styles.btnStyles} onPress={hasSeenScreen}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 17,
              fontFamily: "Railway2",
              fontWeight: "300",
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default onboardOne;

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
});
