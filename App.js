import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
// import Constants from 'expo-constants';
import { Colors } from './src/utils/colors';
import { Focus } from './src/features/focus';
import { FocusHistory } from './src/features/focusHistory';
import { Timer } from './src/features/Timer';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState();
  //const [history, setHistory] = useState([
  //  { title: 'You trained', duration: 0 },
  // ]);
  const [history, setHistory] = useState([]);
  const [totalTrain, setTotalTrain] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} totalTrain={totalTrain} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            // const subject = { title: subjectT, duration: duration };
            // history[0].duration = history[0].duration + subject.duration;

            setHistory([
              ...history,
              (subject.subject + ': ' + `${subject.duration<1? (Math.round(subject.duration*60)+ ' sec'): (subject.duration+ ' min')}` ),
            ]);
            setTotalTrain(totalTrain + subject.duration);
          }}
          clearSubject={() => {
            setCurrentSubject(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.blue,
  },
});
