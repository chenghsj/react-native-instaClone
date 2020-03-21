import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width * 0.333;

const ProfileImage = props => {
  const { img, username, likes, avatar, description } = props;
  return (
    <Image
      style={{
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: 0.5,
        marginVertical: 0.5
      }}
      source={{ uri: img }}
    />
  );
};
// https://source.unsplash.com/random/300x300
export default ProfileImage;

const styles = StyleSheet.create({});
