import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';
import Exp from './exp';

class Screener extends Component {
    state = {
        searchResults: '',
        newCompany: null
    };

    addNewCompany = (res) => {
        console.log('[Add new company]' + this.state.newCompany);
    };

    companiesFilter = () => {
        var input = document.querySelector('.inputValue').value.toLowerCase();

        if (input.length >= 5) {
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
                                // const huellResp = res.data.data;
                                this.setState({ newCompany: res.data.data });
                                const huellHTML = (
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
                                this.setState({ searchResults: huellHTML });
                                // console.log(res.data.data);
                            });
                        });
                });
        } else {
            this.setState({ searchResults: '' });
        }

        // var companiesNamesArray = document.querySelectorAll('.companyName');
        // var companiesSectorArray = document.querySelectorAll('.companySector');
        // var companyRow = document.querySelectorAll('.companyRow');

        // for (var i = 0; i < companiesNamesArray.length; i++) {
        //     var currentCompany = companiesNamesArray[i];
        //     var currentSector = companiesSectorArray[i];
        //     var currentCompanyName = currentCompany.textContent || currentCompany.innerText;
        //     var currentSectorName = currentSector.textContent || currentSector.innerText;

        //     if (currentCompanyName.toLowerCase().indexOf(input) > -1 || currentSectorName.toLowerCase().indexOf(input) > -1) {
        //         companyRow[i].style.display = '';
        //     } else {
        //         companyRow[i].style.display = 'none';
        //     }
        // }
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

        // let renderedHTML;

        // this.state.searchResults !== '' ? (renderedHTML = <span>{this.state.searchResults.SC_FULLNM}</span>) : null;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <input
                        // onChange={this.companiesFilter.bind(this)}
                        type="textbox"
                        placeholder="Search for companies..."
                        className={[styles.textbox, 'inputValue'].join(' ')}
                    />
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

                {/* <Exp /> 
                <input type="hidden" id="scid" name="scid" value="AT">
                */}

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
