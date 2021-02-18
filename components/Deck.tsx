import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Card } from "react-native-elements";

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
  const [stateindex, setStateIndex] = useState<number>(0);
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
            useNativeDriver: false,
            duration: 300
          }).start(() => onSwipeComplete("right"));
        }
        if (gesture.dx < -SWIPE_THRESHOLD) {
          return Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            useNativeDriver: false,
            duration: 300
          }).start(() => onSwipeComplete("left"));
        }
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    })
  );
  const onSwipeComplete = (direction: "right" | "left") => {
    setStateIndex(i => i + 1);
    position.setValue({ x: 0, y: 0 });
  };
  const renderList = ({
    item,
    index
  }: ListRenderItemInfo<{
    id: number;
    text: string;
    uri: string;
  }>) => {
    if (stateindex > index) {
      return null;
    }
    if (index === stateindex) {
      return (
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
      );
    }
    return <View style={styles.card}>{renderCard(item)}</View>;
  };
  return (
    <View>
      {DATA.length > stateindex ? (
        <FlatList
          data={DATA}
          keyExtractor={i => i.id.toString()}
          renderItem={data => renderList(data)}
        />
      ) : (
        <View style={styles.nocards}>
          <Card>
            <Card.Title>All Done</Card.Title>
            <Card.Divider />
            <Text>There's No More Content Here</Text>
            <Card.Divider />
            <Button title="Get More" onPress={() => setStateIndex(0)} />
          </Card>
        </View>
      )}
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({
  nocards: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  card: {
    position: "absolute"
  }
});
