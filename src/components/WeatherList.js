/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Assets from '../assets';
import ViewRow from '../base_components/ViewRow';
import ViewCol from '../base_components/ViewCol';


const DateText = styled.Text`
  color: #8a8a8a;
  font-weight: bold;
`;

const TempText = DateText.extend`
  color: #605354;
`;

const SummaryText = styled.Text`
  color: #444;
  margin: 5px 0px;
`;

const HeaderRow = styled(ViewRow)`
  margin-bottom: 10px;
  justify-content: space-between;
`;

const InfoCol = styled(ViewCol)`
  flex: 80;
`;

const WeatherItem = styled(ViewRow)`
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: #eee;
`;

const IconWrap = styled.View`
  flex: 20;
  justify-content: flex-end;
  padding: 10px;
  margin: 5px 0px 5px 15px;
`;

const WeatherIcon = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;


class WeatherList extends Component {
  render() {
    const { weatherData } = this.props;
    const { data } = weatherData;
    const dataToShow = data.slice(0, 12);

    const iconSize = 60;
    return (
      <FlatList
        ListHeaderComponent={(
          <ViewCol
            style={{
              padding: 15,
              backgroundColor: '#e6e6e6',
            }}
          >
            <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>Later This week</Text>
          </ViewCol>)}
        data={dataToShow}
        keyExtractor={(item, index) => item.time + item.icon}
        renderItem={({ item }) => (
          <WeatherItem>
            <InfoCol>
              <HeaderRow>
                <DateText>
                  {moment(item.time * 1000).format('ll')}
                </DateText>
                <TempText>
                  {`${item.temperatureMin.toFixed(0)} - ${item.temperatureMax.toFixed(0)} ˚C `}
                </TempText>
              </HeaderRow>
              <SummaryText>
                {item.summary}
              </SummaryText>

            </InfoCol>
            <IconWrap>
              <WeatherIcon
                source={Assets[item.icon]}
                size={iconSize}
              />
            </IconWrap>
          </WeatherItem>
        )}
      />
    );
  }
}

WeatherList.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default WeatherList;
