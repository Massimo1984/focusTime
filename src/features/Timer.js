import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { Colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from '../components/Timing';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

const PATTERNR = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(2/60);
  const [duration, setDuration] = useState(4/60);
  const [rest, setRest] = useState(1/60);
  const onEnd = () => {
    // reset is not visible in here but passing this as a function to Countdown where reset is defined allows to access to it
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    onTimerEnd({subject:focusSubject, duration:duration});
   // reset();
  };
  const onGoing = () => {
    // reset is not visible in here but passing this as a function to Countdown where reset is defined allows to access to it
    Vibration.vibrate(PATTERNR);
    setIsStarted(true);
    setProgress(1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Text style={styles.subcountdown}>
          <Countdown
            minutes={minutes}
            isPaused={!isStarted}
            onProgress={setProgress}
            progress={progress}
            onEnd={onEnd}
            onGoing={onGoing}
            duration={duration}
            rest={rest}
          />
        </Text>
        <View style={styles.countdown}>
          <Text style={styles.title}>Focusing on </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={progress * minutes * 60 < 6 ? Colors.red : Colors.progressBar}
          style={{ height: spacing.xl }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing
          onChangeTime={(arrayIn) => {
            setMinutes(arrayIn[1]);
            setDuration(arrayIn[0]);
            setRest(arrayIn[2]);
          }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={!isStarted ? 'start' : 'pause'}
          style={{ borderColor: Colors.dark }}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  countdown: {
    flex: 0.6,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: 0,
  },
  buttonWrapper: {
    flex: 0.4,
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  task: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  timingWrapper: {
    flex: 0.1,
    padding: spacing.xl,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  clearWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  subcountdown: { textAlign: 'center', flexWrap: 'wrap' },
});
