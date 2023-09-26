import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes';
import { Colors } from '../utils/colors';

export const FocusHistory = ({ history,totalTrain }) => {
  // if (!history || !history.length) return null;
  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>Training history</Text>
        </View>
        <View>
          <Text style={styles.itemTop}>
            {(totalTrain<1? `You've trained for ${Math.round(totalTrain*60)} sec` : `You've trained for ${Math.round(totalTrain)} min`)}
          </Text>
        </View>
        <View><FlatList data={history} renderItem={renderItem} /></View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.progressBar,
  },
  item: {
    fontSize: fontSizes.md,
    color: Colors.white,
    paddingTop: fontSizes.sm,
  },
  itemTop: {
    fontWeight:'bold',
    paddingLeft: fontSizes.md,
    fontSize: fontSizes.md,
    color: Colors.white,
    paddingTop: fontSizes.sm,
  },
  inputContainer: {
    // justifyContent: 'flex-start',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
