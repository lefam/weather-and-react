import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './weatherTime.scss';

const WeatherTime = ({ weatherApiResponse, weatherApiStatus}) => {
    let timeComponent = null,
        statusComponent = null;

    if (weatherApiResponse) {
        const currentTime = moment(weatherApiResponse.query.results.channel.item.condition.date, 'ddd, D MMM YYYY HH:mm Z');

        timeComponent = <div>{currentTime.format('HH:mm')}</div>
    }

    if (weatherApiStatus) {
        statusComponent = <div>{weatherApiStatus}</div>;
    }

    return (<div className={styles.container}>
        {timeComponent}
        {statusComponent}
    </div>);
};

WeatherTime.propTypes = {
    weatherApiResponse: PropTypes.object,
    weatherApiStatus: PropTypes.string
};

export default WeatherTime;

