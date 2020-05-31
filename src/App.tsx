import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h3" gutterBottom style={{textAlign: 'center', marginTop: '10%'}}>
            Current position of the ISS
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Latitude and Longitude
          </Typography>
          <Typography variant="h5" gutterBottom>
            { this.state.latLong.status === Status.Available ? this.latLongStr(this.state.latLong) : "Not available"}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Plus code
          </Typography>
          <Typography variant="h5" gutterBottom>
            { this.state.plusCode.status === Status.Available ? this.state.plusCode.code : "Not available"}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Nearest city
          </Typography>
          <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
            { this.state.city.status === Status.Available ? this.cityStr(this.state.city) : "Not available" }
          </Typography>
        </Grid>
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
