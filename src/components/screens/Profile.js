import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/IMG_7386.png")}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
