import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';

import Styles from '../styles/Styles';


// Adapted from: https://www.youtube.com/watch?v=ql4J6SpLXZA

/**
 * Enables user to send reset password email
 * @param {*} navigation 
 * @returns {JSX.Element}
 */
const ResetPasswordView = ( { navigation } ) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Send password reset email
    const handleResetPassword = () => {
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
            // Email sent with instructions to reset password
            setSuccessMessage('Check your email to reset your password!');
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    }

    return (
        <KeyboardAvoidingView
            style={Styles.container}
            behavior="padding"
        >
            {/* Email input */}
            <View style={Styles.containerInput}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={Styles.input}
                    autoComplete='email'
                />
            </View>
            <View style={Styles.containerButton}>
                {/* Reset password button */}
                <TouchableOpacity
                    onPress={handleResetPassword}
                    style={[Styles.buttonPrimary, Styles.buttonPrimaryLarge]}
                >
                    <Text style={Styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                {/* Error/Success messaging */}
                {errorMessage && 
                    <Text style={Styles.errorMessage}>{errorMessage}</Text>
                }
                {successMessage && 
                    <Text style={Styles.successMessage}>{successMessage}</Text>
                }
                {/* Button to return user to Login Screen */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={Styles.linkText}>Return to Login </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ResetPasswordView;