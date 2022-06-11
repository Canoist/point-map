export default interface IPoint {
    type: String;
    properties: {
        _id: String;
        name: String;
        description: String;
        date: number;
    };
    geometry: {
        type: String;
        coordinates: Number[];
    };
}
