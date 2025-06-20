import React, { Component } from 'react';
import CompanySchema from '../schemas/companySchema';
// import IndicesSchema from '../schemas/indicesSchema';
// import MidSmallIndicesSchema from '../schemas/midsmallIndicesSchema';
// import USIndicesSchema from '../schemas/usIndicesSchema';
import Header from '../../components/ui/header';
import Sidebar from '../../components/ui/sidebar';
import axios from 'axios';
import styles from './screener.module.css';
import { connect } from 'react-redux';
import { niftySmallcap250 } from './../../data/indices/niftySmallcap250';
import Form from 'react-bootstrap/Form';

class Screener extends Component {
    state = {
        name: '',
        email: '',
        ids: [],
        showMenu: false,
        modalActive: false,
        searchEngine: false,
        typing: '',
        searchResults: []
    };

    componentDidMount() {
        if (this.props.history.location.pathname.split('/')[2] === 'guest') {
            let companies = localStorage.getItem('companies');

            if (!companies) {
                localStorage.setItem('companies', ['RI']);
            }

            this.setState({
                ids: localStorage.getItem('companies').split(',')
            });
        } else {
            if (this.props.userName === '') {
                this.props.getUserDetails();
            }

            this.setState({
                userId: this.props.userId,
                name: this.props.userName,
                email: this.props.email
            });

            axios
                .get(
                    `https://stokr-beta.firebaseio.com/${
                        this.props.userId === null ? this.state.userId : JSON.parse(localStorage.getItem('userInfo')).userId
                    }/companies.json`
                )
                .then((res) => {
                    this.setState({ ids: res.data });
                });
        }
        document.body.style.overflow = 'auto';
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

    addNewCompany = (e) => {
        const typedValue = e.target.value.toLowerCase();

        this.setState({
            typing: typedValue
        });

        if (typedValue.length >= 3) {
            const matchingCompanies = niftySmallcap250.filter((el) => el.name.toLowerCase().startsWith(typedValue)) || false;

            this.setState({ searchResults: matchingCompanies });
        } else if (typedValue.length < 3) {
            this.setState({ searchResults: [] });
        }
    };

    hideMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });

        if (this.state.showMenu) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    };

    removeCompany = (comp) => {
        const currentCompanies = this.state.ids;
        const removeCompany = comp.target.getAttribute('data-id');
        const removeCompanyIndex = currentCompanies.indexOf(removeCompany);
        currentCompanies.splice(removeCompanyIndex, 1);
        this.setState({ ids: currentCompanies });

        if (this.props.history.location.pathname.split('/')[2] === 'guest') {
            localStorage.removeItem('companies');
            localStorage.setItem('companies', currentCompanies);
        } else {
            axios.put(
                `https://stokr-beta.firebaseio.com/${
                    this.props.userId === null ? this.state.userId : JSON.parse(localStorage.getItem('userInfo')).userId
                }/companies/.json`,
                this.state.ids
            );
        }
    };

    toggleSearchEngine = () => {
        this.setState({ searchEngine: !this.state.searchEngine });
    };

    postData = () => {
        if (this.props.history.location.pathname.split('/')[2] === 'guest') {
            localStorage.setItem('companies', this.state.ids);
            document.querySelector('.sortSave').innerHTML = 'Saved!';
            setTimeout(() => {
                document.querySelector('.sortSave').innerHTML = 'Save';
            }, 3000);
        } else {
            axios
                .put(
                    `https://stokr-beta.firebaseio.com/${
                        this.props.userId === null ? this.state.userId : JSON.parse(localStorage.getItem('userInfo')).userId
                    }/companies/.json`,
                    this.state.ids
                )
                .then((res) => {
                    document.querySelector('.sortSave').innerHTML = 'Saved!';
                    setTimeout(() => {
                        document.querySelector('.sortSave').innerHTML = 'Save';
                    }, 3000);
                });
        }
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

    setSelectedCompany = (compCode) => {
        let currentIds;

        if (!this.state.ids) {
            return;
        } else {
            currentIds = this.state.ids;
        }

        if (!currentIds.includes(compCode)) {
            currentIds.unshift(compCode);
        } else {
            alert('Company already exists!');

            document.querySelector('.inputValue').value = '';
        }

        if (this.props.history.location.pathname.split('/')[2] === 'guest') {
            localStorage.setItem('companies', currentIds);
        } else {
            axios.put(
                `https://stokr-beta.firebaseio.com/${
                    this.props.userId === null ? this.state.userId : JSON.parse(localStorage.getItem('userInfo')).userId
                }/companies/.json`,
                currentIds
            );
        }

        this.setState({ searchResults: [] });
    };

    changeSelection = (e) => {
        if (e.target.value === 'Nifty Smallcap 250') {
            const niftySmallcap250Ids = niftySmallcap250.map((el) => el.id);
            this.setState({ ids: niftySmallcap250Ids });
        }

        if (e.target.value === 'My Companies') {
            axios
                .get(
                    `https://stokr-beta.firebaseio.com/${
                        this.props.userId === null ? this.state.userId : JSON.parse(localStorage.getItem('userInfo')).userId
                    }/companies.json`
                )
                .then((res) => {
                    this.setState({ ids: res.data });
                });
        }
    };

    render() {
        // const indices = ['NSX', 'ccx'];
        // const midSmallIndices = ['SML'];
        // const usIndices = ['GSPC'];

        return (
            <div className={[styles.container, 'container'].join(' ')}>
                <Sidebar
                    searchEngine={this.state.searchEngine}
                    showMenu={this.state.showMenu}
                    showModal={this.state.showModal}
                    clicked={this.hideMenu}
                    changed={this.toggleSearchEngine}
                    sorted={this.sort}
                    postData={this.postData}
                    history={this.props.history}
                />
                <Header clicked={this.hideMenu.bind(this)} />

                <div
                    className={[styles.searchBar, 'search'].join(' ')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <input
                                onChange={this.addNewCompany.bind(this)}
                                type="textbox"
                                placeholder="Search for companies or sectors..."
                                className={[styles.textbox, 'inputValue'].join(' ')}
                            />
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                width: '100%'
                            }}
                        >
                            {this.state.searchResults.length > 0 && (
                                <>
                                    {this.state.searchResults.map((el) => {
                                        return (
                                            <div
                                                key={el.id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <button
                                                    style={{
                                                        width: '84%',
                                                        borderRadius: '8px'
                                                    }}
                                                    onClick={this.setSelectedCompany.bind(this, el.id)}
                                                    className={styles.searchResults}
                                                >
                                                    {el.name}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className={styles.indicesContainer}>
                    {indices.map((el) => {
                        return <IndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                    {midSmallIndices.map((el) => {
                        return <MidSmallIndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                    {usIndices.map((el) => {
                        return <USIndicesSchema searchEngine={this.state.searchEngine} key={el} id={el} />;
                    })}
                </div> */}

                <div>
                    <Form.Group>
                        <Form.Control as="select" onChange={this.changeSelection.bind(this)}>
                            <option>My Companies</option>
                            <option>Nifty Smallcap 250</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className="companiesContainer">
                    {this.state.ids
                        ? this.state.ids.map((el) => {
                              return <CompanySchema searchEngine={this.state.searchEngine} clicked={this.removeCompany} key={el} id={el} />;
                          })
                        : ''}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        email: state.email,
        userId: state.userId,
        isGuestMode: state.isGuest
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: () => dispatch({ type: 'GET_USER_DETAILS' }),
        getGuest: () => dispatch({ type: 'GUEST_MODE' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screener);
