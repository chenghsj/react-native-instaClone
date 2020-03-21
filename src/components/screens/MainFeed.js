import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
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

const MainFeed = ({ Num }) => {
  const goToTopRef = useRef(null);
  const [state, setState] = useState({
    initialData: [],
    refreshing: false
  });
  const { initialData, refreshing } = state;
  const fetchData = async () => {
    setState({ initialData: await initialState(Num), refreshing: false });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setState({ refreshing: true });
    fetchData();
  }, [refreshing]);

  useScrollToTop(goToTopRef);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
  }
});
