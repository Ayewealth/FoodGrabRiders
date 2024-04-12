import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OrderData from "@/dummyData/OrderData";
import { Feather } from "@expo/vector-icons";

const order = () => {
  const activeOrder = OrderData.filter((order) => order.status === "active");
  const ordersWithJanuary = OrderData.filter(
    (order) => order.date.includes("January") && order.status === "delivered"
  );
  const ordersWithFebuary = OrderData.filter(
    (order) => order.date.includes("February") && order.status === "delivered"
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "column", gap: 20 }}>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{
              fontFamily: "Railway2",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Available Orders
          </Text>
          <View style={{ flexDirection: "column", gap: 10 }}>
            {activeOrder.map((order) => (
              <View key={order.id}>
                <View
                  style={{
                    backgroundColor: "#385533",
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "Railway1",
                        fontSize: 11,
                        color: "#fff",
                      }}
                    >
                      PICKUP
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Railway2",
                        color: "#fff",
                        fontSize: 14,
                      }}
                    >
                      {order.pickUp}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "Railway1",
                          fontSize: 13,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        View Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{
              fontFamily: "Railway2",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            January
          </Text>
          <View style={{ flexDirection: "column", gap: 15 }}>
            {ordersWithJanuary.map((order) => (
              <View
                key={order.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#10101014",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <Feather name="shopping-bag" size={20} color="#0F973D" />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      fontFamily: "Railway2",
                    }}
                  >
                    {order.dropOff}
                  </Text>
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Railway1",
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    &#x20A6;{order.amount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway1",
                      fontWeight: "300",
                      fontSize: 11,
                    }}
                  >
                    {order.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{
              fontFamily: "Railway2",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            February
          </Text>
          <View style={{ flexDirection: "column", gap: 15 }}>
            {ordersWithFebuary.map((order) => (
              <View
                key={order.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#10101014",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <Feather name="shopping-bag" size={20} color="#0F973D" />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      fontFamily: "Railway2",
                    }}
                  >
                    {order.dropOff}
                  </Text>
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Railway1",
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    {order.status}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    &#x20A6;{order.amount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway1",
                      fontWeight: "300",
                      fontSize: 11,
                    }}
                  >
                    {order.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
