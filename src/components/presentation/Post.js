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
const pulseNew = {
  0: { scale: 0.5, opacity: 0 },
  0.3: { scale: 1.2, opacity: 1 },
  0.6: { scale: 0.9, opacity: 1 },
  0.7: { scale: 1, opacity: 1 },
  0.9: { scale: 1, opacity: 1 },
  1: { scale: 1, opacity: 1 }
};
const rowHeight = config.styleConstants.rowHeight;
const paddingHorizontal = config.styleConstants.paddingHorizontal;
const AnimMaterialCommunityIcons = Animatable.createAnimatableComponent(
  MaterialCommunityIcons
);

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
      heartIconRef.current.animate(pulseNew, 1000);
      picHeartIconRef.current.animate(
        { ...pulseNew, 1: { scale: 1, opacity: 0 } },
        1000
      );
    }, 200);
  };

  const handleHeartPress = () => {
    setState({ ...state, liked: !liked });
    heartIconRef.current.animate(pulseNew, 1000);
  };
  const handleBookmarkPress = () => {
    setState({ ...state, isBookmarked: !isBookmarked });
    bookmarkIconRef.current.animate(pulse, 200);
  };

  return (
    <View style={{ marginVertical: 6 }}>
      <View style={styles.userBar}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.push("UserProfile", { username, avatar });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.avatar}
              source={{
                uri: avatar
              }}
            />
            <Text style={styles.username}>{username}</Text>
          </View>
        </TouchableWithoutFeedback>
        <IonIcon name="ios-more" size={20} color="white" />
      </View>
      <DoubleClick onClick={handleDoublePress}>
        {isShow && (
          <AnimMaterialCommunityIcons
            name="heart"
            ref={picHeartIconRef}
            style={styles.picLikedHeartIcon}
          />
        )}
        <Image style={styles.img} source={{ uri: img }} />
      </DoubleClick>
      <View style={styles.userFooter}>
        <View style={{ flexDirection: "row" }}>
          <AnimMaterialCommunityIcons
            onPress={handleHeartPress}
            ref={heartIconRef}
            style={liked ? styles.likedHeartIcon : styles.icon}
            name={liked ? "heart" : "heart-outline"}
          />
          <MaterialCommunityIcons style={styles.icon} name="comment-outline" />
          <MaterialCommunityIcons style={styles.icon} name="send" />
        </View>
        <View>
          <AnimMaterialCommunityIcons
            onPress={handleBookmarkPress}
            ref={bookmarkIconRef}
            style={[
              isBookmarked ? styles.isBookmarkedIcon : styles.icon,
              { marginRight: 0 }
            ]}
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
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
  username: {
    color: "white",
    fontSize: 15,
    width: imageWidth / 1.6
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
  picLikedHeartIcon: {
    fontSize: 80,
    color: "white",
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
    top: "40%"
  },
  likedHeartIcon: {
    fontSize: 30,
    marginRight: 10,
    color: "#f64d6e"
  },
  isBookmarkedIcon: {
    fontSize: 30,
    color: "yellow"
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
