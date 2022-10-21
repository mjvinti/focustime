import React, { useState } from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';

import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ clearSubject, focusSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.1);
  const [progress, setProgress] = useState(1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };
  const onPress = isStarted
    ? () => setIsStarted(false)
    : () => setIsStarted(true);
  const title = isStarted ? 'Pause' : 'Start';

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.progressBar}
          progress={progress}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timing}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.button}>
        <RoundedButton title={title} onPress={onPress} />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title='-' onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.md,
  },
  clearSubject: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  countdown: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  timing: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
