import React, { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { PersonalProfileState } from "../../initialData";
import ProfileImage from "../presentation/ProfileImage";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image
} from "react-native";

const PersonalProfile = props => {
  const goToTopRef = useRef(null);
  const [state, setState] = useState({
    initialData: [],
    username: "",
    avatar: "",
    photos: "",
    followers: "",
    following: ""
  });
  const { initialData, username, avatar, photos, followers, following } = state;
  const { Num } = props;

  const fetchData = async () => {
    const personalProfilePhoto = await PersonalProfileState(Num);
    const {
      avatar,
      username,
      photos,
      followers,
      following
    } = personalProfilePhoto[0];
    setState({
      initialData: personalProfilePhoto,
      avatar,
      username,
      photos,
      followers,
      following
    });
  };
  // console.log(initialData);

  useEffect(() => {
    fetchData();
  }, []);

  useScrollToTop(goToTopRef);

  return (
    <View style={styles.container}>
      <ScrollView ref={goToTopRef} style={{ width: "100%", height: "100%" }}>
        <View style={styles.info}>
          <Image
            source={require("../../../assets/avatar.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white" }}>{photos}</Text>
              <Text style={{ color: "white" }}>Posts</Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 10 }}>
              <Text style={{ color: "white" }}>{followers}</Text>
              <Text style={{ color: "white" }}>Followers</Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 10 }}>
              <Text style={{ color: "white" }}>{following}</Text>
              <Text style={{ color: "white" }}>Following</Text>
            </View>
          </View>
        </View>
        <Text style={{ color: "white", marginLeft: 25, marginBottom: 20 }}>
          Username
        </Text>
        <View style={styles.imageList}>
          <FlatList
            horizontal={false}
            numColumns={3}
            data={initialData}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <ProfileImage
                {...item}
                // avatar={item.avatar}
                // id={item.id}
                // likes={item.likes}
                // key={item.key}
                // username={item.username}
                // img={item.img}
                // description={item.description}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#2f2f2f"
  },
  info: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2f2f2f",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15
  },
  imageList: {
    flex: 5,
    width: "100%",
    height: "100%"
  }
});
