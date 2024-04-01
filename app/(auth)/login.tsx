import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

const login = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#385533" }}>
      <StatusBar style="light" />
      <Animated.View
        entering={SlideInDown.duration(200).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={styles.container}
      >
        <Text>login</Text>
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
    marginTop: 20,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});
