import React, { Component } from 'react';
import CompanySchema from '../schemas/companySchema';
import IndicesSchema from '../schemas/indicesSchema';
import MidSmallIndicesSchema from '../schemas/midsmallIndicesSchema';
import USIndicesSchema from '../schemas/usIndicesSchema';
import Header from '../../components/ui/header';
import Sidebar from '../../components/ui/sidebar';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './screener.module.css';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

class Screener extends Component {
    state = {
        name: '',
        email: '',
        ids: [],
        showMenu: false,
        modalActive: false,
        searchEngine: false
    };

    componentDidMount() {
        console.log(this.props);
        if (this.props.userName === '') {
            this.props.getUserDetails();
        }

        this.setState({
            name: this.props.userName,
            email: this.props.email
        });

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

    postData = () => {
        axios.put('https://stokr-beta.firebaseio.com/companies/.json', this.state.ids).then((res) => {
            document.querySelector('.sortSave').innerHTML = 'Saved!';
            setTimeout(() => {
                document.querySelector('.sortSave').innerHTML = 'Save';
            }, 3000);
        });
    };

    createArrayForSorting = (cos, sortArr, by) => {
        for (let i = 0; i < cos.length; i++) {
            sortArr.push({ key: cos[i].getAttribute('data-id'), value: cos[i].querySelector('.' + by).innerHTML });
        }
    };

    createSortedArray = (sortArr, sortedArr) => {
        for (let i = 0; i < sortArr.length; i++) {
            sortedArr.push(sortArr[i].key);
        }
        this.setState({ ids: sortedArr });
    };

    sort = (by, cur) => {
        let remove = ['sortByChange', 'sortByMcap', 'sortByName', 'sortByPeRatio', 'sortBySector', 'sortBySharePrice'];
        const index = remove.indexOf(cur);
        remove.splice(index, 1);

        for (var j = 0; j < index; j++) {
            document.querySelector('.' + remove[j]).querySelectorAll('span')[1].innerHTML = '';
        }

        let dataOrder = document.querySelector('.' + cur);
        if (dataOrder.getAttribute('data-order') === 'asc') {
            dataOrder.setAttribute('data-order', 'desc');
            dataOrder.querySelectorAll('span')[1].innerHTML = '&#9662;';
        } else if (dataOrder.getAttribute('data-order') === 'desc') {
            dataOrder.setAttribute('data-order', 'asc');
            dataOrder.querySelectorAll('span')[1].innerHTML = '&#9652;';
        }

        var cos = document.querySelectorAll('.companyRow');
        var sortArr = [];
        var sortedArr = [];

        if (by === 'companyName' || by === 'companySector') {
            if (dataOrder.getAttribute('data-order') === 'asc') {
                this.createArrayForSorting(cos, sortArr, by);
                sortArr = sortArr.sort(function (a, b) {
                    return a.value.localeCompare(b.value);
                });
                this.createSortedArray(sortArr, sortedArr);
            } else if (dataOrder.getAttribute('data-order') === 'desc') {
                this.createArrayForSorting(cos, sortArr, by);
                sortArr = sortArr.sort(function (a, b) {
                    return b.value.localeCompare(a.value);
                });
                this.createSortedArray(sortArr, sortedArr);
            }
        } else if (by === 'change' || by === 'marketCap' || by === 'peRatio' || by === 'sharePrice') {
            if (dataOrder.getAttribute('data-order') === 'asc') {
                this.createArrayForSorting(cos, sortArr, by);
                sortArr = sortArr.sort(function (a, b) {
                    return a.value.replace('%', '') - b.value.replace('%', '');
                });
                this.createSortedArray(sortArr, sortedArr);
            } else if (dataOrder.getAttribute('data-order') === 'desc') {
                this.createArrayForSorting(cos, sortArr, by);
                sortArr = sortArr.sort(function (a, b) {
                    return b.value.replace('%', '') - a.value.replace('%', '');
                });
                this.createSortedArray(sortArr, sortedArr);
            }
        }
    };

    logout() {
        localStorage.removeItem('userInfo');
        this.props.history.push('/login');
        this.props.logout();
    }

    render() {
        const indices = ['SEN'];
        const midSmallIndices = ['MID', 'SML'];
        const usIndices = ['GSPC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                {this.props.isGuestMode && <div>Hi Guest</div>}
                {this.props.userName && (
                    <div>
                        <p>{this.props.userName}</p>
                        <GoogleLogout
                            clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.logout.bind(this)}
                        ></GoogleLogout>
                    </div>
                )}
                <Sidebar
                    searchEngine={this.state.searchEngine}
                    showMenu={this.state.showMenu}
                    showModal={this.state.showModal}
                    clicked={this.hideMenu}
                    changed={this.toggleSearchEngine}
                    sorted={this.sort}
                    postData={this.postData}
                />
                <Header clicked={this.hideMenu.bind(this)} />
                <div className={[styles.searchBar, 'search'].join(' ')}>
                    <input
                        onChange={this.filterCompanies.bind(this)}
                        type="textbox"
                        placeholder="Search for companies or sectors..."
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
                    {midSmallIndices.map((el) => {
                        return <MidSmallIndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                    {usIndices.map((el) => {
                        return <USIndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                </div>

                {false ? (
                    <div className={[styles.loader, 'loader'].join(' ')}>Loading...</div>
                ) : (
                    <div className="companiesContainer">
                        {this.state.ids.length >= 1
                            ? this.state.ids.map((el) => {
                                  return (
                                      <CompanySchema searchEngine={this.state.searchEngine} clicked={this.removeCompany} key={el} id={el} />
                                  );
                              })
                            : ''}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        email: state.email,
        isGuestMode: state.isGuest
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: () => dispatch({ type: 'GET_USER_DETAILS' }),
        logout: () => dispatch({ type: 'LOG_OUT' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screener);
