import IPoint from "../types/IPoint";

const points: IPoint[] = [
    {
        type: "Feature",
        properties: {
            _id: "60.6788189882135130.00185121217478",
            name: "База рафтинга Кивиниеми",
            description: "Основную часть кода писал здесь",
            date: 1652247815757,
        },
        geometry: {
            type: "Point",
            coordinates: [60.67881898821351, 30.00185121217478],
        },
    },
    {
        type: "Feature",
        properties: {
            _id: "60.4475909774236330.28923155946069",
            name: "Фигурное озеро",
            description:
                "Был судьей на соревнованиях по рафингу на этом озере 14-15 мая",
            date: 1652647215757,
        },
        geometry: {
            type: "Point",
            coordinates: [60.44759097742363, 30.28923155946069],
        },
    },
];

export default points;