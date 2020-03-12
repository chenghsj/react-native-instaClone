import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const Footer = props => {
  const { goToTop } = props;
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        onPress={goToTop}
        name="home"
        color="white"
        size={30}
      />
      <MaterialIcon name="person-outline" color="white" size={30} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderTopColor: "#737373",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-around"
  }
});
