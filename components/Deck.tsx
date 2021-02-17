import React, { useState } from "react";
import { FlatList, PanResponder, StyleSheet, Text, View } from "react-native";

interface Props {
  DATA: {
    id: number;
    text: string;
    uri: string;
  }[];
  renderCard: (item: { id: number; text: string; uri: string }) => JSX.Element;
}

const Deck: React.FC<Props> = ({ DATA, renderCard }) => {
  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        console.log(gesture);
      },
      onPanResponderRelease: () => {}
    })
  );
  return (
    <View {...panResponder.panHandlers}>
      <FlatList
        data={DATA}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => renderCard(item)}
      />
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({});
