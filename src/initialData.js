// import uuid from "uuid/v4";
import UsernameGenerator from "username-generator";
const randNum = () => Math.floor(Math.random() * 500);

const getRandArray = Num => {
  let randSet = new Set();
  let randArray = [];
  while (randSet.size < Num) {
    randSet.add(randNum());
  }
  randArray = [...randSet];
  return randArray;
};

const initialState = Num => {
  const randNumArray = getRandArray(Num);
  return randNumArray.map(value => ({
    img: `https://source.unsplash.com/random/300x300?${value}`,
    id: value,
    key: value,
    username: UsernameGenerator.generateUsername("_")
  }));
};

export { initialState, randNum };
