import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './weatherTime.scss';
import {getMomentGreeting} from "../../../helpers/datetime";

const WeatherTime = ({ weatherApiResponse, weatherApiStatus}) => {
    let timeComponent = null,
        statusComponent = null;

    if (weatherApiResponse) {
        const currentTime = moment(weatherApiResponse.query.results.channel.lastBuildDate, 'ddd, D MMM YYYY HH:mm A');

        timeComponent = (<div>
                <div>{currentTime.format('hh:mm A')}</div>
                <div className={styles.greeting}>{getMomentGreeting(currentTime)}</div>
            </div>);
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

