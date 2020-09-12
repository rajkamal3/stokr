import React, { Component } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import styles from './invest.module.css';

class USIndicesSchema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            indices: {}
        };
    }

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://finance.yahoo.com/quote/%5E${this.props.id}`).then((res) => {
            const parsed = parse(res.data);

            const spxData = parsed.querySelector('.quote-header-section').childNodes[2].querySelector('div');
            const spxValue = spxData.querySelectorAll('span')[0].innerHTML;
            const spxChange = spxData.querySelectorAll('span')[1].innerHTML;
            this.setState({
                indices: {
                    spxValue: spxValue,
                    spxChange: spxChange
                }
            });
            console.log(this.state);
        });
    }

    render() {
        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none'
        };

        return (
            <div className={styles.indices}>
                <a
                    className="indexName"
                    style={anchorStyles}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`http://www.google.com/search?q=${this.props.id === 'GSPC' ? 'S%26P%20500' : 'NASDAQ%20100'}`.toLowerCase()}
                >
                    {this.props.id === 'GSPC' ? 'S&P 500' : 'NASDAQ 100'}
                    {this.state.indices.spxValue}
                    <br />
                    {this.state.indices.spxChange}
                </a>
            </div>
        );
    }
}

export default USIndicesSchema;
