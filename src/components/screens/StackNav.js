import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  HeaderStyleInterpolators
} from "@react-navigation/stack";
import { MainFeed, UserProfile, PersonalProfile } from "./index";

const config = {
  animation: "timing",
  config: {
    duration: 500
  }
};
const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: config,
    close: config
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.25, 1]
        }),
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9]
                })
              : 1
          }
        ]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5]
        })
      }
    };
  }
};

const headerStyle = {
  backgroundColor: "#2f2f2f",
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#737373",
  shadowOpacity: 0,
  height: 70
};
const MainStack = createStackNavigator();

export const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle,
        safeAreaInsets: { top: 20 },
        cardStyle: { backgroundColor: "#2f2f2f" }
        // ...MyTransition
      }}
    >
      <MainStack.Screen
        name="Main"
        options={{
          headerMode: "screen",
          headerTitle: "InstaClone",
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
          headerStyle,
          headerTitle: "PersonalProfile",
          headerTitleStyle: {
            color: "white",
            fontSize: 20
          },
          safeAreaInsets: { top: 20 }
        }}
        name="PersonalProfile"
      >
        {props => <PersonalProfile {...props} Num={12} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};
