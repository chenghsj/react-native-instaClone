import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Footer from "./src/components/screens/Footer";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";

const fetchFonts = () => {
  return Font.loadAsync({
    "grand-hotel": require("./assets/fonts/GrandHotel-Regular.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer style={styles.container}>
      {/* <StackNav /> */}
      <Footer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
