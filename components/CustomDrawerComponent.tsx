import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "@/contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerComponent = (props: any) => {
  const navigate = useRouter();

  const { top, bottom } = useSafeAreaInsets();

  const { userData, logoutUser } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View
          style={{
            borderBottomColor: "#10101033",
            borderBottomWidth: 1,
            paddingBottom: 20,
            paddingTop: 20,
            paddingLeft: 10,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => navigate.push("/(app)/(tabs)/profile")}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Image
              source={{
                uri: userData?.data?.passportPhoto,
              }}
              style={{
                borderRadius: 50,
                width: 60,
                height: 60,
              }}
            />
            <View>
              <Text
                style={{
                  fontFamily: "Railway2",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {userData?.data?.firstName && userData?.data?.lastName
                  ? `${userData.data.firstName} ${userData.data.lastName}`
                  : "Guest"}
              </Text>
              <Text
                style={{
                  fontFamily: "Railway3",
                  fontWeight: "400",
                  color: "#0F973D",
                }}
              >
                Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 15,
            paddingLeft: 20,
          }}
        >
          <TouchableOpacity
            onPress={logoutUser}
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <MaterialIcons name="logout" size={24} color="#385533" />
            <Text style={{ fontFamily: "Railway3", color: "#385533" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#EC1C23",
            width: "90%",
            padding: 20,
            borderRadius: 10,
            marginBottom: 50 + bottom,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Railway2",
              textAlign: "center",
            }}
          >
            Call Emergency Line
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerComponent;
