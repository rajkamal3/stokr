import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';

class Screener extends Component {
    state = {
        ids: []
    };

    componentDidMount() {
        axios.get('https://stokr-beta.firebaseio.com/companies.json').then((res) => {
            this.setState({ ids: res.data });
        });
    }

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
                            const currentIds = this.state.ids;
                            currentIds.unshift(compCode);
                            this.setState({ ids: currentIds });
                            console.log(this.state.ids);
                            axios.put('https://stokr-beta.firebaseio.com/companies/.json', currentIds).then((res) => {
                                console.log(res);
                            });
                        });
                });
        }
    };

    render() {
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
                        Button
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

                <div>
                    {this.state.ids.length > 1
                        ? this.state.ids.map((el) => {
                              return <CompanySchema key={el} id={el} />;
                          })
                        : ''}
                </div>
            </div>
        );
    }
}

export default Screener;
