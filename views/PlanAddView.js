import Styles from "../styles/Styles";
import { navigation } from "@react-navigation/native";
import { KeyboardAvoidingView, View, Text, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import React, { useState } from "react";

const PlanAddView = ({ navigation }) => {
    const [plan, setPlan] = useState({
        title: "",
        complete: false,
        milestones: [],
    });

    setTitle = (text) => {
        setPlan({ ...plan, title: text });
    };

    return (
    <KeyboardAvoidingView style={Styles.container}>
        <TableView hideSeparator> 
            <Section hideSeparator hideSurroundingSeparators>
                <Cell
                    cellAccessoryView={
                        <TextInput
                            placeholder="Certification You Are Pursuing"
                            // style={Styles.input}
                            value={plan.title}
                            onChangeText={(text) => setTitle(text)}
                            autoFocus={true}
                            autoCapitalize="words"
                        ></TextInput>
                    }
                    title="Goal"
                    titleTextColor={"purple"}
                    titleTextStyle={Styles.cellTitleText}
                    hideSeparator={true}
                    cellStyle="RightDetail"
                >
                </Cell>
                </Section>
        </TableView>
    </KeyboardAvoidingView>
    )}

export default PlanAddView;