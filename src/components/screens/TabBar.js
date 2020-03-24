import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback, Animated } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackScreen, ProfileStackScreen } from "./StackNav";
import MyTabBar from "./MyTabBar";
import Icon from "../../Icon";

const AnimMaterialCommunityIcons = Animatable.createAnimatableComponent(
  MaterialCommunityIcons
);
const pulse = {
  0: { scale: 0.7 },
  1: { scale: 1 }
};
const Tab = createBottomTabNavigator();

const TabBar = () => {
  const IconRef = useRef(null);
  const [state, setState] = useState({
    selected: false
  });
  const { selected } = state;
  const handlePress = () => {
    setState({ selected: !selected });
    IconRef.current.animate(pulse);
  };
  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
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
        inActiveTintColor: "white",
        style: {
          borderTopColor: "#737373",
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: "#2f2f2f"
        }
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStackScreen}
        // options={{
        //   tabBarIcon: ({ focused, color, size }) => {
        //     return <Icon name="Home" focused={focused} color={color} />;
        //   }
        // }}
      />
      <Tab.Screen
        name="PersonalProfile"
        component={ProfileStackScreen}
        // options={{
        //   tabBarIcon: ({ focused, color, size }) => {
        //     return <Icon name="person" focused={focused} color={color} />;
        //   }
        // }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
