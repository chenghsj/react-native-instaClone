import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import Overlay from "react-native-modal-overlay";

const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width * 0.333;

const ProfileImage = props => {
  const [state, setState] = useState({
    isScale: false,
    scaleAnim: new Animated.Value(1),
    isOverlay: false
  });
  const { isScale, scaleAnim, isOverlay } = state;
  const { img, username, avatar } = props;
  const handlePress = () => {
    setState({ isOverlay: true });
  };
  const handleClose = () => {
    setState({ isOverlay: false });
  };
  // const handleScaleAnimPress = () => {
  //   setState({ ...state, isScale: !isScale });
  //   isScale
  //     ? Animated.timing(scaleAnim, {
  //         toValue: 2,
  //         duration: 300
  //       }).start()
  //     : Animated.timing(scaleAnim, {
  //         toValue: 1,
  //         duration: 300
  //       }).start();
  // };
  const scaleAnimStyles = {
    transform: [
      {
        scale: scaleAnim
      }
    ]
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {isOverlay ? (
        <>
          <Overlay
            visible={isOverlay}
            onClose={handleClose}
            closeOnTouchOutside
            animationDuration={300}
            animationType="zoomIn"
            containerStyle={{
              backgroundColor: "rgba(0,0,0,0.9)"
            }}
            childrenWrapperStyle={{
              borderRadius: 15,
              width: 250,
              height: 285,
              backgroundColor: "#2f2f2f"
            }}
          >
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Image
                onPress={handleClose}
                source={{ uri: avatar }}
                style={{ width: 25, height: 25, borderRadius: 50 }}
              />
              <Text style={{ color: "white", marginLeft: 10 }}>{username}</Text>
            </View>
            <Image
              style={[
                {
                  resizeMode: "cover",
                  width: 250,
                  height: 250,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15
                }
              ]}
              source={{ uri: img }}
            />
          </Overlay>
          <Image
            style={[
              {
                width: imageWidth,
                height: imageWidth,
                marginHorizontal: 0.5,
                marginVertical: 0.5
              }
            ]}
            source={{ uri: img }}
          />
        </>
      ) : (
        <Image
          style={[
            {
              width: imageWidth,
              height: imageWidth,
              marginHorizontal: 0.5,
              marginVertical: 0.5
            }
          ]}
          source={{ uri: img }}
        />
      )}
    </TouchableWithoutFeedback>
  );
};
// https://source.unsplash.com/random/300x300
export default ProfileImage;

const styles = StyleSheet.create({});
