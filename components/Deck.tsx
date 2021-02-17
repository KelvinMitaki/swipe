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
  const [animated] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [panResponder] = useState<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        // console.log(gesture);
        Animated.spring(animated, {
          toValue: { x: gesture.dx, y: gesture.dy },
          useNativeDriver: false
        }).start();
      },
      onPanResponderRelease: () => {}
    })
  );
  return (
    <View {...panResponder.panHandlers}>
      <FlatList
        data={DATA}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <Animated.View {...animated.getLayout()}>
            {renderCard(item)}
          </Animated.View>
        )}
      />
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({});
