import React, { Component } from 'react';
import axios from 'axios';
import styles from './schema.module.css';

class MidSmallIndicesSchema extends Component {
    state = {
        indices: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://cors-stokr.herokuapp.com/https://iislliveblob.blob.core.windows.net/jsonfiles/Intraday/IntradayNIFTY%20${this.props.id}CAP%20100.json`
            )
            .then((res) => {
                const { lastPrice, pChange, change } = res.data;

                this.setState({
                    indices: {
                        value: lastPrice,
                        pChange: pChange,
                        change: change
                    }
                });
            });
    }

    render() {
        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none'
        };

        const searchEngine = this.props.searchEngine ? 'google' : 'bing';

        return (
            <div className={styles.indices}>
                <a
                    className="indexName"
                    style={anchorStyles}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`http://www.${searchEngine}.com/search?q=${
                        this.props.id === 'MID' ? 'Nifty%20Midcap%20100' : 'Nifty%20Smallcap%20100'
                    }`.toLowerCase()}
                >
                    {this.props.id === 'MID' ? 'Midcap 100' : 'NIFTY Smallcap 100'}&nbsp;
                    {this.state.indices.value}
                    <br />
                    {this.state.indices.change}&nbsp;{this.state.indices.pChange}%
                </a>
            </div>
        );
    }
}

export default MidSmallIndicesSchema;
