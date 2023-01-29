import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Styles from '../styles/Styles';

const Notes = ({ notes, updateNotes }) => {
    const [inputNotes, setInputNotes] = useState(notes);

    const handleBlur = () => {
        updateNotes(inputNotes);
    };

  return (
    <View style={Styles.notesContainer}>
      <Text style={Styles.notesTitle}>Notes:</Text>
      <TextInput
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
