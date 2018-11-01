/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Assets from '../assets';
import ViewCol from '../base_components/ViewCol';


const DateBadge = styled.View`
  background-color: #f5f5f5;
  padding: 2px 8px;
  border-radius: 6px;
`;

const DateText = styled.Text`
  color: #444;
  font-weight: bold;
`;

const IconItem = styled(ViewCol)`
  padding: 10px;
  justify-content: center;
  margin: 0 10px;
`;

const WeatherIcon = styled.Image`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 auto 10px auto;
`;


class IconWeatherList extends Component {
  render() {
    const { weatherData } = this.props;
    const { data } = weatherData;
    const dataToShow = data.slice(0, 12);

    const iconSize = 40;
    return (
      <React.Fragment>
        <ViewCol
          style={{
            padding: 15,
            backgroundColor: '#e6e6e6',
          }}
        >
          <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>Later Today</Text>
        </ViewCol>
        <FlatList
          horizontal
          style={{
            backgroundColor: '#f5f5f5',
          }}
          data={dataToShow}
          keyExtractor={(item, index) => item.time + item.icon}
          renderItem={({ item }) => (
            <IconItem>
              <WeatherIcon
                source={Assets[item.icon]}
                size={iconSize}
              />
              <DateBadge>
                <DateText>
                  {moment(item.time * 1000).format('LT')}
                </DateText>
              </DateBadge>
            </IconItem>
          )}
        />
      </React.Fragment>
    );
  }
}

IconWeatherList.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default IconWeatherList;
