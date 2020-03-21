// import uuid from "uuid/v4";
import UsernameGenerator from "username-generator";
import axios from "axios";
const randNum = () => Math.floor(Math.random() * 500);

const unSplashAPI = "https://api.unsplash.com";
const API_Key = "rTra04KeU3kkcbbHSMPVd7opKpVNUHMbCBMilTPvh4A";
const unSplashRandom = `${unSplashAPI}/photos/random`;
const unSplashProfileUser = `${unSplashAPI}/users/nate_dumlao/photos`;

const getRandArray = Num => {
  let randSet = new Set();
  let randArray = [];
  while (randSet.size < Num) {
    randSet.add(randNum());
  }
  randArray = [...randSet];
  return randArray;
};

const getRandPhotos = async Num => {
  try {
    const res = await axios.get(unSplashRandom, {
      params: {
        client_id: API_Key,
        count: Num
      }
    });
    const data = res.data;
    // console.log(data);
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

const initialState = async Num => {
  const results = await getRandPhotos(Num);
  const randNumArray = getRandArray(Num);
  return randNumArray.map((value, index) => ({
    avatar: results[index].user.profile_image.large,
    img: results[index].urls.small,
    id: results[index].id,
    key: results[index].id,
    likes: results[index].likes,
    username: results[index].user.username,
    description: results[index].description
  }));
};

// ----------------------------------------------------------------

const getPersonalProfilePhotos = async Num => {
  try {
    const photo = await axios.get(unSplashProfileUser, {
      params: {
        client_id: API_Key,
        per_page: Num
      }
    });
    const user = await axios.get(`${unSplashAPI}/users/nate_dumlao`, {
      params: {
        client_id: API_Key
      }
    });
    const photoData = photo.data;
    const userData = user.data;
    return [photoData, userData];
  } catch (err) {
    console.log("Error: ", err);
  }
};

const PersonalProfileState = async Num => {
  const [photoResults, userResults] = await getPersonalProfilePhotos(Num);
  const randNumArray = getRandArray(Num);
  return randNumArray.map((value, index) => ({
    username: userResults.username,
    avatar: userResults.profile_image.large,
    photos: userResults.total_photos,
    followers: userResults.followers_count,
    following: userResults.following_count,
    img: photoResults[index].urls.small,
    id: photoResults[index].id,
    key: photoResults[index].id,
    description: photoResults[index].description
  }));
};

// ----------------------------------------------------------------

const getUserProfilePhotos = async (Num, username) => {
  try {
    const photo = await axios.get(`${unSplashAPI}/users/${username}/photos`, {
      params: {
        client_id: API_Key,
        per_page: Num
      }
    });
    const user = await axios.get(`${unSplashAPI}/users/${username}`, {
      params: {
        client_id: API_Key
      }
    });
    const photoData = photo.data;
    const userData = user.data;
    // console.log(userData);
    return [photoData, userData];
  } catch (err) {
    console.log("Error: ", err);
  }
};

const UserProfileState = async (Num, username) => {
  const [photoResults, userResults] = await getUserProfilePhotos(Num, username);
  const randNumArray = getRandArray(Num);
  return randNumArray.map((value, index) => ({
    username: userResults.username,
    avatar: userResults.profile_image.large,
    photos: userResults.total_photos,
    followers: userResults.followers_count,
    following: userResults.following_count,
    img: photoResults[index].urls.small,
    id: photoResults[index].id,
    key: photoResults[index].id,
    description: photoResults[index].description
  }));
};

export { initialState, randNum, PersonalProfileState, UserProfileState };
