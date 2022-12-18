import { Text, View } from 'react-native';
import StyleSheet from '../styles/StyleSheet';

/**
 * Home screen
 * @param {*} navigation
 * @returns {JSX.Element}
 */

const HomeView = ({ navigation }) => {

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Home</Text>
            <Text style={StyleSheet.text}>Welcome to Dive Tasks!</Text>
            <Text style={StyleSheet.text}>This is the home screen.</Text>
            <Text style={StyleSheet.text}>You are logged in.</Text>
           </View>
    )};

export default HomeView;