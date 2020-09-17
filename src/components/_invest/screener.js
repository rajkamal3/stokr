import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import Sidebar from './sidebar';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';

class Screener extends Component {
    state = {
        ids: [],
        showMenu: false
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

                            for (let i = 0; i < currentIds.length; i++) {
                                if (currentIds.indexOf(compCode) === -1) {
                                    currentIds.unshift(compCode);
                                } else {
                                    alert('Company already added');
                                    return;
                                }
                            }

                            this.setState({ ids: currentIds });
                            console.log(this.state.ids);
                            axios.put('https://stokr-beta.firebaseio.com/companies/.json', currentIds).then((res) => {
                                console.log(res);
                            });
                        });
                });
        }
    };

    hideMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    render() {
        const indices = ['NSX', 'SEN'];
        const usIndices = ['GSPC', 'IXIC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                <Sidebar showMenu={this.state.showMenu} />
                <div className={styles.header}>
                    <div onClick={this.hideMenu.bind(this)} className={[styles.hamburgerMenu, 'burger'].join(' ')}></div>
                    <input type="textbox" placeholder="Search for companies..." className={[styles.textbox, 'inputValue'].join(' ')} />
                    <button
                        style={{
                            marginLeft: '-12%',
                            height: '100%',
                            width: '45px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: 'rgb(255 0 0)',
                            color: 'white'
                        }}
                        onClick={this.companiesFilter.bind(this)}
                    >
                        Add
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
