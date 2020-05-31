import React from 'react';
import { LatLong, latLongStr, PlusCode, Status, getLatLong, getPlusCode, defaultLatLong, defaultPlusCode } from './Api';
import './App.css';

export interface AppProps {
  // no props
}
 
export interface AppState {
  latLong: LatLong
  plusCode: PlusCode
}
 
class App extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props)
    this.state = {
      latLong: defaultLatLong(),
      plusCode: defaultPlusCode()
    }

    this.pollApi = this.pollApi.bind(this);
    this.queryApi = this.queryApi.bind(this);
  }

  componentDidMount() {
    this.queryApi();
    this.pollApi();
  }

  render() {
    return (
      <div>
        <h1>ISS is currently over</h1>
        <p>
          Lat long: { this.state.latLong.status === Status.Available ? latLongStr(this.state.latLong) : "Not available"}
        </p>
        <p>
          Plus code: { this.state.plusCode.status === Status.Available ? this.state.plusCode.code : "Not available"}
        </p>
      </div>
    );
  }

  pollApi() {
    setInterval(this.queryApi, 3000);
  }

  queryApi() {
    getLatLong()
    .then((latLong) => {
      this.setState({
        latLong,
        plusCode: getPlusCode(latLong)
      })
    })
  }
}
 
export default App;
