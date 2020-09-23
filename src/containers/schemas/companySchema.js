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
        setInterval(this.getLiveData, 3000);
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

        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold'
        };

        const searchEngine = this.props.searchEngine ? 'google' : 'bing';

        return (
            <div data-id={this.props.id} className={[styles.companyContainer, 'companyRow'].join(' ')}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <a
                        className="companyName"
                        data-nse={this.state.companyDetails.nseId}
                        style={anchorStyles}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={(
                            'http://www.' +
                            searchEngine +
                            '.com/search?q=' +
                            this.state.companyDetails.companyName +
                            ' share'
                        ).toLowerCase()}
                    >
                        {`${this.state.companyDetails.companyName}`.length > 25
                            ? `${this.state.companyDetails.companyName}`.substr(0, 25) + '...'
                            : this.state.companyDetails.companyName}
                    </a>
                    <div>
                        <img data-id={this.props.id} onClick={this.props.clicked} src={cross} width="20px" alt="Delete" />
                    </div>
                </div>
                <div>
                    Share Price: <span className="sharePrice">{this.state.companyDetails.sharePrice}</span>
                </div>
                <div>52 Week Low: {this.state.companyDetails.oneYearLow}</div>
                <div>52 Week High: {this.state.companyDetails.oneYearHigh}</div>
                <div>
                    Market Cap: <span className="marketCap">{this.state.companyDetails.marketCap}</span>
                </div>
                <div>
                    PE Ratio: <span className="peRatio">{this.state.companyDetails.peRatio}</span>
                </div>
                <div>
                    Industry PE: <span className="industryPe">{this.state.companyDetails.industryPe}</span>
                </div>
                <div className={['dayChange', 'dummy'].join(' ')}>
                    Day's Change:{' '}
                    <span
                        style={this.state.companyDetails.dayChange * 1 < 0 ? { color: '#EF5350' } : { color: '#9CCC65' }}
                        className="change"
                    >
                        {(this.state.companyDetails.dayChange * 1).toFixed(2)}%
                    </span>
                </div>
                <div className="companySector">Sector: {this.state.companyDetails.sector}</div>
            </div>
        );
    }
}

export default CompanySchema;
