import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';

class Screener extends Component {
    state = {
        searchResults: '',
        newCompany: null
    };

    companiesFilter = () => {
        var input = document.querySelector('.inputValue').value.toLowerCase();

        if (input.length >= 3) {
            axios
                .get(`https://cors-anywhere.herokuapp.com/https://www.bing.com/search?q=moneycontrol%20stockpricequote%20${input}`)
                .then((res) => {
                    const parsed = parse(res.data);
                    var compCode = parsed
                        .querySelector('#b_results')
                        .querySelectorAll('.b_algo')[0]
                        .querySelector('a')
                        .getAttribute('href')
                        .split('/')[7];
                    return compCode;
                })
                .then((compCode) => {
                    axios
                        .get(`https://www.moneycontrol.com/india/stockpricequote/computers-software-training/aptech/${compCode}`)
                        .then((res) => {
                            const parsed = parse(res.data);
                            var compCode = parsed.querySelector('#scid').attributes.value;
                            console.log(compCode);
                            return compCode;
                        })
                        .then((compCode) => {
                            axios.get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${compCode}`).then((res) => {
                                this.setState({ newCompany: res.data.data });
                                console.log(this.state);
                                const searchResEl = (
                                    <div
                                        style={{
                                            width: '50%',
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            height: '30px',
                                            alignItems: 'center',
                                            backgroundColor: 'red',
                                            borderRadius: '5px',
                                            position: 'absolute',
                                            zIndex: '999'
                                        }}
                                        onClick={this.addNewCompany.bind(this)}
                                    >
                                        {res.data.data !== null ? <span>{res.data.data.SC_FULLNM}</span> : 'No company with that name...'}
                                    </div>
                                );
                                this.setState({ searchResults: searchResEl });
                            });
                        });
                });
        } else {
            this.setState({ searchResults: '' });
        }
    };

    addNewCompany = () => {
        const lastEl = document.querySelector('.container').lastChild.classList;
        var newCompanyEl = `
            <div class=${lastEl}>
                <div>
                    <a
                        class="companyName"
                        style="color: white; font-weight: bold"
                        target="_blank"
                        rel="noopener noreferrer"
                        href=${('http://www.bing.com/search?q=' + this.state.newCompany.SC_FULLNM + ' share').toLowerCase()}
                    >
                        ${this.state.newCompany.SC_FULLNM}
                    </a>
                </div>
                <div class="companySector">Sector: ${this.state.newCompany.SC_SUBSEC}</div>
                <div>Share Price: ${this.state.newCompany.pricecurrent}</div>
                <div class="dayChange dummy">Day's Change: ${(this.state.newCompany.pricepercentchange * 1).toFixed(2)}%</div>
                <div>52 Week Low: ${this.state.newCompany['52L']}</div>
                <div>52 Week High: ${this.state.newCompany['52H']}</div>
                <div>Market Cap: ${this.state.newCompany.MKTCAP}</div>
                <div>PE Ratio: ${this.state.newCompany.PE}</div>
                <div>Industry PE: ${this.state.newCompany.IND_PE}</div>
            </div>
        `;
        document.querySelector('.container').insertAdjacentHTML('beforeend', newCompanyEl);
    };

    render() {
        const companyIDs = [
            'AI',
            'AT',
            'API',
            'AS28',
            'BA06',
            'BAF',
            'BPI02',
            'BI',
            'GCP',
            'HI01',
            'HDF',
            'HDF01',
            'HSL01',
            'HL',
            'ICI02',
            'ILG',
            'IIB',
            'IT',
            'ITC',
            'JF04',
            'KMF',
            'MI25',
            'MF19',
            'NI',
            'PI11',
            'RF07',
            'RI',
            'SLI03',
            'TCS',
            'TI01',
            'VIP',
            'V'
        ];

        const indices = ['NSX', 'SEN'];
        const usIndices = ['GSPC', 'IXIC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                <div className={styles.header}>
                    <input type="textbox" placeholder="Search for companies..." className={[styles.textbox, 'inputValue'].join(' ')} />
                    <button
                        style={{
                            marginLeft: '-16%',
                            height: '70%',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#100f17',
                            color: 'white'
                        }}
                        onClick={this.companiesFilter.bind(this)}
                    >
                        Burron
                    </button>
                    {this.state.searchResults}
                </div>

                <div className={styles.indicesContainer}>
                    {indices.map((el) => {
                        return <IndicesSchema key={el} id={el} />;
                    })}
                    {usIndices.map((el) => {
                        return <USIndicesSchema key={el} id={el} />;
                    })}
                </div>

                {companyIDs.map((el) => {
                    return <CompanySchema key={el} id={el} />;
                })}
            </div>
        );
    }
}

export default Screener;
