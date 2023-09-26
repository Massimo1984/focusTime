import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { Colors } from '../utils/colors';
import { RoundedButton } from './RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View>
        <RoundedButton size={75} style={{borderColor: Colors.progressBar}} title="10m" pause="/1m/20s" onPress={() => onChangeTime([10, 1, 20/60])} />
      </View>
      <View>
        <RoundedButton size={75} title="20m" style={{borderColor: Colors.orange}} pause="/2m/30s" onPress={() => onChangeTime([20, 2, 30/60])} />
      </View>
      <View>
        <RoundedButton size={75} title="30m" style={{borderColor: Colors.red}} pause="/3m/60s" onPress={() => onChangeTime([30, 3, 60/60])} />
      </View>
    </>
  );
};
