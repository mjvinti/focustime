import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../components/RoundedButton';

import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="What would you like to focus on?"
          onChangeText={setSubject}
          style={styles.textInput}
          value={subject}
        />
        <View style={styles.button}>
          <RoundedButton onPress={() => addSubject(subject)} size={50} title="+" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  container: {},
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
});
