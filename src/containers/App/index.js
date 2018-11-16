import React, { Component } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeatherTime from "./components/WeatherTime";
import GeolocationService from "../../helpers/geolocation";
import WeatherService from "../../helpers/weather";

import styles from './index.scss';

export default class App extends Component {

    state = {
        geolocationAvailable: false,
        detectingLocation: false,
        error: null
    };

    componentWillMount() {
        if (GeolocationService.isAvailable()) {
            this.setState({
                detectingLocation: true
            });
            GeolocationService.getCurrentPosition()
                .then(this.enableAppFeatures)
                .catch(this.setErrorState);
        }
    }

    enableAppFeatures = (currentPosition) => {
        try {
            this.setState({
                geolocationAvailable: true,
                detectingLocation: false,
                error: null,
                currentPosition
            });

            this.updateHoursAndTemperature();
        } catch( e ) { console.log(e) }
    };

    setErrorState = () => {
        this.setState({
            geolocationAvailable: false,
            detectingLocation: false,
            error: 'Failed to fetch current browser location'
        });
    };

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    updateHoursAndTemperature = () => {
        const { latitude, longitude } = this.state.currentPosition.coords;

        WeatherService
            .getLocationConditions(latitude, longitude)
            .then(weatherApiResponse => {
                this.setState({
                    weatherApiStatus: null,
                    weatherApiResponse
                });

                this.timer = setTimeout(this.updateHoursAndTemperature, 30000);
            })
            .catch((e) => {
                console.warn(e);
                this.setState({
                    weatherApiStatus: 'Experiencing issues fetching up-to-date info'
                });

                this.timer = setTimeout(this.updateHoursAndTemperature, 30000);
            });
    };

    render() {
        const {
            geolocationAvailable,
            detectingLocation,
            weatherApiResponse,
            weatherApiStatus,
            currentPosition,
            error
        } = this.state;

        let statusComponent = null;

        if (error) {
            console.warn('Error occured: ', error);
            console.warn('Please note that geolocation is blocked by some browsers if accessed over an insecure ' +
                'connection. This can be deactivated through developers tools or browser flags, though');
        }

        if (error || (!detectingLocation && !geolocationAvailable)) {
            statusComponent = (<div>This app requires location detection to be active in the browser</div>);
        }

        return (
            <div className={styles.container}>
                <Header weatherApiResponse={weatherApiResponse} />
                <div className={styles.main}>
                    {statusComponent}
                    {detectingLocation && <div>Detecting Location... </div>}

                    <WeatherTime
                        weatherApiResponse={weatherApiResponse}
                        weatherApiStatus={weatherApiStatus}
                    />
                </div>
                <Footer weatherApiResponse={weatherApiResponse} />
            </div>
        );
    }
}
