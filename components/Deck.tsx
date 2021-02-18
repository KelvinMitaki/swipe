import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  View
} from "react-native";

interface Props {
  DATA: {
    id: number;
    text: string;
    uri: string;
  }[];
  renderCard: (item: { id: number; text: string; uri: string }) => JSX.Element;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const Deck: React.FC<Props> = ({ DATA, renderCard }) => {
  const [position] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [panResponder] = useState<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        // console.log(gesture);
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          return Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            useNativeDriver: false
          }).start();
        }
        if (gesture.dx < -SWIPE_THRESHOLD) {
          return Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            useNativeDriver: false
          }).start();
        }
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    })
  );
  return (
    <View>
      <FlatList
        data={DATA}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item, index }) =>
          index === 0 ? (
            <Animated.View
              style={{
                ...position.getLayout(),
                transform: [
                  {
                    rotate: position.x.interpolate({
                      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
                      outputRange: ["-120deg", "0deg", "120deg"]
                    })
                  }
                ]
              }}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          ) : (
            renderCard(item)
          )
        }
      />
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({});
