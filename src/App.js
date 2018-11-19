import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ArrowKeysReact from 'arrow-keys-react';
import theMap from './map.js'
import { map } from 'lodash';

const basicView = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];

class App extends Component {
  constructor(props){
    super(props);

    ArrowKeysReact.config({
      left: () => {
        this.setState({
          locY: this.state.locY - 1,
          content: 'Key detected: left'
        });
        this.calculateVisibleMap({
          locX: this.state.locX,
          locY: this.state.locY - 1
        })
      },
      right: () => {
        this.setState({
          locY: this.state.locY + 1,
          content: 'Key detected: right'
        });
        this.calculateVisibleMap({
          locX: this.state.locX,
          locY: this.state.locY + 1
        })
      },
      up: () => {
        this.setState({
          locX: this.state.locX - 1,
          content: 'Key detected: up'
        });
        this.calculateVisibleMap({
          locX: this.state.locX - 1,
          locY: this.state.locY
        })
      },
      down: () => {
        this.setState({
          locX: this.state.locX + 1,
          content: 'Key detected: down'
        });
        this.calculateVisibleMap({
          locX: this.state.locX + 1,
          locY: this.state.locY
        })
      }
    });
  }

  state = {
    content: 'Use arrow keys on your keyboard!',
    locX: 15,
    locY: 15,
    view: [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ]
  };

  calculateVisibleMap(newCoords) {
    const topLeftX = newCoords.locX - 3;
    const topLeftY = newCoords.locY - 3;

    let newView = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];

    for(let i = 0; i < 7; i++) {
      for(let j = 0; j < 7; j++) {
        debugger;
        if(topLeftX + i >= 0) {
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
      <div {...ArrowKeysReact.events} tabIndex="1" style={{width: '100%', height: '100%', backgroundColor: 'gray'}}>
        <div>{this.state.content}</div>
        <div className="App"  style={{width: '800px', height: '800px', backgroundColor: 'black'}}>
          {
            map(this.state.view, (row, x) => {
              return <div className="flex-container">
                  {map(row, (cell, y) => {
                    return cell === 1
                      ? <div className="flex-item khaki"></div>
                      : <div className="flex-item"></div>

                  })}
                </div>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
