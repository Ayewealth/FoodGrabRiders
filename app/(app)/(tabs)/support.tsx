import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const support = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", gap: 20 }}>
        <Text
          style={{ fontFamily: "Railway2", fontWeight: "600", fontSize: 20 }}
        >
          Support
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#10101014",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <MaterialCommunityIcons
              name="message-text-outline"
              size={20}
              color="#0F973D"
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              gap: 5,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                fontFamily: "Railway2",
              }}
            >
              Inbox
            </Text>
            <Text
              style={{
                textTransform: "capitalize",
                fontFamily: "Railway1",
                fontSize: 11,
                fontWeight: "400",
              }}
            >
              Send a compliant message here
            </Text>
          </View>

          <View>
            <TouchableOpacity>
              <MaterialIcons name="double-arrow" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default support;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
