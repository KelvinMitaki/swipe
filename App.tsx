import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card, Image } from "react-native-elements";
import Deck from "./components/Deck";
const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri:
      "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
  },
  {
    id: 2,
    text: "Card #2",
    uri:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
  },
  {
    id: 3,
    text: "Card #3",
    uri:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
  },
  {
    id: 4,
    text: "Card #4",
    uri:
      "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=889&q=80"
  },
  {
    id: 5,
    text: "Card #5",
    uri:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80"
  },
  {
    id: 6,
    text: "Card #6",
    uri:
      "https://images.unsplash.com/photo-1573053986275-840ffc7cc685?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
  },
  {
    id: 7,
    text: "Card #7",
    uri:
      "https://images.unsplash.com/photo-1542729716-6d1890d980ee?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 8,
    text: "Card #8",
    uri:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];
export default function App() {
  const renderCard = (item: { id: number; text: string; uri: string }) => {
    return (
      <Card>
        <Image
          source={{ uri: item.uri }}
          resizeMode="cover"
          style={{ height: 200, width: "100%" }}
        />
        <Card.Divider />
        <Text>{item.text}</Text>
        <Button title="Tap Here" onPress={() => {}} />
      </Card>
    );
  };
  return (
    <View>
      <StatusBar style="auto" />
      <Deck renderCard={renderCard} DATA={DATA} />
    </View>
  );
}

const styles = StyleSheet.create({});
