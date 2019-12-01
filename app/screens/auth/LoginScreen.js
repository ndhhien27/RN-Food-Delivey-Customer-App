/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import { theme } from '../../constants/theme';
import { image } from '../../constants/images';
import StyledInput from '../../components/StyledInput';
import API from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    // .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Password')
    .required(),
});

export default function LoginScreen(props) {
  const { navigation } = props;
  const { storeAuthContext, authInfo, storeUserContext } = useContext(
    AuthContext
  );
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 88 }}>
      <View>
        <Text>WelCome back</Text>
      </View>
      <Formik
        initialValues={{
          email: 'Ndhien@gmail.com',
          password: 'hien123456',
        }}
        onSubmit={(values, actions) => {
          API.login2(
            values,
            res => {
              console.log(res.data);
              // actions.setSubmitting(false);
              // if (res.data.errors) alert(`${res.data.errors[0].message}`);
              // else if (res.data.data.login) {
              //   storeAuthContext(res.data.data.login);
              //   navigation.navigate('Main');
              // }
            },
            err => console.log(err)
          );
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <View>
            <View>
              <StyledInput
                formikProps={formikProps}
                formikKey="email"
                placeholder="Email"
                // autoFocus
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
                secureTextEntry
              />
            </View>
            {formikProps.isSubmitting ? (
              <ActivityIndicator size={30} />
            ) : (
              <Button
                title="Login"
                buttonStyle={{
                  padding: 0,
                  height: 44,
                  marginVertical: 40,
                  borderRadius: 22,
                  backgroundColor: theme.color.primary,
                }}
                onPress={formikProps.handleSubmit}
              />
            )}
            <Button
              title="Sign up"
              titleStyle={styles.signUp}
              type="clear"
              onPress={() => navigation.navigate('Signup')}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 20,
  },
  signUp: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 20,
    color: theme.color.primary,
  },
});

LoginScreen.navigationOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: '#fff',
      shadowOpacity: 0,
    },
  };
};
