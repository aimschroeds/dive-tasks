import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import Styles from '../styles/Styles';

const Notes = ({ notes, updateNotes }) => {
    const [inputNotes, setInputNotes] = useState('');

    useEffect(() => {
        if (Array.isArray(notes)) {
            setInputNotes(notes.join('\n'));
        } else {
            setInputNotes(notes);
        }
    }, [notes]);

    const handleBlur = () => {
        updateNotes(inputNotes);
    };

  return (
    <View style={Styles.notesContainer}>
      <Text style={Styles.notesTitle}>Notes:</Text>
      <TextInput
        testID='notes-input'
        style={Styles.notesInput}
        value={inputNotes}
        onChangeText={(text) => setInputNotes(text)}
        onBlur={handleBlur}
        multiline
        textAlignVertical='top'
      />
    </View>
  );
};

export default Notes;
