import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerComponent = (props: any) => {
  const navigate = useRouter();

  const { top, bottom } = useSafeAreaInsets();
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
              source={require("../assets/images/profile.png")}
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
                Charles Jude
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
