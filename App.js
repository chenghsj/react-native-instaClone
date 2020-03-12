import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import InstaClone from "./src/InstaClone";
import * as Font from "expo-font";
import { MainFeed, Profile } from "./src/components/screens/index";
import { AppLoading } from "expo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 30;
            if (route.name === "Main") {
              iconName = focused ? "home" : "home-outline";
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
              return <MaterialIcon name={iconName} size={size} color={color} />;
            }
          }
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "white",
          inactiveTintColor: "white",
          style: {
            backgroundColor: "#2f2f2f"
          }
        }}
      >
        <Tab.Screen name="Main" component={MainFeed} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
