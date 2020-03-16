import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainFeed, Profile } from "./index";

const MainStack = createStackNavigator();

export const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainFeed}
        options={{
          headerMode: "screen",
          headerShown: false
        }}
      />
    </MainStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};
