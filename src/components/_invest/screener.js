import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import styles from './invest.module.css';

class Screener extends Component {
    companiesFilter() {
        var input = document.querySelector('.inputValue').value.toLowerCase();
        var companiesNamesArray = document.querySelectorAll('.companyName');
        var companiesSectorArray = document.querySelectorAll('.companySector');
        var companyRow = document.querySelectorAll('.companyRow');

        for (var i = 0; i < companiesNamesArray.length; i++) {
            var currentCompany = companiesNamesArray[i];
            var currentSector = companiesSectorArray[i];
            var currentCompanyName = currentCompany.textContent || currentCompany.innerText;
            var currentSectorName = currentSector.textContent || currentSector.innerText;

            if (currentCompanyName.toLowerCase().indexOf(input) > -1 || currentSectorName.toLowerCase().indexOf(input) > -1) {
                companyRow[i].style.display = '';
            } else {
                companyRow[i].style.display = 'none';
            }
        }
    }

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

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <input
                        onChange={this.companiesFilter.bind(this)}
                        type="textbox"
                        placeholder="Search for companies..."
                        className={[styles.textbox, 'inputValue'].join(' ')}
                    />
                </div>
                <div className={styles.indicesContainer}>
                    {indices.map((el) => {
                        return <IndicesSchema key={el} id={el} />;
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
