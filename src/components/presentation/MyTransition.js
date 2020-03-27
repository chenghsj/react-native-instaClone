import {
  TransitionSpecs,
  HeaderStyleInterpolators
} from "@react-navigation/stack";

export default MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade
};
