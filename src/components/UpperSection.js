/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CityImageBg from './CityImageBg';
import ViewCol from '../base_components/ViewCol';


const UpperWrapper = styled.View`
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  justify-content: flex-end;
`;


const UpperSection = ({ children = null }) => (
  <UpperWrapper>
    <CityImageBg />
    <ViewCol>
      {children}
    </ViewCol>
  </UpperWrapper>
);

UpperSection.defaultProps = {
  children: null,
};

UpperSection.propTypes = {
  children: PropTypes.any,
};


export default UpperSection;
