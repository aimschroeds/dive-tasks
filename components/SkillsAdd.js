import { FlatList, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";
import React, { useState } from "react";

import Styles from "../styles/Styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SkillsAdd = ({ skills, setSkills }) => {
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() !== "") {
            setSkills([...skills, { skill: newSkill, status: false }]);
            setNewSkill("");
        }
    };

    return (
        <Section hideSeparator hideSurroundingSeparators withSafeAreaView>
            <Cell
                cellAccessoryView={
                  <View style={[Styles.row]}>
                    <TextInput
                        style={Styles.skillInput}
                        placeholder="Skill"
                        value={newSkill}
                        onChangeText={(text) => setNewSkill(text)}
                        onSubmitEditing={addSkill}
                        returnKeyType="done"
                    />
                    <TouchableOpacity
                        style={Styles.addButton}
                        onPress={addSkill}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: 'white', marginRight: 5 }}>Add</Text>
                            <MaterialCommunityIcons name="book-plus" size={20} color="white" />               
                        </View>
                    </TouchableOpacity>
                </View>
                }
                hideSeparator={true}
            />
            {skills.length > 0 && (
                <Cell
                    cellContentView={
                        <View style={{ flexDirection: "column", alignItems: "flex-start", marginTop: 8 }}>
                            {skills.map((item) => (
                                <View
                                    key={item.skill}
                                    style={[
                                        Styles.row,
                                        { alignItems: "center", marginVertical: 8 },
                                    ]}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSkills(skills.filter((skill) => skill !== item));
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="delete"
                                            size={20}
                                            color="#AA77FF"
                                        />
                                    </TouchableOpacity>
                                    <Text style={[Styles.skillText, { marginLeft: 8 }]}>
                                        {item.skill}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    }
                    hideSeparator={true}
                ></Cell>
            )}
        </Section>
    );
};

export default SkillsAdd;
