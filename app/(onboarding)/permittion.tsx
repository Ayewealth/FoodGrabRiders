import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useFocusEffect } from "expo-router";

const permittion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Image source={require("../../assets/images/location.png")} />
        <Text
          style={{
            textAlign: "center",
            color: "#606060",
            lineHeight: 25,
            fontSize: 15,
            fontFamily: "Railway3",
          }}
        >
          By granting permission, you can get orders from any restaurants around
          you and receive more and more deliveries
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#385533",
          width: "100%",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 17,
            fontFamily: "Railway2",
            fontWeight: "300",
          }}
        >
          Grant Permission
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default permittion;

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
});
