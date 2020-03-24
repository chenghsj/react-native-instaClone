import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";

const pulse = {
  0: { scale: 0.5 },
  1: { scale: 1 }
};

const iconMap = (routeName, focused, stateIndex, iconRef) => {
  let useIconRef;
  const iconStyle = {
    fontSize: 30,
    color: "white"
  };
  let iconName;
  if (routeName === "Main") {
    iconName = focused ? "home" : "home-outline";
    useIconRef = focused ? iconRef : null;
    return (
      <Animatable.Text duration={200} ref={useIconRef}>
        <MaterialCommunityIcons name={iconName} style={iconStyle} />
      </Animatable.Text>
    );
  } else if (routeName === "PersonalProfile") {
    iconName = focused ? "person" : "person-outline";
    useIconRef = focused ? iconRef : null;
    return (
      <Animatable.Text duration={200} ref={useIconRef}>
        <MaterialIcon name={iconName} style={iconStyle} />
      </Animatable.Text>
    );
  }
};

function MyTabBar(props) {
  const iconRef = useRef(null);
  const { state, navigation } = props;
  console.log("navigation: ", navigation);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        borderTopColor: "#737373",
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: "#2f2f2f"
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          //   if (isFocused) {
          //     iconRef.current.animate(pulse);
          //   }
          navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center" }}
            key={route.key}
          >
            {iconMap(route.name, isFocused, state.index, iconRef)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
