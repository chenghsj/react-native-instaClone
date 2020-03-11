import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  RefreshControl
} from "react-native";
import PostFeed from "./components/container/PostFeed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { initialState } from "./initialData";

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const InstaClone = () => {
  const ScrollToTopRef = useRef(null);
  const [state, setState] = useState({
    initialData: initialState(5),
    refreshing: false
  });
  const { initialData, refreshing } = state;
  const onRefresh = React.useCallback(() => {
    setState({ refreshing: true, loading: true });
    wait(2000).then(() =>
      setState({
        initialData: initialState(5),
        refreshing: false
      })
    );
  }, [refreshing]);
  const goToTop = () => {
    ScrollToTopRef.current.scrollTo({ x: 0, y: 0 });
  };

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
      <View style={styles.footer}>
        <MaterialCommunityIcons
          onPress={goToTop}
          name="home"
          color="white"
          size={30}
        />
        <MaterialIcon name="person-outline" color="white" size={30} />
      </View>
    </View>
  );
};

export default InstaClone;

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
    flexDirection: "row",
    width: "100%",
    borderTopColor: "#737373",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-around"
  }
});
