import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabOneScreen() {
  const { location } = useContext(AuthContext);
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userData } = useContext(AuthContext);

  const handleOnline = () => {
    setOnline(!online);
  };

  const INITIALREGION = {
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  };

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"#385533"} />
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          initialRegion={INITIALREGION}
          showsUserLocation
          showsMyLocationButton={false}
        />
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "column",
          gap: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: "#FFFFFF",
          width: "100%",
        }}
      >
        {online ? (
          <TouchableOpacity
            onPress={handleOnline}
            style={{
              backgroundColor: "#EC1C23",
              padding: 20,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "Railway2", color: "#fff" }}>
              GO OFFLINE
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleOnline}
            style={{
              backgroundColor: "#385533",
              padding: 20,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "Railway2", color: "#fff" }}>
              GO ONLINE
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.boxWithShadow}>
          <View>
            <Text
              style={{
                fontFamily: "Railway2",
                fontSize: 10,
                fontWeight: "300",
                color: "#383838",
              }}
            >
              TOTAL EARNINGS
            </Text>
            <Text
              style={{ fontFamily: "Railway2", color: "#385533", fontSize: 24 }}
            >
              &#x20A6;{userData?.data?.walletBalance}
            </Text>
          </View>
          <View>
            <Link href={"/(app)/(tabs)/wallet"} asChild>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    color: "#383838",
                    fontFamily: "Railway3",
                    fontSize: 12,
                  }}
                >
                  View Wallet
                </Text>
                <MaterialIcons name="double-arrow" size={22} color="black" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  boxWithShadow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "rgba(149, 157, 165, 0.8)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
});
