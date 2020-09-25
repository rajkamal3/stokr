import React, { Component } from 'react';
import axios from 'axios';
import styles from './schema.module.css';

class IndicesSchema extends Component {
    state = {
        indices: {}
    };

    componentDidMount() {
        this.getLiveData();
        // setInterval(this.getLiveData, 30000);
    }

    getLiveData = () => {
        axios
            .get(`https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3B${this.props.id}`)
            .then((res) => {
                let details = res.data.data;
                this.setState({
                    indices: {
                        name: details.company,
                        current: details.pricecurrent,
                        pointChange: details.pricechange,
                        percentageChange: details.PERCCHANGE
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                    href={`http://www.${searchEngine}.com/search?q=${this.state.indices.name}`.toLowerCase()}
                >
                    {this.state.indices.name} {this.state.indices.current}
                    <br />
                    {(this.state.indices.pointChange * 1).toFixed(2)} {this.state.indices.percentageChange}%
                </a>
            </div>
        );
    }
}

export default IndicesSchema;
