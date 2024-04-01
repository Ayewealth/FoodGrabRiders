import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const onboardTwo = () => {
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
          source={require("../../assets/images/ride2.png")}
          style={{ marginBottom: 50 }}
        />

        {/* ========= Text =============== */}
        <Image source={require("../../assets/images/Step2.png")} />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Railway2",
            textAlign: "center",
          }}
        >
          Discover new cuisines
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
          From local favorites to global delights, find the perfect dish for
          every taste
        </Text>
      </View>
      <Link replace href={"/(onboarding)/onboardThree"} asChild>
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
            Next
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default onboardTwo;

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
