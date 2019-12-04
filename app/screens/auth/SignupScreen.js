/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import API from '../../services/AuthService';

const validationSchema = yup.object().shape({
  fName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('First name')
    .required(),
  lName: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Last name')
    .required(),
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, 'Must be a Number')
    .label('Phone')
    .min(4)
    .max(10)
    .required(),
  password: yup
    .string()
    .matches(/(\d)*[a-zA-Z]+(\d)*/, 'Must be a string')
    .label('Password')
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    }),
  position: yup.object().shape({
    address: yup
      .string()
      .label('Address')
      .required(),
    lat: yup.number().required(),
    long: yup.number().required(),
  }),
});

export default function SignupScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ marginTop: 56, paddingHorizontal: 16, flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create an account</Text>
        </View>
        <Formik
          initialValues={{
            fName: '',
            lName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            position: {
              address: '',
              lat: 0,
              long: 0,
            },
          }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values));
            API.signup(
              values,
              res => {
                actions.setSubmitting(false);
                if (res.data.errors) alert(res.data.errors.message);
                else if (res.data.data.createUser) navigation.goBack();
              },
              err => console.log(err)
            );
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
              <View>
                <StyledInput
                  formikProps={formikProps}
                  formikKey="fName"
                  placeholder="First name"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="lName"
                  placeholder="Last name"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="Email"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="phone"
                  placeholder="Phone"
                  keyboardType="number-pad"
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                  placeholder="Comfirm Password"
                  secureTextEntry
                />
                <StyledInput
                  formikProps={formikProps}
                  formikKey="position.address"
                  editable={false}
                  onTouchStart={() =>
                    navigation.navigate('Login', {
                      formikProps,
                      formikKey: 'position.address',
                      latKey: 'position.lat',
                      longKey: 'position.long',
                    })
                  }
                  placeholder="Address"
                  defaultValue={formikProps.values.position.address}
                />
                {formikProps.errors.position ? (
                  <Text>
                    {formikProps.touched.position.address &&
                      formikProps.errors.position.address}
                  </Text>
                ) : null}
                <Button
                  onPress={() =>
                    navigation.navigate('Map', {
                      formikProps,
                      formikKey: 'position.address',
                      latKey: 'position.lat',
                      longKey: 'position.long',
                    })
                  }
                />
                <Text>{formikProps.values.position.lat}</Text>
                <Text>{formikProps.values.position.long}</Text>
                {/* <Button
                  title="Address"
                  onPress={() => navigation.navigate('MapScreen')}
                /> */}
              </View>
              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Button
                  title="Sign up"
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
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: theme.text.size['2xl'],
  },
  modalTitle: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 44,
  },
});

SignupScreen.navigationOptions = () => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: '#fff',
      shadowOpacity: 0,
    },
  };
};
