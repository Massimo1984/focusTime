import React, { useState } from 'react';
import { View, Text, StyleSheet,  StatusBar } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import {spacing} from '../utils/sizes';

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          label="What would you like to train on?"
        />

        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={()=>{addSubject(subject)}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    // justifyContent: 'flex-start',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
