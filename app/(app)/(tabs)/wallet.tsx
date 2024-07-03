import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";

const wallet = () => {
  const [transactionFilter, setTransactionFilter] = useState("");

  const { userData } = useContext(AuthContext);

  const genderDataList = [
    { key: "1", value: "Today" },
    { key: "2", value: "Last Weeek" },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", gap: 15 }}>
        <Text
          style={{ fontFamily: "Railway2", fontWeight: "600", fontSize: 20 }}
        >
          Wallet
        </Text>

        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#EEFFEB",
            height: 100,
            width: "100%",
            paddingHorizontal: 15,
            borderRadius: 10,
            position: "relative",
          }}
        >
          <Image
            source={require("../../../assets/images/Card.png")}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 10,
              bottom: 0,
              zIndex: 1,
              width: "105%",
            }}
          />
          <Text
            style={{
              fontFamily: "Railway2",
              fontSize: 10,
              fontWeight: "300",
              color: "#383838",
              zIndex: 1,
            }}
          >
            Available Balance
          </Text>
          <Text
            style={{
              fontFamily: "Railway2",
              color: "#101010",
              fontSize: 24,
              zIndex: 1,
            }}
          >
            &#x20A6;{userData?.data?.walletBalance}
          </Text>
        </View>
        <Link href={"/(app)/withdrawal"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#385533",
              padding: 20,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontFamily: "Railway2", color: "#fff", fontSize: 16 }}
            >
              Withdraw
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={{ flexDirection: "column", gap: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontFamily: "Railway2",
              fontSize: 17,
              color: "#54804D",
            }}
          >
            Transactions
          </Text>
          <SelectList
            setSelected={(val: any) => setTransactionFilter(val)}
            data={genderDataList}
            arrowicon={
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#fff"
              />
            }
            search={false}
            save="value"
            boxStyles={{
              borderRadius: 50,
              padding: 5,
              backgroundColor: "#385533",
              borderColor: "#385533",
              zIndex: 1,
            }}
            defaultOption={{ key: "1", value: "Today" }}
            inputStyles={{ color: "#fff", fontFamily: "Railway2" }}
            dropdownStyles={{
              position: "absolute",
              top: 40,
              right: 0,
              zIndex: 10,
              backgroundColor: "#385533",
              borderColor: "#385533",
            }}
            dropdownTextStyles={{ color: "#fff", fontFamily: "Railway2" }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "column", gap: 20, zIndex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#0F973D33",
                }}
              >
                <Feather name="arrow-down-left" size={26} color="#0F973D" />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ fontFamily: "Railway2", fontSize: 16 }}>
                  Temi Kingsley
                </Text>
                <Text style={{ fontFamily: "Railway3", fontSize: 11 }}>
                  Received
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ fontFamily: "Railway2", fontSize: 16 }}>
                  &#x20A6;1,500
                </Text>
                <Text style={{ fontFamily: "Railway3", fontSize: 11 }}>
                  March 05, 2024
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                  backgroundColor: "#FBD2D3",
                }}
              >
                <Feather name="arrow-up-right" size={26} color="#EC1C23" />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ fontFamily: "Railway2", fontSize: 16 }}>
                  Great Adams
                </Text>
                <Text style={{ fontFamily: "Railway3", fontSize: 11 }}>
                  Withdrawn
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text style={{ fontFamily: "Railway2", fontSize: 16 }}>
                  &#x20A6;1,500
                </Text>
                <Text style={{ fontFamily: "Railway3", fontSize: 11 }}>
                  March 05, 2024
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default wallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
