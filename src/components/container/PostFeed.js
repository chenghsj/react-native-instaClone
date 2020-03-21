import React from "react";
import { FlatList } from "react-native";
import Post from "../presentation/Post";

const PostFeed = props => {
  const { initialData } = props;
  return (
    <FlatList
      data={initialData}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <Post
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
  );
};

export default PostFeed;
