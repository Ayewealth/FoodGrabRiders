import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const congrats = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Image
          source={require("../../assets/images/face.png")}
          style={{ width: "60%", height: "40%" }}
        />
        <View style={{ width: "100%", flexDirection: "column", gap: 10 }}>
          <Text
            style={{
              fontFamily: "Railway2",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            You Are doing well
          </Text>
          <Text
            style={{
              fontFamily: "Railway1",
              textAlign: "center",
              width: "100%",
              fontSize: 13,
              lineHeight: 25,
            }}
          >
            Congratulations! Your account has been successfully created. You're
            now ready to embark on a delicious journey with foodie delight.
          </Text>
        </View>
        <Link replace href={"/(auth)/login"} asChild>
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
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default congrats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  btnStyles: {
    backgroundColor: "#385533",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
  },
});
