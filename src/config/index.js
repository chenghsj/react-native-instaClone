export default {
  img: {
    pic: `https://source.unsplash.com/random/${350 * 350}`,
    avatar: `https://i.pravatar.cc/${200}`
  },
  styleConstants: {
    rowHeight: 50,
    paddingHorizontal: 15
  },
  fadeInAnim: {
    0: { backgroundColor: "rgba(3, 3, 3, 0.7)", zIndex: 2 },
    0.9: { backgroundColor: "rgba(3, 3, 3, 0)", zIndex: 2 },
    1: { backgroundColor: "rgba(3, 3, 3, 0)", zIndex: -1 }
  },
  fadeInDuration: 500
};

console.disableYellowBox = true;
