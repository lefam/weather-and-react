import React from 'react';
import styles from './header.scss';
import PropTypes from "prop-types";

const Header = ({ weatherApiResponse }) => {
    let temperatureComponent = null;

    if (weatherApiResponse) {
        temperatureComponent = <div>{weatherApiResponse.query.results.channel.item.condition.temp}°</div>
    } else {
        temperatureComponent = <div />;
    }

    return (
        <div className={styles.container}>
            <div>Awesome React Exercise</div>
            {temperatureComponent}
        </div>
    );
};

Header.propTypes = {
    weatherApiResponse: PropTypes.object
};


export default Header;
