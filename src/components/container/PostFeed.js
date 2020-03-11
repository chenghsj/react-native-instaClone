import React, { useState, useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { initialState, randNum } from "../../initialData";
import Post from "../presentation/Post";

const PostFeed = props => {
  const { initialData } = props;

  return (
    <FlatList
      data={initialData}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <Post
          key={item.key}
          username={item.username}
          img={item.img}
          randNum={randNum()}
        />
      )}
    />
  );
};

export default PostFeed;
