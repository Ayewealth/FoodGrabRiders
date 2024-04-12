import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import CustomDrawerComponent from "@/components/CustomDrawerComponent";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const TabLayout = () => {
  const navigate = useRouter();
  const navigation = useNavigation();

  const ToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerComponent}
        screenOptions={{
          drawerActiveBackgroundColor: "#385533",
          drawerActiveTintColor: "#fff",
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Map",
            drawerLabelStyle: { marginLeft: -20, fontFamily: "Railway3" },
            headerTitle: "",
            headerTransparent: true,
            drawerItemStyle: { display: "none" },
            headerLeft: () => (
              <TouchableOpacity
                onPress={ToggleDrawer}
                style={{ marginLeft: 20 }}
              >
                <MaterialIcons name="menu" size={30} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#385533",
                  padding: 15,
                  borderRadius: 50,
                  position: "relative",
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    backgroundColor: "#EC1C23",
                    top: 5,
                    right: 5,
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    zIndex: 10,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 13 }}>1</Text>
                </View>
                <Feather name="shopping-bag" size={20} color="#fff" />
              </TouchableOpacity>
            ),
            drawerIcon: ({ size, color }) => (
              <Feather name="map" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="order"
          options={{
            drawerLabel: "Orders",
            drawerLabelStyle: { marginLeft: -20, fontFamily: "Railway3" },
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: ({ size, color }) => (
              <Feather name="shopping-bag" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="wallet"
          options={{
            drawerLabel: "Wallet",
            drawerLabelStyle: { marginLeft: -20, fontFamily: "Railway3" },
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="wallet-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="support"
          options={{
            drawerLabel: "Support",
            drawerLabelStyle: { marginLeft: -20, fontFamily: "Railway3" },
            headerTitle: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="support-agent" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "",
            headerTitle: "",
            drawerItemStyle: { display: "none" },
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{ marginLeft: 20 }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};
export default TabLayout;
