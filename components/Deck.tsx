import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Props {
  DATA: {
    id: number;
    text: string;
    uri: string;
  }[];
  renderCard: (item: { id: number; text: string; uri: string }) => JSX.Element;
}

const Deck: React.FC<Props> = ({ DATA, renderCard }) => {
  return (
    <View>
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
