import React, { useEffect, useState } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";

const Ball = () => {
  const [position] = useState<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  useEffect(() => {
    Animated.spring(position, {
      toValue: {
        x: 200,
        y: 500
      },
      useNativeDriver: false
    }).reset();
    Animated.spring(position, {
      toValue: {
        x: 200,
        y: 500
      },
      useNativeDriver: false
    }).start();
  }, []);
  return (
    <View>
      <Animated.View style={position.getLayout()}>
        <View style={styles.ball}></View>
      </Animated.View>
    </View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 5000,
    borderColor: "black",
    borderWidth: 30
  }
});
