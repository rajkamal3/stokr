import React, { Component } from 'react';
import axios from 'axios';
import parse from 'node-html-parser';

class Exp extends Component {
    state = {};

    componentDidMount() {
        const comp = 'raj rayon';
        axios
            .get(`https://cors-anywhere.herokuapp.com/https://www.bing.com/search?q=moneycontrol%20stockpricequote%20${comp}`)
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
                axios.get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${compCode}`).then((res) => {
                    console.log(res);
                });
            });
        // var id = huell
        //     .querySelector('#search')
        //     .querySelector('div')
        //     .querySelector('div')
        //     .querySelector('div')
        //     .querySelector('div')
        //     .querySelector('div')
        //     .querySelector('a')
        //     .getAttribute('href')
        //     .split('/')[7];
        // console.log(id);
        // });
    }

    render() {
        return <div>Huell</div>;
    }
}

export default Exp;

// var com = document.querySelector('#search').querySelector('div').querySelector('div').querySelector('div').querySelector('div').querySelector('div').querySelector('a').getAttribute('href').split('/')[7];

// fetch(`https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/${com}`).then(res => {
//     return res.text();
// }).then(resp => {
//     console.log(resp);
// });

//-

// var a = document.evaluate('//a[contains(@href, "playnow")]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

// // console.log(a);

// // if(a){
// //    window.location.href = a.href;
// // }

// var huell = document.querySelectorAll('.main_sticky_menu')[7];
// console.log(window.location.href = huell.querySelector('a').getAttribute('href'));
