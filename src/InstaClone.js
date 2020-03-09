import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import UserPic from "./UserPic";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { initialState } from "./picData";
import DoubleClick from "react-native-double-click";
import * as Animatable from "react-native-animatable";

const AnimatedIcon = Animatable.createAnimatableComponent(MaterialIcon);
const dimensions = Dimensions.get("window");
const imageWidth = Math.floor(dimensions.width);
const border = {
  borderWidth: 1,
  borderColor: "white"
};
const pulse = {
  0: { scale: 0.5 },
  1: { scale: 1 }
};

const InstaClone = () => {
  const [state, setState] = useState({
    picData: initialState(3),
    liked: false,
    animation: null
  });
  const handleTextRef = useRef(null);
  const { picData, liked, animation } = state;

  const handleDoublePress = () => {
    setTimeout(() => {
      setState({ liked: true });
      handleTextRef.current.animate({
        0: { scale: 0.5 },
        1: { scale: 1 }
      });
    }, 200);
  };
  const handlePress = () => {
    setState({ liked: !liked });
    handleTextRef.current.animate({
      0: { scale: 0.5 },
      1: { scale: 1 }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Nav}>
        <Text style={{ color: "white" }}>Instagram</Text>
      </View>

      <View style={{ flex: 9, width: "100%" }}>
        <UserPic
          handleDoublePress={handleDoublePress}
          handlePress={handlePress}
          handleTextRef={handleTextRef}
          liked={liked}
        />
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

export default InstaClone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop: 20,
    backgroundColor: "#2f2f2f"
  },
  Nav: {
    flex: 1,
    width: "100%",
    height: 40,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center"
  },

  footer: {
    flex: 1,
    width: "100%",
    height: 40,
    borderTopColor: "#737373",
    borderTopWidth: StyleSheet.hairlineWidth
  }
});
