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
import Footer from "./Footer";
import { initialState } from "../../initialData";

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const MainFeed = props => {
  const ScrollToTopRef = useRef(null);
  const [state, setState] = useState({
    initialData: initialState(5),
    refreshing: false,
    scrollPosition: null
  });
  const { navigation } = props;
  const { initialData, refreshing, scrollPosition } = state;
  useEffect(() => {
    const goToTop = navigation.addListener("tabPress", e => {
      ScrollToTopRef.current.scrollTo({ x: 0, y: 0 });
    });
    // const currentPosition = navigation.addListener('willBlur', e=> {
    //     const offset = scrollPosition
    //     setTimeout(()=> {
    //         ScrollView.scrollToOffset({offset, animated: false})
    //     })
    // })
    return goToTop;
  }, [navigation]);
  const handleScrollPosition = e => {
    setState({ scrollPosition: e.nativeEvent.contentOffset.y });
  };
  const onRefresh = React.useCallback(() => {
    setState({ refreshing: true, loading: true });
    wait(2000).then(() =>
      setState({
        initialData: initialState(5),
        refreshing: false
      })
    );
  }, [refreshing]);

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
          //   onScroll={handleScrollPosition}
          ref={ScrollToTopRef}
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
