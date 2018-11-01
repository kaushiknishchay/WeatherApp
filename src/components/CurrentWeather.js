import React from 'react';
import styled from 'styled-components';
import ViewCol from '../base_components/ViewCol';
import ViewRow from '../base_components/ViewRow';


const SummaryText = styled.Text`
  color: #0c0c0c;
  margin: 5px 0px;
  font-size: 16px;
`;

const InfoText = styled.Text`
  color: #424242;
  margin: 4px 0;
  font-size: 13px;
`;

const CurrentWeather = ({ weatherData }) => (
  <ViewRow
    style={{
      justifyContent: 'flex-start',
      // backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      alignItems: 'center',
    }}
  >
    <ViewCol
      style={{
        marginHorizontal: 20,
      }}
    >
      <SummaryText>{weatherData.summary}</SummaryText>
      <InfoText>Pressure: {weatherData.pressure} Pa</InfoText>
      <InfoText>Humidity: {weatherData.humidity}</InfoText>
      <InfoText>Wind Speed: {weatherData.windSpeed}</InfoText>
    </ViewCol>
  </ViewRow>
);

export default CurrentWeather;
