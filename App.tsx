import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "./components/Deck";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Deck />
    </View>
  );
}

const styles = StyleSheet.create({});
