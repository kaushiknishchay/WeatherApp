/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const BaseWrap = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const ViewRow = props => (
  <BaseWrap
    style={props.style}
  >
    {props.children}
  </BaseWrap>
);
ViewRow.defaultProps = {
  style: {},
};


ViewRow.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any.isRequired,
};


export default ViewRow;
