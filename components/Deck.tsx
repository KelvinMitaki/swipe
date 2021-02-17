import React, { useState } from "react";
import {
  Animated,
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

const Deck: React.FC<Props> = ({ DATA, renderCard }) => {
  const [position] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [panResponder] = useState<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        // console.log(gesture);
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {}
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
                      inputRange: [-500, 0, 500],
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
