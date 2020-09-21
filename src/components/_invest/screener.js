import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import Header from './header';
import Sidebar from './sidebar';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';
import hamburger from './../../assets/images/hamburger.png';
import logo from './../../assets/images/logo.png';
import extras from './../../assets/images/extras.png';

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
            document.querySelector('.inputValue').value = 'Adding...';
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

                            if (!currentIds.includes(compCode)) {
                                currentIds.unshift(compCode);
                            } else {
                                document.querySelector('.inputValue').value = 'Company already added!';
                                setTimeout(() => {
                                    document.querySelector('.inputValue').value = '';
                                }, 3000);
                            }

                            this.setState({ ids: currentIds });
                            console.log(this.state.ids);
                            axios.put('https://stokr-beta.firebaseio.com/companies/.json', currentIds).then((res) => {
                                console.log(res);
                            });
                        });
                    document.querySelector('.inputValue').value = 'Added';
                    setTimeout(() => {
                        document.querySelector('.inputValue').value = '';
                    }, 3000);
                });
        }
    };

    hideMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    removeCompany = (comp) => {
        const currentCompanies = this.state.ids;
        const removeCompany = comp.target.getAttribute('data-id');
        const removeCompanyIndex = currentCompanies.indexOf(removeCompany);

        currentCompanies.splice(removeCompanyIndex, 1);
        console.log(currentCompanies);
        this.setState({ ids: currentCompanies });
        axios.put('https://stokr-beta.firebaseio.com/companies/.json', this.state.ids).then((res) => {
            console.log(res);
        });
    };

    render() {
        const indices = ['NSX', 'SEN'];
        const usIndices = ['GSPC', 'IXIC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                <Sidebar showMenu={this.state.showMenu} clicked={this.hideMenu} />
                <Header clicked={this.hideMenu.bind(this)} />
                <div className={[styles.searchBar, 'search'].join(' ')}>
                    <input type="textbox" placeholder="Search for companies..." className={[styles.textbox, 'inputValue'].join(' ')} />
                    <button
                        style={{
                            height: '100%',
                            width: '15%',
                            borderRadius: '100px',
                            border: 'none',
                            backgroundColor: '#17141d',
                            color: 'white'
                        }}
                        onClick={this.companiesFilter.bind(this)}
                    >
                        Add
                    </button>
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
                    {this.state.ids.length >= 1
                        ? this.state.ids.map((el) => {
                              return <CompanySchema clicked={this.removeCompany} key={el} id={el} />;
                          })
                        : ''}
                </div>
            </div>
        );
    }
}

export default Screener;
