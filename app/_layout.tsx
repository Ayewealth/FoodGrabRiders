import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import {
  Slot,
  Stack,
  useFocusEffect,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
export { ErrorBoundary } from "expo-router";

import {
  AuthContext,
  AuthContextProvider,
  useAuth,
} from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const segments = useSegments();
  const router = useRouter();

  const [seenScreen, setSeenScreen] = useState<any>(false);
  const { status, startBackgroundTracking, setIsAuthenticated } =
    useContext(AuthContext);

  const { isAuthenticated } = useAuth();

  const getScreen = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("seenScreen");
      const auth = await AsyncStorage.getItem("isAuthenticated");
      setIsAuthenticated(auth);
      setSeenScreen(jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async () => {
    await AsyncStorage.clear();
  };

  useEffect(() => {
    getScreen();
    // removeItem();
  }, []);

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;

    const inTabsGroup = segments[0] === "(app)";

    if (isAuthenticated && !inTabsGroup) {
      router.push("/(app)/(tabs)/");
    } else if (!isAuthenticated && status === "granted" && !seenScreen) {
      router.replace("/(onboarding)/onboardOne");
    } else if (!isAuthenticated && status === "granted" && seenScreen) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, status]);

  useFocusEffect(
    React.useCallback(() => {
      startBackgroundTracking();
    }, [])
  );

  return <Slot />;
};

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Railway1: require("../assets/fonts/Raleway-Regular.ttf"),
    Railway2: require("../assets/fonts/Raleway-Bold.ttf"),
    Railway3: require("../assets/fonts/Raleway-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      <StatusBar style="light" />;
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <AuthContextProvider>
      <InitialLayout />
    </AuthContextProvider>
  );
};

export default RootLayout;
