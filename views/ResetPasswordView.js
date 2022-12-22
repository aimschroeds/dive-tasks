import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase';

import StyleSheet from '../styles/StyleSheet';


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
            style={StyleSheet.container}
            behavior="padding"
        >
            {/* Email input */}
            <View style={StyleSheet.containerInput}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={StyleSheet.input}
                />
            </View>
            <View style={StyleSheet.containerButton}>
                {/* Reset password button */}
                <TouchableOpacity
                    onPress={handleResetPassword}
                    style={[StyleSheet.buttonPrimary, StyleSheet.buttonPrimaryLarge]}
                >
                    <Text style={StyleSheet.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                {/* Error/Success messaging */}
                {errorMessage && 
                    <Text style={StyleSheet.errorMessage}>{errorMessage}</Text>
                }
                {successMessage && 
                    <Text style={StyleSheet.successMessage}>{successMessage}</Text>
                }
                {/* Button to return user to Login Screen */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={StyleSheet.linkText}>Return to Login </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ResetPasswordView;