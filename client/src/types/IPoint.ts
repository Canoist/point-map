export interface IPointProperties {
    _id: string;
    name: string;
    description: string;
    date: number;
    court: string;
    hoop: string[];
}

export default interface IPoint {
    type: string;
    properties: IPointProperties;
    geometry: {
        type: string;
        coordinates: number[];
    };
}
