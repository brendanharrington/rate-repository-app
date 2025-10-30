import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;