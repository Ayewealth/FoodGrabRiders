import { createContext, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { userToken, setUserToken } = useState(null);
  const { userData, setUserData } = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useState(false);
  const { isLoading, setIsLoading } = useState(false);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState(null);
  // console.log(location);

  const startBackgroundTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      await Location.requestBackgroundPermissionsAsync();
    }
    let location = await Location.getCurrentPositionAsync({});
    setStatus(status);
    setLocation(location);
  };

  const loginUser = async (e) => {};

  const contextData = {
    userToken,
    userData,
    isAuthenticated,
    isLoading,

    startBackgroundTracking,
    status,
    location,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
