import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ball from "./components/Ball";

export default function App() {
  return (
    <View>
      <Ball />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({});
