import React, { Component } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from './index.scss';

export default class App extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.main}>
                </div>
                <Footer />
            </div>
        );
    }
}
