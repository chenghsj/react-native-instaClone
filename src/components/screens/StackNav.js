import React from "react";
import { StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainFeed, UserProfile, PersonalProfile } from "./index";
import { PersonalProfileState } from "../../initialData";

const MainStack = createStackNavigator();

export const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        options={{
          headerMode: "screen",
          headerTitle: "InstaClone",
          headerStyle: {
            backgroundColor: "#2f2f2f",
            borderBottomColor: "#737373"
          },
          headerTitleStyle: {
            fontFamily: "grand-hotel",
            color: "white",
            fontSize: 25
          }
        }}
      >
        {props => <MainFeed {...props} Num={5} />}
      </MainStack.Screen>
      <MainStack.Screen
        name="UserProfile"
        options={({ route }) => {
          return {
            headerMode: "screen",
            headerTitle: route.params.username,
            headerTitleStyle: {
              fontWeight: "normal",
              color: "white",
              fontSize: 20
            },
            headerStyle: {
              backgroundColor: "#2f2f2f",
              borderBottomColor: "#737373"
            },
            headerBackTitleVisible: false,
            headerTintColor: "white"
          };
        }}
      >
        {props => <UserProfile {...props} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          headerMode: "screen",
          headerStyle: {
            backgroundColor: "#2f2f2f",
            borderBottomColor: "#737373"
          },
          headerTitle: "PersonalProfile",
          headerTitleStyle: {
            color: "white",
            fontSize: 20
          }
        }}
        name="PersonalProfile"
      >
        {props => <PersonalProfile {...props} Num={12} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};
