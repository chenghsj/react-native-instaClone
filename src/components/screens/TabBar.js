import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { MainStackScreen, ProfileStackScreen } from "./StackNav";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const AnimMaterialCommunityIcons = Animatable.createAnimatableComponent(
  MaterialCommunityIcons
);
const AnimMaterialIcon = Animatable.createAnimatableComponent(MaterialIcon);

const pulse = {
  0: { scale: 0.8 },
  1: { scale: 1 }
};

const Tab = createMaterialBottomTabNavigator();
const TabBar = () => {
  const HomeIconRef = useRef(null);
  const PersonIconRef = useRef(null);

  const handlePress = ref => {
    if (!ref.current) return;
    else ref.current.animate(pulse);
  };

  return (
    <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let icon, iconRef, iconName;
          let size = 30;
          if (route.name === "Main") {
            handlePress(HomeIconRef);
            iconName = focused ? "home" : "home-outline";
            iconRef = focused ? HomeIconRef : null;
            icon = (
              <AnimMaterialCommunityIcons
                ref={iconRef}
                duration={400}
                name={iconName}
                size={size}
                color={color}
              />
            );
            return icon;
          } else if (route.name === "PersonalProfile") {
            handlePress(PersonIconRef);
            iconName = focused ? "person" : "person-outline";
            iconRef = focused ? PersonIconRef : null;
            icon = (
              <AnimMaterialIcon
                ref={iconRef}
                duration={400}
                name={iconName}
                size={size}
                color={color}
              />
            );
            return icon;
          }
        }
      })}
      barStyle={{
        borderTopColor: "#737373",
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#2f2f2f"
      }}
    >
      <Tab.Screen name="Main" component={MainStackScreen} />
      <Tab.Screen name="PersonalProfile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default TabBar;
