import React from 'react';
import styles from './footer.scss';
import PropTypes from "prop-types";

const Footer = ({ weatherApiResponse }) => {
    let locationComponent = null;

    if (weatherApiResponse) {
        const { city, country } = weatherApiResponse.query.results.channel.location;

        locationComponent = <div>{city}, {country}</div>
    } else {
        locationComponent = <div />;
    }

    return (<div className={styles.container}>
        {locationComponent}
        <div>(c) 2018 - Leonel Machava</div>
    </div>);
};

Footer.propTypes = {
    weatherApiResponse: PropTypes.object
};


export default Footer;
