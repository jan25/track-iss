import OpenLocationCode from 'open-location-code-typescript';
import worldCities from './scripts/worldcities.json';
import {distance} from '@turf/turf';

const openNotifyURL = 'http://api.open-notify.org/iss-now.json';

export enum Status {
    Available = "Available",
    NotAvailable = "Not available"
}

export interface LatLong {
    latitude: number
    longitude: number
    status: Status
}

export interface PlusCode {
    code: string
    status: Status
}

export interface City {
    city: string
    country: string
    status: Status
}

export let defaultLatLong = (): LatLong => {
    return {
        latitude: 0,
        longitude: 0,
        status: Status.NotAvailable
    }
}

export let defaultPlusCode = (): PlusCode => {
    return {
        code: '',
        status: Status.NotAvailable
    }
}

export let defaultCity = (): City => {
    return {
        city: 'city',
        country: 'country',
        status: Status.NotAvailable
    };
}

export let getLatLong = async (): Promise<LatLong> => {
    return fetch(openNotifyURL)
        .then((res) => res.json())
        .then((data) => {
            return {
                latitude: parseFloat(data.iss_position.latitude),
                longitude: parseFloat(data.iss_position.longitude),
                status: Status.Available
            }
        })
        .catch((err) => {
            return {
                latitude: 0,
                longitude: 0,
                status: Status.NotAvailable
            }
        });
}

export let getPlusCode = (latLong: LatLong): PlusCode => {
    return {
        code: OpenLocationCode.encode(latLong.latitude, latLong.longitude),
        status: Status.Available
    };
}

export let getNearestCity = (latLong: LatLong): City => {
    let near: any;
    let minDist: number = 10000; // 'km'
    for (let city of worldCities) {
        let d: number = distance(
            [parseFloat(city.lng), parseFloat(city.lat)],
            [latLong.longitude, latLong.latitude],
            { units: 'kilometers' }
        );
        if (d < minDist) {
            minDist = d;
            near = city;
        }
    }
    return {
        city: near.city,
        country: near.country,
        status: Status.Available
    };
}

