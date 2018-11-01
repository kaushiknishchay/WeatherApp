import React from 'react';
import moment from 'moment';
import { Image } from 'react-native';

import Assets from '../assets/index';


const getGreetingTime = (currentTime) => {
  if (!currentTime || !currentTime.isValid()) {
    return 'day';
  }

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(currentTime.format('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'day';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'night';
  }
  // Between dawn and noon
  return 'day';
};

const CityImageBg = () => (
  <Image
    source={Assets[getGreetingTime(moment())]}
    style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 600,
      }}
    resizeMode="cover"
  />
);

export default CityImageBg;
