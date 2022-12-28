import { Text, View, TextInput } from 'react-native';
import Styles from '../styles/Styles';

import Logout from '../components/Logout';
/**
 * Home screen
 * @param {*} navigation
 * @returns {JSX.Element}
 */

const HomeView = ({ navigation }) => {

    return (
        <View style={Styles.container}>
            <View style={Styles.container}>
                <Text style={Styles.title}>Home</Text>
                <Text style={Styles.text}>Welcome to Dive Tasks!</Text>
                <Text style={Styles.text}>This is the home screen.</Text>
                <Text style={Styles.text}>You are logged in.</Text>
            </View>
            <Logout />
        </View>
    )};

export default HomeView;