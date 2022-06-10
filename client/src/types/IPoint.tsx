export default interface IPoint {
    type: { type: String };
    properties: {
        _id: String;
        name: String;
        description: String;
        date: Date;
    };
    geometry: {
        type: { type: String };
        coordinates: [Number];
    };
}
