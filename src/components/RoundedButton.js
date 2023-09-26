import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/colors';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  if (props.pause) {
    return (
      <TouchableOpacity
        style={[styles(size).radius, style]}
        onPress={props.onPress}>
        <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        <Text style={[styles(size).textSub, textStyle]}>{props.pause}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles(size).radius, style]}
        onPress={props.onPress}>
        <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderWidth: 2,
  },
  text: { color: Colors.white, fontSize: size / 3 },
  textSub: { color: Colors.white, fontSize: size / 6 },
});
