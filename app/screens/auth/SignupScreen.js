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
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../constants/theme';
import StyledInput from '../../components/StyledInput';
import SelectPositionModal from './SelectPositionModal';
import { signUp } from '../../actions';

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
  const [isVisible, setIsVisible] = React.useState(false);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
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
            dispatch(signUp(values));
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
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
                <TouchableOpacity
                  onPress={() => setIsVisible(true)}
                  activeOpacity={1}
                >
                  <StyledInput
                    formikProps={formikProps}
                    formikKey="position.address"
                    editable={false}
                    selection={{ start: 0, end: 0 }}
                    placeholder="Choose address ..."
                    defaultValue={formikProps.values.position.address}
                  />
                </TouchableOpacity>
                {/* <Button
                  title="Address"
                  onPress={() => navigation.navigate('MapScreen')}
                /> */}
                <Overlay
                  isVisible={isVisible}
                  onBackdropPress={() => setIsVisible(false)}
                  animationType="slide"
                  height="80%"
                  width="100%"
                  overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
                >
                  <SelectPositionModal
                    onPress={() => setIsVisible(false)}
                    formikProps={formikProps}
                    formikKey="position.address"
                    latKey="position.lat"
                    longKey="position.long"
                  />
                </Overlay>
              </View>
              {isLoading ? (
                <ActivityIndicator
                  size={44}
                  style={{ marginVertical: 40 }}
                  color={theme.color.primary}
                />
              ) : (
                <View style={{ paddingTop: 16 }}>
                  <Button
                    title="Sign up"
                    buttonStyle={{
                      padding: 0,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: theme.color.primary,
                    }}
                    onPress={formikProps.handleSubmit}
                  />
                  <Button
                    title="Go back Login"
                    titleStyle={{
                      fontFamily: theme.text.fonts.sfpt,
                      fontSize: theme.text.size.md,
                      color: theme.color.primary,
                    }}
                    type="clear"
                    buttonStyle={{
                      padding: 0,
                      height: 44,
                      borderRadius: 22,
                    }}
                    onPress={() => navigation.goBack()}
                  />
                </View>
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
