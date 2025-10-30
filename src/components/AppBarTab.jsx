import { StyleSheet, Pressable } from "react-native";
import { Link } from 'react-router-native';

import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    backgroundColor: theme.colors.appBar,
    padding: 10
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Pressable>
      <Link to={link}>
        <Text style={styles.text}>
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;