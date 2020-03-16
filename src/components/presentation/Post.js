import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import config from "../../config/index";
import DoubleClick from "react-native-double-click";
import * as Animatable from "react-native-animatable";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//square image width
const dimensions = Dimensions.get("window");
const imageWidth = Math.floor(dimensions.width);

const border = {
  borderWidth: 1,
  borderColor: "white"
};
//heartIcon Animation
const pulse = {
  0: { scale: 0.5 },
  1: { scale: 1 }
};
// const defaultPic = config.img.pic;
const defaultAvatar = config.img.avatar;
const rowHeight = config.styleConstants.rowHeight;
const paddingHorizontal = config.styleConstants.paddingHorizontal;

const Post = props => {
  const [state, setState] = useState({
    liked: false,
    isShow: false
  });
  const { liked, isShow } = state;
  const { img, username, likes, avatar, description } = props;

  const handleDoublePress = () => {
    setTimeout(() => {
      setState({ liked: true, isShow: true });
      heartIconRef.current.animate(pulse);
      picHeartIconRef.current.animate({
        0: { scale: 0.5, opacity: 0 },
        0.3: { scale: 1.2, opacity: 1 },
        0.6: { scale: 0.9, opacity: 1 },
        0.7: { scale: 1, opacity: 1 },
        0.9: { scale: 1, opacity: 1 },
        1: { scale: 1, opacity: 0 }
      });
    }, 200);
  };
  const heartIconRef = useRef(null);
  const picHeartIconRef = useRef(null);
  const handlePress = () => {
    setState({ liked: !liked });
    heartIconRef.current.animate({
      0: { scale: 0.5 },
      1: { scale: 1 }
    });
  };
  return (
    <View style={{ width: "100%", marginVertical: 6 }}>
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar
            }}
          />
          <Text style={{ color: "white", fontSize: 15 }}>{username}</Text>
        </View>
        <IonIcon name="ios-more" size={20} color="white" />
      </View>
      <DoubleClick onClick={handleDoublePress}>
        {isShow && (
          <TouchableWithoutFeedback
            style={{ width: imageWidth, height: imageWidth }}
          >
            <Animatable.Text
              ref={picHeartIconRef}
              duration={1000}
              style={{
                position: "absolute",
                alignSelf: "center",
                zIndex: 2,
                top: "40%"
              }}
            >
              <MaterialCommunityIcons
                name="heart"
                style={[styles.icon, { fontSize: 80 }]}
              />
            </Animatable.Text>
          </TouchableWithoutFeedback>
        )}
        <Image style={styles.img} source={{ uri: img }} />
      </DoubleClick>
      <View style={styles.userFooter}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animatable.Text
              ref={heartIconRef}
              duration={200}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                onPress={handlePress}
                style={[liked ? styles.likedHeartIcon : styles.icon]}
                name={liked ? "heart" : "heart-outline"}
              />
            </Animatable.Text>
          </TouchableWithoutFeedback>
          <MaterialCommunityIcons style={styles.icon} name="comment-outline" />
          <MaterialCommunityIcons style={styles.icon} name="send" />
        </View>
        <View>
          <MaterialCommunityIcons
            style={[styles.icon, { marginRight: 0 }]}
            name="bookmark-outline"
          />
        </View>
      </View>
      <View style={styles.commentBar}>
        <Text style={{ color: "white", fontSize: 15 }}>{`${
          liked ? likes + 1 : likes
        } likes`}</Text>
        <Text style={{ color: "white", fontSize: 15, marginTop: 6 }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  userBar: {
    flexDirection: "row",
    width: "100%",
    height: rowHeight,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: paddingHorizontal
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#737373"
  },
  img: {
    width: imageWidth,
    height: imageWidth
  },
  icon: {
    fontSize: 30,
    color: "white",
    marginRight: 10
  },
  likedHeartIcon: {
    fontSize: 30,
    color: "white",
    marginRight: 10,
    color: "#f64d6e"
  },
  userFooter: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: paddingHorizontal,
    height: rowHeight,
    alignItems: "center",
    justifyContent: "space-between"
  },
  commentBar: {
    width: "100%",
    height: rowHeight,
    paddingHorizontal: paddingHorizontal
  }
});
