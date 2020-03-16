import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl
} from "react-native";
import PostFeed from "../container/PostFeed";
import { initialState } from "../../initialData";
import { useScrollToTop } from "@react-navigation/native";

// const wait = timeout => {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// };

const MainFeed = () => {
  const goToTopRef = React.useRef(null);
  const [state, setState] = useState({
    initialData: [],
    refreshing: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ initialData: await initialState(5), refreshing: false });
    };
    fetchData();
  }, []);

  const { initialData, refreshing } = state;

  const onRefresh = React.useCallback(() => {
    setState({ refreshing: true });
    const fetchData = async () => {
      const photos = await initialState(5);
      setState({ initialData: photos, refreshing: false });
    };
    fetchData();
  }, [refreshing]);

  useScrollToTop(goToTopRef);

  // console.log(initialData);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.Nav}>
        <Text
          style={{
            fontFamily: "grand-hotel",
            color: "white",
            fontSize: 25
          }}
        >
          InstaClone
        </Text>
      </View>
      <View style={styles.posts}>
        <ScrollView
          ref={goToTopRef}
          refreshControl={
            <RefreshControl
              tintColor="white"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <PostFeed initialData={initialData} />
        </ScrollView>
      </View>
      {/* <View style={styles.footer}>
        <Footer goToTop={goToTop} />
      </View> */}
    </View>
  );
};

export default MainFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#2f2f2f"
  },
  Nav: {
    flex: 0.8,
    width: "100%",
    marginTop: 20,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center"
  },
  posts: {
    flex: 9,
    width: "100%"
  },
  footer: {
    flex: 0.8,
    width: "100%"
  }
});
