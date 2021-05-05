import React, { Component } from 'react';
import axios from 'axios';
import styles from './schema.module.css';
import cross from './../../assets/images/cross.png';

class CompanySchema extends Component {
    state = {
        companyDetails: {}
    };

    componentDidMount() {
        this.getLiveData();
        // setInterval(this.getLiveData, 30000);
    }

    getLiveData = () => {
        axios
            .get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${this.props.id}`)
            .then((res) => {
                var details = res.data.data;

                this.setState({
                    companyDetails: {
                        companyName: details.SC_FULLNM,
                        sector: details.SC_SUBSEC,
                        sharePrice: details.pricecurrent,
                        dayChange: details.pricepercentchange,
                        oneYearLow: details['52L'],
                        oneYearHigh: details['52H'],
                        marketCap: details.MKTCAP,
                        peRatio: details.PE,
                        industryPe: details.IND_PE,
                        nseId: details.NSEID
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        const companyDetails = this.state.companyDetails;

        if (companyDetails === null) {
            return null;
        }

        const searchEngine = this.props.searchEngine ? 'google' : 'bing';

        return (
            <div data-id={this.props.id} className={[styles.companyContainer, 'companyRow'].join(' ')}>
                <div>
                    <a
                        className="companyName"
                        data-nse={this.state.companyDetails.nseId}
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            float: 'left'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={(
                            'http://www.' +
                            searchEngine +
                            '.com/search?q=' +
                            this.state.companyDetails.companyName +
                            ' stock'
                        ).toLowerCase()}
                    >
                        {`${this.state.companyDetails.companyName}`.length > 25
                            ? `${this.state.companyDetails.companyName}`.substr(0, 25) + '...'
                            : this.state.companyDetails.companyName}
                    </a>
                    <span
                        style={{
                            float: 'right'
                        }}
                        className={styles.forMobile}
                    >
                        <img
                            className={styles.cross}
                            data-id={this.props.id}
                            onClick={this.props.clicked}
                            src={cross}
                            width="20px"
                            alt="Delete"
                        />
                    </span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span className={styles.fontWeight600}>Share Price: </span>
                    <span className="sharePrice">{this.state.companyDetails.sharePrice}</span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span
                        style={{
                            float: 'left',
                            display: 'inherit',
                            gridTemplateColumns: '135px 1fr'
                        }}
                    >
                        <span className={styles.fontWeight600}>52 Week Low: </span>
                        <span>{this.state.companyDetails.oneYearLow}</span>
                    </span>
                    <span
                        style={{
                            float: 'right'
                        }}
                        className={styles.forDesktop}
                    >
                        <img
                            className={styles.cross}
                            data-id={this.props.id}
                            onClick={this.props.clicked}
                            src={cross}
                            width="20px"
                            alt="Delete"
                        />
                    </span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span className={styles.fontWeight600}>52 Week High: </span>
                    <span>{this.state.companyDetails.oneYearHigh}</span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span className={styles.fontWeight600}>Market Cap: </span>
                    <span className="marketCap">{this.state.companyDetails.marketCap}</span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span className={styles.fontWeight600}>PE Ratio: </span>
                    <span className="peRatio">{this.state.companyDetails.peRatio}</span>
                </div>

                <div className={styles.companyDetailsGrid}>
                    <span className={styles.fontWeight600}>Industry PE: </span>
                    <span className="industryPe">{this.state.companyDetails.industryPe}</span>
                </div>

                <div className={['dayChange', 'dummy', styles.companyDetailsGrid].join(' ')}>
                    <span className={styles.fontWeight600}>Day's Change: </span>
                    <span
                        style={this.state.companyDetails.dayChange * 1 < 0 ? { color: '#EF5350' } : { color: '#9CCC65' }}
                        className="change"
                    >
                        {(this.state.companyDetails.dayChange * 1).toFixed(2)}%
                    </span>
                </div>

                <div className={['companySector', styles.companyDetailsGrid].join(' ')}>
                    <span className={styles.fontWeight600}>Sector: </span>
                    <span>
                        {`${this.state.companyDetails.sector}`.length > 25
                            ? `${this.state.companyDetails.sector}`.substr(0, 25) + '...'
                            : this.state.companyDetails.sector}
                    </span>
                </div>
            </div>
        );
    }
}

export default CompanySchema;
