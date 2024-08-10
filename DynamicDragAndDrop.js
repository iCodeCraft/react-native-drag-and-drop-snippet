import {View, StatusBar} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DragAndDrop = ({width = 150, height = 150}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}, {translateY: y.value}],
  }));

  const path = useAnimatedProps(() => {
    return {
      d: `
        M0,${height}
        Q${width / 4},${height} ${width},${height}
        Q${width},${height / 2} ${width},0
        Q${width / 2},0 0,0
        Q0,${height / 2} 0,${height}
        Z
      `,
    };
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar hidden />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={animatedStyle}>
          <Svg width={width} height={height}>
            <AnimatedPath animatedProps={path} />
          </Svg>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default DragAndDrop;
