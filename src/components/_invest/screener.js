import React, { Component } from 'react';
import CompanySchema from './companySchema';
import styles from './invest.module.css';

class Screener extends Component {
    companiesFilter () {
        var input = document.querySelector('.inputValue').value.toLowerCase();
        var companiesArray = document.querySelectorAll('.companyName');
        var companyRow = document.querySelectorAll('.companyRow');
        
        for (var i = 0; i < companiesArray.length; i++) {
            var currentCompany = companiesArray[i];
            var currentCompanyName = currentCompany.textContent || currentCompany.innerText;
            
            if (currentCompanyName.toLowerCase().indexOf(input) > -1) {
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
        const bajajAuto = 'https://www.moneycontrol.com/india/stockpricequote/auto-23-wheelers/bajajauto/BA10';
        const bergerPaints = 'https://www.moneycontrol.com/india/stockpricequote/paintsvarnishes/bergerpaintsindia/BPI02';
        const britannia = 'https://www.moneycontrol.com/india/stockpricequote/food-processing/britanniaindustries/BI';
        const cclProducts = 'https://www.moneycontrol.com/india/stockpricequote/plantations-teacoffee/cclproductsindia/CC10';
        const colgate = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/colgatepalmoliveindia/CPI';
        const dmart = 'https://www.moneycontrol.com/india/stockpricequote/retail/avenuesupermarts/AS19';
        const dilipBuildcon = 'https://www.moneycontrol.com/india/stockpricequote/constructioncontracting-civil/dilipbuildcon/DB04';
        const exideInd = 'https://www.moneycontrol.com/india/stockpricequote/auto-ancillaries/exideindustries/EI';
        const finolexCables = 'https://www.moneycontrol.com/india/stockpricequote/cables-telephone/finolexcables/FC01';
        const godrejConsumer = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/godrejconsumerproducts/GCP';
        const gujAlkali = 'https://www.moneycontrol.com/india/stockpricequote/chemicals/gujaratalkalieschemicals/GAC01';
        const hdfcBank = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/hdfcbank/HDF01';
        const hdfcLife = 'https://www.moneycontrol.com/india/stockpricequote/miscellaneous/hdfclifeinsurancecompanylimited/HSL01';
        const hul = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/hindustanunilever/HU';
        const havells = 'https://www.moneycontrol.com/india/stockpricequote/electric-equipment/havellsindia/HI01';
        const iciciLombard = 'https://www.moneycontrol.com/india/stockpricequote/diversified/icicilombardgeneralinsurancecompany/ILG';
        const itc = 'https://www.moneycontrol.com/india/stockpricequote/cigarettes/itc/ITC';
        const indusindBank = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/indusindbank/IIB';
        const jubilantFood = 'https://www.moneycontrol.com/india/stockpricequote/miscellaneous/jubilantfoodworks/JF04';
        const kotakMahindra = 'https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/kotakmahindrabank/KMB';
        const lupin = 'https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/lupin/L';
        const marico = 'https://www.moneycontrol.com/india/stockpricequote/personal-care/marico/M13';
        const mindtree = 'https://www.moneycontrol.com/india/stockpricequote/computers-software/mindtree/MT13';
        const mothersonSumi = 'https://www.moneycontrol.com/india/stockpricequote/auto-ancillaries/mothersonsumisystems/MSS01';
        const muthootFinance = 'https://www.moneycontrol.com/india/stockpricequote/finance-investments/muthootfinance/MF10';
        const nbccIndia = 'https://www.moneycontrol.com/india/stockpricequote/infrastructure-general/nbccindia/NBC01';
        const ncc = 'https://www.moneycontrol.com/india/stockpricequote/constructioncontracting-civil/ncc/NCC01';
        const nestle = 'https://www.moneycontrol.com/india/stockpricequote/food-processing/nestleindia/NI';
        const pidiliteInd = 'https://www.moneycontrol.com/india/stockpricequote/chemicals/pidiliteindustries/PI11';
        const relaxoFootwear = 'https://www.moneycontrol.com/india/stockpricequote/leather-products/relaxofootwears/RF07';
        const sbiLife = 'https://www.moneycontrol.com/india/stockpricequote/diversified/sbilifeinsurancecompany/SLI03';
        const sunTv = 'https://www.moneycontrol.com/india/stockpricequote/mediaentertainment/suntvnetwork/STN01';
        const tcs = 'https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS';
        const vipIndustries = 'https://www.moneycontrol.com/india/stockpricequote/plastics/vipindustries/VIP';
        const voltas = 'https://www.moneycontrol.com/india/stockpricequote/diversified/voltas/V';
        const whirlpool = 'https://www.moneycontrol.com/india/stockpricequote/consumer-goods-white-goods/whirlpoolindia/WI';

        const companies = [aartiIndustries, apolloTyres, asianPaints, bajajAuto, bergerPaints, britannia, cclProducts, colgate, dmart, dilipBuildcon, exideInd, finolexCables,
        godrejConsumer, gujAlkali, hdfcBank, hdfcLife, hul, havells, iciciLombard, itc, indusindBank, jubilantFood, kotakMahindra, lupin, marico, mindtree, mothersonSumi,
        muthootFinance, nbccIndia, ncc, nestle, pidiliteInd, relaxoFootwear, sbiLife, sunTv, tcs, vipIndustries, voltas, whirlpool];

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <input onChange={this.companiesFilter.bind(this)} type='textbox' placeholder='Search for companies...' className={[styles.textbox, 'inputValue'].join(' ')} />
                </div>
                {companies.map((el) => {
                    return <CompanySchema key={Math.random()} link={el} />
                })}
            </div>
        );
    }
}

export default Screener;