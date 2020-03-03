import React, { Component } from 'react';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';

class CompanySchema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyDetails: {

            }
        }
    }

    componentDidMount() {
        const header = {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "User-Agent": "PostmanRuntime/7.22.0",
            "Accept": "*/*",
            "Postman-Token": "6dd814e9-4517-4ab3-8b14-0d4630576312",
            "X-Frame-Options": "SAMEORIGIN"
        }

        axios.get(this.props.link, header).then(res => {
            const parsed = parse(res.data);
            
            let companyName = parsed.querySelector('.pcstname');
            let sector = parsed.querySelector('.moneyprice_bx').querySelectorAll('span')[7];
            let sharePrice = parsed.querySelector('.nsedata_bx').querySelector('.div_live_price_wrap').querySelector('span');
            let dayChange = parsed.querySelector('.nsedata_bx').querySelector('.div_live_price_wrap').querySelectorAll('span')[2].querySelector('em');
            let oneYearLow = parsed.querySelector('.nsedata_bx').querySelectorAll('.open_lhs1')[0].childNodes[3].querySelectorAll('.low_high1')[1];
            let oneYearHigh = parsed.querySelector('.nsedata_bx').querySelectorAll('.open_lhs1')[0].childNodes[3].querySelectorAll('.low_high3')[1];
            let marketCap = parsed.querySelectorAll('.value_list')[1].childNodes[1].querySelectorAll('.value_txtfr')[0];
            let peRatio = parsed.querySelectorAll('.value_list')[0].childNodes[1].querySelectorAll('.value_txtfr')[1];
            let industryPe = parsed.querySelectorAll('.value_list')[1].childNodes[3].querySelectorAll('.value_txtfr')[1];

            this.setState({
                companyDetails: {
                    "companyName": companyName.innerHTML,
                    "sector": sector.innerHTML,
                    "sharePrice": sharePrice.innerHTML,
                    "dayChange": dayChange.innerHTML,
                    "oneYearLow": oneYearLow.innerHTML,
                    "oneYearHigh": oneYearHigh.innerHTML,
                    "marketCap": marketCap.innerHTML,
                    "peRatio": peRatio.innerHTML,
                    "industryPe": industryPe.innerHTML
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const companyDetails = this.state.companyDetails;

        if (companyDetails === null) {
            return null;
        }

        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold'
        };

        return (
            <div className={[styles.companyContainer, 'companyRow'].join(' ')}>
                <div><a className='companyName' style={anchorStyles} target='_blank' href={'http://www.google.com/search?q=' + this.state.companyDetails.companyName + ' share'}>{this.state.companyDetails.companyName}</a></div>
                <div>Sector: {this.state.companyDetails.sector}</div>
                <div>Share Price: {this.state.companyDetails.sharePrice}</div>
                <div>Day's Change: {this.state.companyDetails.dayChange}</div>
                <div>52 Week Low: {this.state.companyDetails.oneYearLow}</div>
                <div>52 Week High: {this.state.companyDetails.oneYearHigh}</div>
                <div>Market Cap: {this.state.companyDetails.marketCap}</div>
                <div>PE Ratio: {this.state.companyDetails.peRatio}</div>
                <div>Industry PE: {this.state.companyDetails.industryPe}</div>
            </div>
        );
    }
}

export default CompanySchema;