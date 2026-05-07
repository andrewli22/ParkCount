import { useThemeStyles } from '@/utils/themeStyles';
import React, { useContext, useState, useCallback } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { sendFeedback } from '@/utils/api';
import { useFocusEffect } from 'expo-router';


export default function IssuesScreen() {
  const data = [
    'The error that appeared',
    'Where you saw the error',
  ]
  const themeStyle = useThemeStyles();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [subject, setSubject] = useState<string>('');
  const [issue, setIssue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSendIssue = async () => {
    const subjectInput = subject.trim();
    const issueInput = issue.trim();
    if (!subjectInput || !issueInput || subjectInput.length < 1 || issueInput.length < 1) {
      setErrorMessage('Please fill in all the fields before submitting');
      return;
    }
    setErrorMessage('');
    try {
      await sendFeedback(`BUG: ${subjectInput}`, issueInput);
      Alert.alert(
        'Success',
        'Issue successfully. A team member will review it soon!',
        [{ text: 'OK', onPress: () => {
          setSubject('');
          setIssue('');
        }}]
      );
    } catch (error) {
      console.error('API error sending issue - frontend', error);
      setErrorMessage('Failed to send issue. Please try again.');
    }
  }

  useFocusEffect(
    useCallback(() => {
      setErrorMessage('');
      setIssue('');
      setSubject('');
    }, [])
  );

  return (
    <View style={[themeStyle.background, { flex: 1 }]}>
      {/* Information on reporting issue */}
      <View style={{ margin: 20 }}>
        <Text style={[themeStyle.textColor, { fontSize: 15, marginBottom: 10 }]}>Please include as much detail as possible to help diagnose and resolve the issue. Such as:</Text>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 5 }}>
                  <Text style={[themeStyle.textColor, { fontSize: 15 }]}>{`\u2022 ${item}`}</Text>
                </View>
              )
            }}
          />
        </View>
      </View>
      {/* User Inputs */}
      <View style={{ marginHorizontal: 20 }}>
        <TextInput
          placeholderTextColor={themeStyle.textColor.color}
          placeholder="Subject"
          style={[styles.textInputStyles, themeStyle.borderColor, themeStyle.textColor, { marginBottom: 10 }]}
          onChangeText={setSubject}
          value={subject}
        />
        <TextInput
          key={theme}
          placeholderTextColor={themeStyle.textColor.color}
          multiline
          placeholder="Describe the issue"
          style={[styles.textInputStyles, themeStyle.borderColor, themeStyle.textColor, { height: 200, marginBottom: 10, textAlignVertical: 'top' }]}
          onChangeText={setIssue}
          value={issue}
        />
        <TouchableOpacity style={[styles.submitButtonContainer, { backgroundColor: theme === 'dark' ? '#007AFF' : '#34CEFF' }]} onPress={() => handleSendIssue()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {/* Error message */}
        {errorMessage && (
          <Text style={[{ color: 'red', textAlign: 'center', marginTop: 10 }]}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  submitButtonContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 25
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16
  }
})