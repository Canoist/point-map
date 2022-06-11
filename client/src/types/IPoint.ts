export default interface IPoint {
    type: string;
    properties: {
        _id: string;
        name: string;
        description: string;
        date: number;
    };
    geometry: {
        type: string;
        coordinates: number[];
    };
}
