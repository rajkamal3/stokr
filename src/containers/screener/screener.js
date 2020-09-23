import React, { Component } from 'react';
import CompanySchema from '../schemas/companySchema';
import IndicesSchema from '../schemas/indicesSchema';
import USIndicesSchema from '../schemas/usIndicesSchema';
import Header from '../../components/ui/header';
import Sidebar from '../../components/ui/sidebar';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './screener.module.css';

class Screener extends Component {
    state = {
        ids: [],
        showMenu: false,
        modalActive: false,
        searchEngine: false
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
                                document.querySelector('.inputValue').value = 'No company by that name!';
                                this.showAllCompanies();
                                setTimeout(() => {
                                    document.querySelector('.inputValue').value = '';
                                }, 3000);
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
                            axios.put('https://stokr-beta.firebaseio.com/companies/.json', currentIds);
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
        axios.put('https://stokr-beta.firebaseio.com/companies/.json', this.state.ids);
    };

    toggleSearchEngine = () => {
        this.setState({ searchEngine: !this.state.searchEngine });
    };

    sort = () => {
        var cos = document.querySelectorAll('.companyRow');
        var arrc = [];
        var newArr = [];

        for (let i = 0; i < cos.length; i++) {
            arrc.push({ key: cos[i].getAttribute('data-id'), value: cos[i].querySelector('.companyName').innerHTML });
        }

        arrc = arrc.sort(function (a, b) {
            return a.value.localeCompare(b.value);
        });

        for (var i = 0; i < arrc.length; i++) {
            newArr.push(arrc[i].key);
        }

        this.setState({ ids: newArr });

        // by number
        // var cos = document.querySelectorAll('.companyRow');
        // var arrc = [];
        // var newArr = [];

        // for (let i = 0; i < cos.length; i++) {
        //     arrc.push({ key: cos[i].querySelector('.marketCap').innerHTML, value: cos[i].innerHTML });
        // }

        // arrc = arrc.sort(function (a, b) {
        //     return a.key - b.key;
        // });

        // for (var i = 0; i < arrc.length; i++) {
        //     newArr.push(arrc[i].key);
        // }

        // console.log(newArr);
    };

    render() {
        const indices = ['NSX', 'SEN'];
        const usIndices = ['GSPC', 'IXIC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                <Sidebar
                    searchEngine={this.state.searchEngine}
                    showMenu={this.state.showMenu}
                    showModal={this.state.showModal}
                    clicked={this.hideMenu}
                    changed={this.toggleSearchEngine}
                    sorted={this.sort}
                />
                <Header clicked={this.hideMenu.bind(this)} />
                <div className={[styles.searchBar, 'search'].join(' ')}>
                    <input
                        onChange={this.filterCompanies.bind(this)}
                        type="textbox"
                        placeholder="Search for companies..."
                        className={[styles.textbox, 'inputValue'].join(' ')}
                    />
                    <button className={styles.addButton} onClick={this.addNewCompany.bind(this)}>
                        Add
                    </button>
                </div>

                <div className={styles.indicesContainer}>
                    {indices.map((el) => {
                        return <IndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                    {usIndices.map((el) => {
                        return <USIndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                </div>

                <div className="companiesContainer">
                    {this.state.ids.length >= 1
                        ? this.state.ids.map((el) => {
                              return <CompanySchema searchEngine={this.state.searchEngine} clicked={this.removeCompany} key={el} id={el} />;
                          })
                        : ''}
                </div>
            </div>
        );
    }
}

export default Screener;
