import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="withdrawal"
        options={{
          headerShadowVisible: false,
          title: "",
        }}
      />
    </Stack>
  );
};

export default AppLayout;
