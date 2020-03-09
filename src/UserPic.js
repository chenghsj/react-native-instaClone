import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DoubleClick from "react-native-double-click";
import * as Animatable from "react-native-animatable";

const AnimatedIcon = Animatable.createAnimatableComponent(MaterialIcon);
// const pulse = {
//   0: { scale: 0.5 },
//   1: { scale: 1 }
// };
const dimensions = Dimensions.get("window");
const imageWidth = Math.floor(dimensions.width);

const UserPic = props => {
  const { handleDoublePress, handlePress, handleTextRef, liked } = props;
  return (
    <View style={{ flex: 9, width: "100%" }}>
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
              borderRadius: 25,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "#737373"
            }}
            source={{
              uri:
                "https://lh3.googleusercontent.com/M0KMd5NwHGh39NglgZgjATERza1lMfjhnzHyKwkWfeCEYKfUX5GyovgCudQ9MiyMEBKT_3YYKjZnnVSeFJfKQuLUKt0"
            }}
          />
          <Text style={{ color: "white" }}>cheng</Text>
        </View>
        <IonIcon name="ios-more" size={20} color="white" />
      </View>
      <DoubleClick onClick={handleDoublePress}>
        <Image
          style={styles.img}
          source={{
            uri:
              "https://images.unsplash.com/photo-1583608008725-43e9fce45fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
          }}
        />
      </DoubleClick>
      <View style={styles.userFooter}>
        <View style={{ flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animatable.Text
              ref={handleTextRef}
              duration={200}
              style={{ marginRight: 10 }}
            >
              <AnimatedIcon
                onPress={handlePress}
                style={[liked ? styles.likedHeartIcon : styles.icon]}
                name={liked ? "heart" : "heart-outline"}
              />
            </Animatable.Text>
          </TouchableWithoutFeedback>
          <MaterialIcon style={styles.icon} name="comment-outline" />
          <MaterialIcon style={styles.icon} name="send" />
        </View>
        <View>
          <MaterialIcon
            style={[styles.icon, { marginRight: 0 }]}
            name="bookmark-outline"
          />
        </View>
      </View>
    </View>
  );
};

export default UserPic;

const styles = StyleSheet.create({
  userBar: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15
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
    paddingHorizontal: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
