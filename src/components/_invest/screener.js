import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import USIndicesSchema from './usIndicesSchema';
import Header from './header';
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

    filterCompanies = () => {
        var input = document.querySelector('.inputValue').value.toLowerCase();
        var companiesNamesArray = document.querySelectorAll('.companyName');
        var companiesSectorArray = document.querySelectorAll('.companySector');
        var companyRow = document.querySelectorAll('.companyRow');

        for (var i = 0; i < companiesNamesArray.length; i++) {
            var currentCompany = companiesNamesArray[i];
            var currentSector = companiesSectorArray[i];
            var currentCompanyName = currentCompany.textContent || currentCompany.innerText;
            var currentSectorName = currentSector.textContent || currentSector.innerText;
            var currentCompanyId = companiesNamesArray[i].getAttribute('data-nse');

            if (
                currentCompanyName.toLowerCase().indexOf(input) > -1 ||
                currentSectorName.toLowerCase().indexOf(input) > -1 ||
                currentCompanyId.toLowerCase().indexOf(input) > -1
            ) {
                companyRow[i].style.display = '';
            } else {
                companyRow[i].style.display = 'none';
            }
        }
    };

    showAllCompanies = () => {
        Array.from(document.querySelectorAll('.companyRow')).forEach((el) => {
            el.style.display = 'grid';
        });
    };

    addNewCompany = () => {
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
                            if (!parsed.querySelector('#scid')) {
                                alert('No company by that name!');
                                return;
                            }
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
                    this.showAllCompanies();
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
                    <input
                        onChange={this.filterCompanies.bind(this)}
                        type="textbox"
                        placeholder="Search for companies..."
                        className={[styles.textbox, 'inputValue'].join(' ')}
                    />
                    <button
                        style={{
                            height: '100%',
                            width: '15%',
                            borderRadius: '100px',
                            border: 'none',
                            backgroundColor: '#18151e',
                            color: 'white',
                            borderTopLeftRadius: '0',
                            borderBottomLeftRadius: '0',
                            boxShadow: '0px 0px 30px 0px rgba(10, 9, 15, 0.5)'
                        }}
                        onClick={this.addNewCompany.bind(this)}
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

                <div className="companiesContainer">
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
