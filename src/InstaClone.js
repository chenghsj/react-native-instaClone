import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainFeed from "./components/screens/MainFeed";

const InstaClone = () => {
  return (
    <View style={styles.container}>
      <MainFeed />
    </View>
  );
};

export default InstaClone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
