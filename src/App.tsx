import React from 'react';
import { LatLong, PlusCode,City,  Status, getLatLong, getPlusCode, defaultLatLong, defaultPlusCode, defaultCity, getNearestCity } from './Api';
import './App.css';

export interface AppProps {
  // no props
}
 
export interface AppState {
  latLong: LatLong
  plusCode: PlusCode
  city: City
}
 
class App extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props)
    this.state = {
      latLong: defaultLatLong(),
      plusCode: defaultPlusCode(),
      city: defaultCity()
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
          Lat long: { this.state.latLong.status === Status.Available ? this.latLongStr(this.state.latLong) : "Not available"}
        </p>
        <p>
          Plus code: { this.state.plusCode.status === Status.Available ? this.state.plusCode.code : "Not available"}
        </p>
        <p>
          Closest city: { this.state.city.status === Status.Available ? this.cityStr(this.state.city) : "Not available" }
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
      this.setState({
        city: getNearestCity(latLong)
      })
    });
  }

  latLongStr(latLong: LatLong): string {
    let latStr: string = `${Math.abs(latLong.latitude)}${latLong.latitude > 0 ? '° N, ' : '° S, '}`;
    let longStr: string = `${Math.abs(latLong.longitude)}${latLong.longitude > 0 ? '° E' : '° W'}`;
    return `${latStr} ${longStr}`;
  }

  cityStr(city: City): string {
    return `${city.city}, ${city.country}`;
  }
}
 
export default App;
