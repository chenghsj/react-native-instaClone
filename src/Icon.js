import React from "react";
import { Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const iconStyle = {
  fontSize: 30,
  color: "white"
};
const iconArray = {
  Home: <MaterialCommunityIcons name="home" style={iconStyle} />,
  person: <MaterialIcon name="person" style={iconStyle} />
};

const Icon = props => {
  console.log(props);
  const { name } = props;
  const icon = iconArray[name];
  return <Text>{icon}</Text>;
};

export default Icon;
