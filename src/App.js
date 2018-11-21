import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArrowKeysReact from 'arrow-keys-react';
import theMap from './map.js'
import { map } from 'lodash';

const basicView = [
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
  [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}]
];

const typeToColorMap = {
  blocked: '#333',
  openLand: '#888'
}

class App extends Component {
  constructor(props){
    super(props);

    ArrowKeysReact.config({
      left: () => {
        this.setState({
          locX: this.state.locX - 2,
          content: 'Key detected: left'
        });
        this.calculateVisibleMap({
          locX: this.state.locX - 2,
          locY: this.state.locY
        })
      },
      right: () => {
        this.setState({
          locX: this.state.locX + 2,
          content: 'Key detected: right'
        });
        this.calculateVisibleMap({
          locX: this.state.locX + 2,
          locY: this.state.locY
        })
      },
      up: () => {
        this.setState({
          locY: this.state.locY - 1,
          content: 'Key detected: up'
        });
        this.calculateVisibleMap({
          locX: this.state.locX,
          locY: this.state.locY - 1
        })
      },
      down: () => {
        this.setState({
          locY: this.state.locY + 1,
          content: 'Key detected: down'
        });
        this.calculateVisibleMap({
          locX: this.state.locX,
          locY: this.state.locY + 1
        })
      }
    });
  }

  state = {
    content: 'Use arrow keys on your keyboard!',
    locX: 15,
    locY: 15,
    view: [
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}]
    ]
  };

  calculateVisibleMap(newCoords) {
    const topLeftX = newCoords.locX - 3;
    const topLeftY = newCoords.locY - 3;

    console.log('X, Y', newCoords.locX, newCoords.locY)

    let newView = [
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}],
      [{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'},{tyleType: 'blocked'}, {tyleType: 'blocked'}]
    ];

    for(let i = 0; i < newView.length; i++) {
      for(let j = 0; j < newView[0].length; j++) {
        if(topLeftX + i >= 0 && topLeftX + i < theMap.length) {
          newView[i][j] = theMap[topLeftX + i][topLeftY + j];
        }
      }
    }

    this.state.view = newView;
  }

  componentDidMount() {
    this.calculateVisibleMap({
      locX: this.state.locX,
      locY: this.state.locY
    });
  }

  render() {
    return (
      <div {...ArrowKeysReact.events} tabIndex="1" style={{width: '100%', height: '100%', backgroundColor: '#efefef'}}>
        <div>{this.state.content}</div>
        <div className="App"  style={{width: '750px', height: '700px', backgroundColor: 'white', marginLeft: '20px', marginTop: '20px'}}>
          <svg viewBox="0 0 1350 1290">
            <g>
              <g className="grid">
                {map(this.state.view, (row, x) => {
                  return map(row, (cell, y) => {
                    cell = cell || {tyleType: 'blocked'};
                    return (
                      <g key={`${x}-${y}`} transform={`translate(${x*150},${x % 2 === 0 ? y*173 : y*173 + 87})`}>
                        <g>
                          <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87" style={{fill: typeToColorMap[cell.tyleType]}}></polygon>
                          <text dy="0.4em" transform="rotate(0)">
                            <tspan className="white-text">{x}</tspan>, <tspan className="white-text">{y}</tspan>
                          </text>
                        </g>
                      </g>
                    );
                  })
                })}
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
