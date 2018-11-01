/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import Permissions from 'react-native-permissions';
import axios from 'axios';
import styled from 'styled-components';


import UpperSection from './src/components/UpperSection';
import IconWeatherList from './src/components/IconWeatherList';
import WeatherList from './src/components/WeatherList';
import CurrentWeather from './src/components/CurrentWeather';
import ViewCol from './src/base_components/ViewCol';
import Assets from './src/assets';
import ViewRow from './src/base_components/ViewRow';


const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
  fastestInterval: 1000,
  distanceFilter: 10.00,
  showLocationDialog: true,
  useSignificantChanges: false,
};

type Props = {};

const TempWrapper = styled.View`
  background: rgba(33,33,33,0.67);
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 50px 0 10px 30px;
`;

const TempText = styled.Text`
  color: #fdfdfd;
  margin: 5px 0px;
  font-size: 40px;
`;

const NormalText = TempText.extend`
  font-size: 20px;
  margin-bottom: 0px;
`;

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      locationPermission: false,
      currentPosition: null,
      weatherData: null,
    };
  }

  componentDidMount() {
    Permissions.check('location').then((locationCheck) => {
      if (locationCheck === 'authorized') {
        this.getCurrentLocation();
        this.setState({
          locationPermission: true,
        });
      } else {
        this._requestPermission();
      }
    });
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      if (!isNil(position) && !isEmpty(position)) {
        this.setState({
          currentPosition: position.coords,
        }, () => this.getWeather());
      }
    }, (error) => {
    }, GEOLOCATION_OPTIONS);
  };

  getBaseURL = (lat, lng) => `https://api.darksky.net/forecast/87eff16be0971f64bd00fdec4bec7e29/${lat},${lng}?units=si`;

  getWeather = () => {
    const { currentPosition } = this.state;
    const { latitude, longitude } = currentPosition;

    axios
      .get(this.getBaseURL(latitude, longitude))
      .then((res) => {
        this.setState({
          weatherData: res.data,
          errors: null,
        });
      })
      .catch((err) => {
        this.setState({
          errors: err,
          weatherData: null,
        });
      });
  };


  _requestPermission = () => {
    Permissions.request('location', { type: 'always' }).then((locationRequest) => {
      if (locationRequest === 'authorized') {
        this.setState({ locationPermission: true });
        this.getCurrentLocation();
      } else {
        Alert.alert(
          'Can we access your location?',
          'We need access so we can set your location',
          [
            { text: 'OK', onPress: this._requestPermission },
            { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        );
      }
    });
  };


  render() {
    const { weatherData } = this.state;
    console.log(this.state);
    return (
      <ScrollView>
        {weatherData &&
        <UpperSection>
          <TempWrapper>
            <ViewRow style={{ justifyContent: 'space-between' }}>
              <ViewCol>
                <NormalText>Temperature</NormalText>
                <TempText>
                  {weatherData.currently.temperature.toFixed(0)}
                  ˚C
                </TempText>
              </ViewCol>
              <Image
                source={Assets[weatherData.currently.icon]}
                style={{
                  width: 80,
                  height: 80,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              />
            </ViewRow>
          </TempWrapper>
          <ViewCol>
            <CurrentWeather weatherData={weatherData.currently} />
          </ViewCol>
        </UpperSection>
        }
        {
          weatherData && <IconWeatherList weatherData={weatherData.hourly} />
        }
        {
          weatherData && <WeatherList weatherData={weatherData.daily} />
        }
      </ScrollView>
    );
  }
}
