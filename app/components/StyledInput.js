/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FieldWrapper from './FieldWrapper';
import { theme } from '../constants/theme';

const InputAnimated = Animatable.createAnimatableComponent(Input);

const StyledInput = ({ formikProps, formikKey, ...rest }) => {
  return (
    <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
      <InputAnimated
        animation={
          formikProps.touched[formikKey] && formikProps.errors[formikKey]
            ? 'shake'
            : null
        }
        delay={1500}
        placeholderTextColor={theme.color.darkGray}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        containerStyle={styles.normal}
        inputContainerStyle={{
          borderBottomColor: 'transparent',
          height: 44,
        }}
        // selection={{ start: 0, end: 0 }}
        clearButtonMode="while-editing"
        {...rest}
      />
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: theme.color.gray,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderColor: theme.color.red,
    borderWidth: 1,
  },
  normal: {
    backgroundColor: theme.color.gray,
    paddingHorizontal: 16,
    borderRadius: 22,
  },
});

export default StyledInput;
