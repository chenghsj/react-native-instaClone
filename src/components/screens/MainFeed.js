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
import { useScrollToTop, useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import config from "../../config";

const fadeIn = config.fadeInAnim;

const MainFeed = ({ Num }) => {
  const goToTopRef = useRef(null);
  const MainFeedRef = useRef(null);
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

  useFocusEffect(() => {
    if (refreshing) return;
    MainFeedRef.current.animate(fadeIn);
  }, []);

  const onRefresh = React.useCallback(() => {
    setState({ refreshing: true });
    fetchData();
  }, [refreshing]);

  useScrollToTop(goToTopRef);

  return (
    <Animatable.View
      ref={MainFeedRef}
      duration={1000}
      style={{ width: "100%", height: "100%" }}
    >
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
    </Animatable.View>
  );
};

export default MainFeed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2f2f2f"
  }
});
