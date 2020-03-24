import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import Modal from "react-native-modal";

const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width * 0.333;

const ProfileImage = props => {
  const [state, setState] = useState({
    isModalVisible: false
  });
  const { isModalVisible } = state;
  const { img, username, avatar } = props;
  const handlePress = () => {
    setState({ isModalVisible: !isModalVisible });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Image style={styles.ProfileImage} source={{ uri: img }} />
      </TouchableWithoutFeedback>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.9}
        onBackdropPress={handlePress}
        swipeDirection={["up", "down"]}
        onSwipeComplete={() => setState({ isModalVisible: false })}
        style={{ alignItems: "center" }}
      >
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.ModalContainer}>
            <View style={styles.ModalHeader}>
              <Image source={{ uri: avatar }} style={styles.ModalAvatar} />
              <Text style={styles.ModalUserName}>{username}</Text>
            </View>
            <Image style={styles.ModalImage} source={{ uri: img }} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
export default ProfileImage;

const styles = StyleSheet.create({
  ProfileImage: {
    width: imageWidth,
    height: imageWidth,
    marginHorizontal: 0.6,
    marginVertical: 0.6
  },
  ModalContainer: {
    backgroundColor: "#2f2f2f",
    borderRadius: 15,
    height: 285
  },
  ModalHeader: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  ModalAvatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5
  },
  ModalUserName: {
    color: "white",
    marginLeft: 10
  },
  ModalImage: {
    resizeMode: "cover",
    width: 250,
    height: 250,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  }
});
