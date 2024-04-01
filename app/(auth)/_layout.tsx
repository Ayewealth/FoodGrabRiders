import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="otp"
        options={{ headerShown: true, headerShadowVisible: false, title: "" }}
      />
    </Stack>
  );
};
export default AuthLayout;
