import React, {Component} from 'react'
import { Chart } from "react-google-charts";

class CovidStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'stats': [
                ['Country', 'Popularity'],
            ]
        }
        this.loadCovidDataForAllCountries(this);        
    }
    

    loadCovidDataForAllCountries(instance) {
        fetch('https://coronavirus-19-api.herokuapp.com/countries', {
            'method': 'GET'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            var b = [], c = [],
                main = [],
                limit = 5;

            main.push(['Country', 'Active Cases']);
            data.forEach(function (a) {
                if (limit === 0) {
                    return
                }
                console.log('limit')
                limit -= 1;
                b = [];
                b.push(a.country);
                b.push(a.active ? a.active: 0);
                main.push(b);                
            });
            // console.log(main);
            instance.setState({
                'stats': main
            })            
        });
    }

    render() {
        return (
            <div className="Covid-Stats-Form">
                <h2>COVID GEO STATS</h2>
                <Chart
                    chartType="ColumnChart"
                    width="80%"
                    height="400px"
                    data={this.state.stats}
                    chartEvents={[
                        {
                        eventName: "ready",
                        callback: ({ chartWrapper, google }) => {
                            console.log('sdfsdf')
                            const chart = chartWrapper.getChart();
                            google.visualization.events.addListener(chart, "onmouseover", e => {
                                const { row, column } = e;
                                console.warn("MOUSE OVER ", { row, column });
                            });
                            google.visualization.events.addListener(chart, "onmouseout", e => {
                                const { row, column } = e;
                                console.warn("MOUSE OUT ", { row, column });
                            });
                        }
                        }
                    ]}
                    />
            </div>
        )
    }
}

export default CovidStats;
