/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import { login } from '../../actions/index';

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
  // const { storeAuthContext, authInfo, storeUserContext } = useContext(
  //   AuthContext
  // );
  const authInfo = useSelector(state => state.authReducer.authToken);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const dispatch = useDispatch();
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 88 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>WelCome back</Text>
      </View>
      <Formik
        initialValues={{
          email: 'Ndhien@gmail.com',
          password: 'hien123456',
        }}
        onSubmit={(values, actions) => {
          dispatch(login(values.email, values.password));
          // API.login2(values).then(res => {
          //   if (res.errors) alert(res.errors.message);
          //   else if (res.data.login) {
          //     // navigation.navigate('Main');
          //     actions.setSubmitting(false);
          //   }
          // });
          actions.setSubmitting(false);
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
            {isLoading ? (
              <ActivityIndicator size={44} style={{ marginVertical: 40 }} />
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
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 40,
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
