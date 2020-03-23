import React, { Component } from 'react';
import CompanySchema from './companySchema';
import IndicesSchema from './indicesSchema';
import styles from './invest.module.css';

class Screener extends Component {
    companiesFilter () {
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
        const aartiIndustries = 'https://www.moneycontrol.com/india/stockpricequote/chemicals/aartiindustries/AI45';
        const apolloTyres = 'https://www.moneycontrol.com/india/stockpricequote/tyres/apollotyres/AT14';
        const asianPaints = 'https://www.moneycontrol.com/india/stockpricequote/paintsvarnishes/asianpaints/AP31';
        const avenueSupermarts = 'https://www.moneycontrol.com/india/stockpricequote/retail/avenuesupermarts/AS19';
        const bajajAuto = 'https://www.moneycontrol.com/india/stockpricequote/auto-23-wheelers/bajajauto/BA10';
        const bajajFinance = 'https://www.moneycontrol.com/india/stockpricequote/finance-leasinghire-purchase/bajajfinance/BAF';
        const bergerPaints = 'https://www.moneycontrol.com/india/stockpricequote/paintsvarnishes/bergerpaintsindia/BPI02';
        const britannia = 'https://www.moneycontrol.com/india/stockpricequote/food-processing/britanniaindustries/BI';
        const godrejConsumer = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/godrejconsumerproducts/GCP';
        const havells = 'https://www.moneycontrol.com/india/stockpricequote/electric-equipment/havellsindia/HI01';
        const hdfc = 'https://www.moneycontrol.com/india/stockpricequote/finance-housing/housingdevelopmentfinancecorporation/HDF';
        const hdfcBank = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/hdfcbank/HDF01';
        const hdfcLife = 'https://www.moneycontrol.com/india/stockpricequote/miscellaneous/hdfclifeinsurancecompanylimited/HSL01';
        const hul = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/hindustanunilever/HU';
        const iciciBank = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/icicibank/ICI02';
        const iciciLombard = 'https://www.moneycontrol.com/india/stockpricequote/diversified/icicilombardgeneralinsurancecompany/ILG';
        const indusindBank = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/indusindbank/IIB';
        const infosys = 'https://www.moneycontrol.com/india/stockpricequote/computers-software/infosys/IT';
        const itc = 'https://www.moneycontrol.com/india/stockpricequote/cigarettes/itc/ITC';
        const jubilantFood = 'https://www.moneycontrol.com/india/stockpricequote/miscellaneous/jubilantfoodworks/JF04';
        const kotakMahindra = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/kotakmahindrabank/KMB';
        const marico = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/marico/M13';
        const muthootFinance = 'https://www.moneycontrol.com/india/stockpricequote/finance-investments/muthootfinance/MF10';
        const nestle = 'https://www.moneycontrol.com/india/stockpricequote/food-processing/nestleindia/NI';
        const pidiliteInd = 'https://www.moneycontrol.com/india/stockpricequote/chemicals/pidiliteindustries/PI11';
        const relaxoFootwear = 'https://www.moneycontrol.com/india/stockpricequote/leather-products/relaxofootwears/RF07';
        const reliance = 'https://www.moneycontrol.com/india/stockpricequote/refineries/relianceindustries/RI';
        const sbiLife = 'https://www.moneycontrol.com/india/stockpricequote/diversified/sbilifeinsurancecompany/SLI03';
        const tcs = 'https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS';
        const titan = 'https://www.moneycontrol.com/india/stockpricequote/miscellaneous/titancompany/TI01';
        const vipIndustries = 'https://www.moneycontrol.com/india/stockpricequote/plastics/vipindustries/VIP';
        const voltas = 'https://www.moneycontrol.com/india/stockpricequote/diversified/voltas/V';
        
        const indices = 'https://www.moneycontrol.com/';

        const companies = [aartiIndustries, apolloTyres, asianPaints, avenueSupermarts, bajajAuto, bajajFinance,
        bergerPaints, britannia, godrejConsumer, havells, hdfc, hdfcBank, hdfcLife, hul, iciciBank, iciciLombard,
        indusindBank, infosys, itc, jubilantFood, kotakMahindra, marico, muthootFinance, nestle, pidiliteInd,
        relaxoFootwear, reliance, sbiLife, tcs, titan, vipIndustries, voltas];

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <input onChange={this.companiesFilter.bind(this)} type='textbox' placeholder='Search for companies...' className={[styles.textbox, 'inputValue'].join(' ')} />
                </div>
                <IndicesSchema link={indices} />
                {companies.map((el) => {
                    return <CompanySchema key={Math.random()} link={el} />
                })}
            </div>
        );
    }
}

export default Screener;
