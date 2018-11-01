/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';


const baseStyles = {
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
};

const ViewCol = props => (
  <View
    style={[baseStyles, props.style]}
  >
    {props.children}
  </View>
);
ViewCol.defaultProps = {
  style: {},
};


ViewCol.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any.isRequired,
};


export default ViewCol;
