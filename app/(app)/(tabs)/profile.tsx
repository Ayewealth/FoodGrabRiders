import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const profile = () => {
  const { userData, userToken } = useContext(AuthContext);

  const [fullName, setFullName] = useState(
    userData && userData
      ? `${userData.data.firstName} ${userData.data.lastName}`
      : "Kingley Gbotemi"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userData && userData ? userData.data.phoneNumber : "08143236758"
  );
  const [emailAddress, setEmailAddress] = useState(
    userData && userData ? userData.data.email : "Kingtemi@email.com"
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/updatePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.mssg);
      } else {
        alert(data.mssg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
                Old Password
              </Text>
              <TextInput
                value={oldPassword}
                style={styles.inputStyles}
                onChangeText={setOldPassword}
                placeholder="Old Password"
                placeholderTextColor="#11182744"
              />
            </View>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
                New Password
              </Text>
              <TextInput
                value={newPassword}
                style={styles.inputStyles}
                onChangeText={setNewPassword}
                placeholder="New Password"
                placeholderTextColor="#11182744"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={changePassword}
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
            {loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              "Change Password"
            )}
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
