/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, ScrollView } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import Permissions from 'react-native-permissions';
import axios from 'axios';
import UpperSection from './src/components/UpperSection';
import IconWeatherList from './src/components/IconWeatherList';
import WeatherList from './src/components/WeatherList';
import CurrentWeather from './src/components/CurrentWeather';


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
          <CurrentWeather weatherData={weatherData.currently} />
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
