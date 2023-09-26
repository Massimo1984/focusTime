import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { Colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({
  minutes,
  duration,
  rest,
  isPaused,
  onProgress,
  progress,
  onGoing,
  onEnd,
}) => {
  const interval = React.useRef(null); //

  const exercise = React.useRef(null);
  const [ref, setRef] = useState(null);
  const [millis, setMillis] = useState(null);
  const idx1 = React.useRef(null);

  const [id, setId] = useState(
    Math.round(duration / ref) * (1 + (rest > 0 ? 1 : 0))
  );

  const resetq = (time) => {
    exercise.current= !exercise.current;
    if (exercise.current) {
      setMillis(Math.round(minutesToMillis(minutes)));
      setRef(minutes);
      time = millis;
    } else {
      setRef(rest);
      setMillis(Math.round(minutesToMillis(rest)));
      time = millis;
    }
    return time;
  };
  const reset = () => {
    setRef(minutes);
    setMillis(Math.round(minutesToMillis(minutes)));
    idx1.current =
      Math.round(duration / minutes) * (1 + (rest > 0 ? 1 : 0)) - 1;
    return idx1.current;
  };
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        if (idx1.current < 2) {
          idx1.current = reset(idx1.current);
          setRef(minutes);
          onEnd();
          clearInterval(interval.current);
          time = Math.round(minutesToMillis(minutes));
          exercise.current=true;
          // idx1.current=idx1.initialValue;
          return time;
        } else {
          // clearInterval(interval.current);
          // idx1.current = idx1.current - 1;
          // clearInterval(interval.current);
          resetq(time);
          onGoing();
          
          idx1.current = idx1.current - 1;
        }

        return time;
      }
      const timeLeft = time - 1000;
      return Math.round(timeLeft);
    });
  };

  useEffect(() => {
    setMillis(Math.round(minutesToMillis(ref)));
  }, [ref]);

  useEffect(() => {
    onProgress(Math.round(millis) / Math.round(minutesToMillis(ref)));
  }, [millis]);

  useEffect(() => {
    setRef(minutes);
    setMillis(Math.round(minutesToMillis(ref)));

    idx1.current =
      Math.round(duration / minutes) * (1 + (rest > 0 ? 1 : 0)) - 1;
      exercise.current = true
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000); // update  every 1000 ms
    return () => {
      clearInterval(interval.current);
      clearInterval(idx1.current);
    };
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <View>
      <Text style={styles.text}>
        {exercise.current ? (Math.ceil(idx1.current/2)+'T'):(Math.floor(idx1.current/2)+'R')}-{formatTime(minute)}:
        {formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
