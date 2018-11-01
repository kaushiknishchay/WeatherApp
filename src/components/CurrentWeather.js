import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import Assets from '../assets';
import ViewCol from '../base_components/ViewCol';
import ViewRow from '../base_components/ViewRow';


const SummaryText = styled.Text`
  color: #fdfdfd;
  margin: 5px 0px;
  font-size: 16px;
`;

const InfoText = styled.Text`
  color: #fdfdfd;
  margin: 1px;
  font-size: 13px;
`;

const TempText = styled.Text`
  color: #fdfdfd;
  margin: 5px 0px;
  font-size: 24px;
`;

const CurrentWeather = ({ weatherData }) => (
  <ViewRow
    style={{
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      alignItems: 'center',
    }}
  >
    <Image
      source={Assets[weatherData.icon]}
      style={{
        width: 80,
        height: 80,
        marginVertical: 10,
        marginHorizontal: 10,
      }}
    />
    <ViewCol
      style={{
        marginHorizontal: 20,
      }}
    >
      <TempText>{weatherData.temperature} ˚C</TempText>
      <SummaryText>{weatherData.summary}</SummaryText>
      <InfoText>Pressure: {weatherData.pressure} Pa</InfoText>
      <InfoText>Humidity: {weatherData.humidity}</InfoText>
      <InfoText>Wind Speed: {weatherData.windSpeed} Pa</InfoText>
    </ViewCol>
  </ViewRow>
);

export default CurrentWeather;
