import OpenLocationCode from 'open-location-code-typescript';

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

export let latLongStr = (latLong: LatLong): string => {
    let latStr: string = `${Math.abs(latLong.latitude)}` + `${latLong.latitude > 0 ? '° N, ' : '° S, '}`;
    let longStr: string = `${Math.abs(latLong.longitude)}` + `${latLong.longitude > 0 ? '° E' : '° W'}`;
    return `${latStr} ${longStr}`;
}

export let getPlusCode = (latLong: LatLong): PlusCode => {
    return {
        code: OpenLocationCode.encode(latLong.latitude, latLong.longitude),
        status: Status.Available
    };
}