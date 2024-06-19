import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nin, setNin] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [driverLicense, setDriverLicense] = useState();
  const [particulars, setParticulars] = useState();
  const [photo, setPhoto] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [location, setLocation] = useState(null);

  const router = useRouter();
  // console.log(userToken);

  const loadAuthData = async () => {
    const storedAuthTokens = await AsyncStorage.getItem("token");
    if (storedAuthTokens) {
      const tokens = JSON.parse(storedAuthTokens);
      setUserToken(tokens);
    }
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (userToken === null || userToken === undefined) {
      loadAuthData();
    }
  }, []);

  const riderSignup = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    formData.append("DOB", dateOfBirth);
    formData.append("NIN", nin);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("vehicleType", vehicleType);
    formData.append("gender", gender);
    if (photo) {
      const photoFile = {
        name: photo.fileName,
        uri: photo.uri,
        type: photo.mimeType,
        size: photo.fileSize,
      };
      formData.append("photo", photoFile);
    }
    if (driverLicense) {
      const driverLicenseFile = {
        name: driverLicense.fileName,
        uri: driverLicense.uri,
        type: driverLicense.mimeType,
        size: driverLicense.fileSize,
      };
      formData.append("license", driverLicenseFile);
    }
    if (particulars) {
      const particularsFile = {
        name: particulars.fileName,
        uri: particulars.uri,
        type: particulars.mimeType,
        size: particulars.fileSize,
      };
      formData.append("particulars", particularsFile);
    }
    formData.append("state", state);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("houseNumber", houseNumber);

    // console.log("Form Data: ", formData);

    try {
      let response = await fetch(
        "https://api.foodgrab.africa/couriers/api/v1/signup/",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status === 201) {
        alert(data.mssg);
        await AsyncStorage.setItem("userEmail", email);
        router.push("/(auth)/otp");
      } else {
        alert(data.mssg);
      }
    } catch (error) {
      console.error("Signup error: ", error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startBackgroundTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      await Location.requestBackgroundPermissionsAsync();
    }
    let location = await Location.getCurrentPositionAsync({});
    setStatus(status);
    setLocation(location);
  };

  const contextData = {
    userToken,
    setUserToken,
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,

    startBackgroundTracking,
    status,
    location,

    firstname,
    setFirstname,
    lastname,
    setLastname,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    nin,
    setNin,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    vehicleType,
    setVehicleType,
    driverLicense,
    setDriverLicense,
    particulars,
    setParticulars,
    photo,
    setPhoto,
    state,
    setState,
    city,
    setCity,
    street,
    setStreet,
    houseNumber,
    setHouseNumber,
    riderSignup,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContext");
  }

  return value;
};
