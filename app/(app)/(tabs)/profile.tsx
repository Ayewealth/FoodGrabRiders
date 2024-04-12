import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";

const profile = () => {
  const [fullName, setFullName] = useState("Kingley Gbotemi");
  const [phoneNumber, setPhoneNumber] = useState("08143236758");
  const [emailAddress, setEmailAddress] = useState("Kingtemi@email.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1, gap: 15 }}>
        <View
          style={{ flexDirection: "column", gap: 15, paddingHorizontal: 20 }}
        >
          <Text
            style={{ fontFamily: "Railway2", fontWeight: "600", fontSize: 20 }}
          >
            Personal Information
          </Text>

          <View style={{ flexDirection: "column", gap: 15 }}>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                Full name
              </Text>
              <TextInput
                value={fullName}
                style={styles.inputStyles}
                aria-disabled
              />
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                Phone number
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={phoneNumber}
                  style={styles.inputStyles}
                  aria-disabled
                />
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    fontFamily: "Railway3",
                    textTransform: "capitalize",
                    color: "#70AA67",
                    fontSize: 13,
                  }}
                >
                  Verified
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                Email address
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={emailAddress}
                  style={styles.inputStyles}
                  aria-disabled
                />
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    fontFamily: "Railway3",
                    textTransform: "capitalize",
                    color: "#70AA67",
                    fontSize: 13,
                  }}
                >
                  Verified
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: "#EDEDED",
            }}
          >
            <Text
              style={{
                fontFamily: "Railway2",
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Change Password
            </Text>
          </View>
          <View
            style={{ flexDirection: "column", gap: 15, paddingHorizontal: 20 }}
          >
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                New Password
              </Text>
              <TextInput
                value={newPassword}
                style={styles.inputStyles}
                onChangeText={setNewPassword}
                placeholder="Password"
                placeholderTextColor="#11182744"
              />
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                Confirm New Password
              </Text>
              <TextInput
                value={confirmPassword}
                style={styles.inputStyles}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#11182744"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#385533",
            padding: 20,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Railway2",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  inputStyles: {
    padding: 13,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
    fontFamily: "Railway3",
    textTransform: "capitalize",
  },
});
