import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
const rowHeight = config.styleConstants.rowHeight;
const paddingHorizontal = config.styleConstants.paddingHorizontal;

const Post = props => {
  const [state, setState] = useState({
    liked: false,
    isBookmarked: false,
    isShow: false
  });
  const { liked, isShow, isBookmarked } = state;
  const { img, username, likes, avatar, description } = props;

  const navigation = useNavigation();
  const heartIconRef = useRef(null);
  const picHeartIconRef = useRef(null);
  const bookmarkIconRef = useRef(null);

  const handleDoublePress = () => {
    setTimeout(() => {
      setState({ ...state, liked: true, isShow: true });
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

  const handleHeartPress = () => {
    setState({ ...state, liked: !liked });
    heartIconRef.current.animate(pulse);
  };
  const handleBookmarkPress = () => {
    setState({ ...state, isBookmarked: !isBookmarked });
    bookmarkIconRef.current.animate(pulse);
  };
  return (
    <View style={{ marginVertical: 6 }}>
      <View style={styles.userBar}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push("UserProfile", { username, avatar });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: avatar
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                width: imageWidth / 2
              }}
            >
              {username}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
          <TouchableWithoutFeedback onPress={handleHeartPress}>
            <Animatable.Text
              ref={heartIconRef}
              duration={200}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                onPress={handleHeartPress}
                style={[liked ? styles.likedHeartIcon : styles.icon]}
                name={liked ? "heart" : "heart-outline"}
              />
            </Animatable.Text>
          </TouchableWithoutFeedback>
          <MaterialCommunityIcons style={styles.icon} name="comment-outline" />
          <MaterialCommunityIcons style={styles.icon} name="send" />
        </View>
        <View>
          <TouchableWithoutFeedback onPress={handleBookmarkPress}>
            <Animatable.Text ref={bookmarkIconRef} duration={200}>
              <MaterialCommunityIcons
                style={[styles.icon, { marginRight: 0 }]}
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
              />
            </Animatable.Text>
          </TouchableWithoutFeedback>
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
