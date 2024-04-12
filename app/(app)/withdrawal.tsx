import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";

const withdrawal = () => {
  const [banks, setBanks] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState();
  const [amount, setAmount] = useState("");
  const [bottomSheet, setBottomSheet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const bank_key = process.env.EXPO_BANKS_API_KEY;
  const verificaiton_key = process.env.EXPO_BANK_VERIFICATION_API_KEY;

  const snapPoint = useMemo(() => ["40%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    setBottomSheet(false);
    setModalVisible(true);
  };
  const handleOpenPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setBottomSheet(true);
  };

  const data = banks.map((bank: any) => ({
    key: `${bank.id}`,
    value: `${bank.name}`,
  }));

  const getBanks = async () => {
    const response: any = await fetch("https://api.paystack.co/bank", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bank_key}`,
      },
    });
    const data = await response.json();
    setBanks(data.data);
  };
  useEffect(() => {
    getBanks();
  }, []);

  const handleBankSelection = (selectedBankName: any) => {
    const selectedBank: any = banks.find(
      (bank: any) => bank.name === selectedBankName
    );
    if (selectedBank) {
      setBankCode(selectedBank.code);
      setBankName(selectedBankName);
    }
  };

  const getAccountName = async () => {
    const response: any = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${verificaiton_key}`,
        },
      }
    );
    const data = await response.json();
    setAccountName(data.data.account_name);
  };

  if (accountNumber.length === 10) {
    getAccountName();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text
          style={{ fontFamily: "Railway2", fontWeight: "600", fontSize: 20 }}
        >
          Withdraw
        </Text>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
              Bank Name
            </Text>
            <SelectList
              setSelected={handleBankSelection}
              fontFamily="Railway2"
              data={data}
              arrowicon={
                <MaterialIcons name="arrow-drop-down" size={19} color="black" />
              }
              searchicon={<EvilIcons name="search" size={19} color="black" />}
              closeicon={
                <AntDesign name="closecircleo" size={19} color="black" />
              }
              boxStyles={styles.selectInput}
              dropdownStyles={styles.dropdown}
              placeholder="Select Bank"
              searchPlaceholder="Search For Your Bank"
              save="value"
              notFoundText=" Getting Data . . ."
            />
          </View>
          <View
            style={{ flexDirection: "column", gap: 10, position: "relative" }}
          >
            <Text style={{ fontFamily: "Railway3", fontSize: 15 }}>
              Account Number
            </Text>
            <TextInput
              value={accountNumber}
              style={styles.inputStyles}
              onChangeText={setAccountNumber}
              placeholder="Enter 10 digits Account Number"
              placeholderTextColor="#11182744"
            />
            {accountName ? (
              <Text
                style={{
                  color: "#54804D",
                  fontFamily: "Railway2",
                  fontSize: 14,
                }}
              >
                {accountName}
              </Text>
            ) : null}
          </View>
          {accountName && (
            <View>
              <TextInput
                value={amount}
                style={styles.inputStyles}
                onChangeText={setAmount}
                placeholder="Enter Amount"
                placeholderTextColor="#11182744"
              />
            </View>
          )}
          {amount && (
            <TouchableOpacity
              onPress={handleOpenPress}
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
                Next
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text
            style={{ color: "#54804D", fontFamily: "Railway2", fontSize: 16 }}
          >
            Beneficiary Accounts
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} scrollEnabled>
            <View
              style={{
                flexDirection: "column",
                gap: 10,
                borderBottomColor: "#10101033",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{
                  color: "#383838",
                  fontFamily: "Railway2",
                  fontSize: 13,
                }}
              >
                Great Adams
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Railway1",
                    color: "#383838",
                  }}
                >
                  0889112857
                </Text>
                <Entypo name="dot-single" size={12} color="#383838" />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Railway1",
                    color: "#383838",
                  }}
                >
                  Access Bank
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        {bottomSheet && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoint}
            style={{ paddingHorizontal: 20 }}
          >
            <View style={{ flexDirection: "column", gap: 15, width: "100%" }}>
              <Text
                style={{
                  color: "#385533",
                  fontFamily: "Railway2",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Confirm Withdrawal
              </Text>
              <View style={{ flexDirection: "column", gap: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={{ fontFamily: "Railway1", fontSize: 13 }}>
                    Bank Name
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontSize: 13,
                      color: "#383838",
                    }}
                  >
                    {bankName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={{ fontFamily: "Railway1", fontSize: 13 }}>
                    Account Number
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontSize: 13,
                      color: "#383838",
                    }}
                  >
                    {accountNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={{ fontFamily: "Railway1", fontSize: 13 }}>
                    Account Name
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontSize: 13,
                      color: "#383838",
                    }}
                  >
                    {accountName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text style={{ fontFamily: "Railway1", fontSize: 13 }}>
                    Amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Railway2",
                      fontSize: 13,
                      color: "#383838",
                    }}
                  >
                    {amount}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleClosePress}
                style={{
                  backgroundColor: "#385533",
                  padding: 20,
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Railway2",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Withdraw Funds
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        )}
      </KeyboardAvoidingView>
      <Modal
        isVisible={modalVisible}
        hasBackdrop
        backdropColor="black"
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
      >
        <View style={styles.modal}>
          <Image
            source={require("../../assets/images/withdrawal pic.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text
            style={{
              color: "#385533",
              fontFamily: "Railway2",
              fontSize: 19,
              textAlign: "center",
            }}
          >
            Congratulations!!!!!!
          </Text>
          <Text
            style={{
              color: "#383838",
              fontFamily: "Railway1",
              fontSize: 15,
              textAlign: "center",
              width: "90%",
              lineHeight: 25,
            }}
          >
            You have successfully withdrawn &#x20A6;{amount} from your account
          </Text>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default withdrawal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  selectInput: {
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: "100%",
  },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 10,
  },
  inputStyles: {
    padding: 15,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: "Railway3",
    textTransform: "capitalize",
    zIndex: 1,
  },
  modal: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
    gap: 15,
    backgroundColor: "#fff",
  },
});
