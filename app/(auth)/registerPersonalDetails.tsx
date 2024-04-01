import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const registerPersonalDetails = () => {
  const [nin, setNin] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [driverLicense, setDriverLicense] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  const PickerOnChange = ({ type }: any, selectedDate: any) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const genderDataList = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];
  const vehicleDataList = [
    { key: "1", value: "Car" },
    { key: "2", value: "Motorcycle" },
    { key: "2", value: "bicycle" },
  ];

  const uploadLicense = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        saveLicense(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {}
  };

  const saveLicense = async (image: any) => {
    try {
      setDriverLicense(image);
    } catch (error) {
      throw error;
    }
  };

  const uploadPhoto = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        savePhoto(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {}
  };

  const savePhoto = async (image: any) => {
    try {
      setPhoto(image);
    } catch (error) {
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#385533" }}>
      <StatusBar style="light" />

      <Animated.View
        entering={SlideInDown.duration(200).delay(100)}
        exiting={SlideOutDown.duration(200).delay(100)}
        style={styles.container}
      >
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../assets/images/Step2.png")} />
        </View>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={{ fontFamily: "Railway2", fontSize: 22 }}>
            Add Verification Details
          </Text>
          <Text style={{ fontFamily: "Railway1" }}>
            Enter your vehicle details
          </Text>
        </View>

        <View style={{ flexDirection: "column", gap: 20 }}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  backgroundColor: "#F0F2F5",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <Feather name="upload-cloud" size={20} color="black" />
              </View>
              <View>
                <Text style={{ fontFamily: "Railway3" }}>Driver License</Text>
                <Text
                  style={{
                    fontFamily: "Railway3",
                    color: "#98A2B3",
                    fontSize: 13,
                  }}
                >
                  JPEG format{" "}
                  <Entypo name="dot-single" size={20} color="#98A2B3" />
                  Max. 5MB
                </Text>
              </View>
              <TouchableOpacity
                onPress={uploadLicense}
                style={{
                  backgroundColor: "#54804D",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#fff", fontFamily: "Railway2" }}>
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "column", gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  backgroundColor: "#F0F2F5",
                  padding: 15,
                  borderRadius: 50,
                }}
              >
                <Feather name="upload-cloud" size={20} color="black" />
              </View>
              <View>
                <Text style={{ fontFamily: "Railway3" }}>Your Face</Text>
                <Text
                  style={{
                    fontFamily: "Railway3",
                    color: "#98A2B3",
                    fontSize: 13,
                  }}
                >
                  JPEG format{" "}
                  <Entypo name="dot-single" size={20} color="#98A2B3" />
                  Max. 5MB
                </Text>
              </View>
              <TouchableOpacity
                onPress={uploadPhoto}
                style={{
                  backgroundColor: "#54804D",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Railway2",
                    fontSize: 14,
                  }}
                >
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 15, marginTop: 5 }}>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              NIN (National Identification Number)
            </Text>
            <TextInput
              placeholder="NIN"
              style={styles.inputStyles}
              value={nin}
              onChangeText={setNin}
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
              DOB (Date Of Birth)
            </Text>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={PickerOnChange}
                style={{ height: 120, marginTop: -10 }}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#11182711",
                    height: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: 50,
                    marginTop: 10,
                    marginBottom: 15,
                    paddingHorizontal: 20,
                  }}
                  onPress={toggleDatePicker}
                >
                  <Text
                    style={{
                      fontFamily: "Railway3",
                      fontWeight: "500",
                      fontSize: 14,
                      color: "#385533",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#385533",
                    height: 50,
                    justifyContent: "center",
                    alignContent: "center",
                    borderRadius: 50,
                    marginTop: 10,
                    marginBottom: 15,
                    paddingHorizontal: 20,
                  }}
                  onPress={confirmIOSDate}
                >
                  <Text
                    style={{
                      fontFamily: "Railway3",
                      fontWeight: "500",
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  placeholder="Sat Aug 21 2024"
                  style={styles.inputStyles}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
            )}
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Gender
            </Text>
            <SelectList
              setSelected={(val: any) => setGender(val)}
              data={genderDataList}
              save="value"
              placeholder="Gender"
              search={false}
              boxStyles={{
                borderRadius: 5,
                borderColor: "#D0D5DD",
                padding: 10,
              }}
            />
          </View>
          <View style={{ width: "100%", flexDirection: "column", gap: 7 }}>
            <Text
              style={{
                fontFamily: "Railway3",
                fontSize: 14,
              }}
            >
              Vehicle
            </Text>
            <SelectList
              setSelected={(val: any) => setVehicleType(val)}
              data={vehicleDataList}
              save="value"
              placeholder="Vehicle"
              search={false}
              boxStyles={{
                borderRadius: 5,
                borderColor: "#D0D5DD",
                padding: 10,
              }}
            />
          </View>
        </View>
        <Link replace href={"/(auth)/otp"} asChild>
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

export default registerPersonalDetails;

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
});
