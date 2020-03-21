import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackScreen, ProfileStackScreen } from "./StackNav";

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
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
          } else if (route.name === "PersonalProfile") {
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
          backgroundColor: "#2f2f2f",
          borderTopColor: "#737373"
        }
      }}
    >
      <Tab.Screen name="Main" component={MainStackScreen} />
      <Tab.Screen name="PersonalProfile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default Footer;
