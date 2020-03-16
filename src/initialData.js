// import uuid from "uuid/v4";
import UsernameGenerator from "username-generator";
import axios from "axios";
const randNum = () => Math.floor(Math.random() * 500);

const API_Key = "whCAHMEOq9fbOsZ9ZG9cYwpTAfV9uLIboZbhHdgpiVg";
const unSplashRandom = "https://api.unsplash.com/photos/random";

const getPhotos = async Num => {
  try {
    const res = await axios.get(unSplashRandom, {
      params: {
        client_id: API_Key,
        count: Num
      }
    });
    const data = res.data;
    // console.log(data[0].alt_description);

    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const getRandArray = Num => {
  let randSet = new Set();
  let randArray = [];
  while (randSet.size < Num) {
    randSet.add(randNum());
  }
  randArray = [...randSet];
  return randArray;
};

const initialState = async Num => {
  const results = await getPhotos(Num);
  const randNumArray = getRandArray(Num);
  return randNumArray.map((value, index) => ({
    avatar: results[index].user.profile_image.small,
    img: results[index].urls.small,
    id: results[index].id,
    key: results[index].id,
    likes: results[index].likes,
    username: results[index].user.username,
    description: results[index].description
  }));
};

export { initialState, randNum };
