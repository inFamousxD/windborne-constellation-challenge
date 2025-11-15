import { useEffect, useState } from "react";
import windDataJson from "../../assets/wind_data.json";

interface WindGrid {
    header: {
        parameterNumberName: string;
        nx: number;
        ny: number;
        lo1: number;
        la1: number;
        dx: number;
        dy: number;
    };
    data: number[];
}

interface WindData {
    u: WindGrid;
    v: WindGrid;
}

export function useWindData() {
    const [windData, setWindData] = useState<WindData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadWindData = () => {
        setLoading(true);
        try {
            const data = windDataJson as WindGrid[];

            const uComponent = data.find(
                (d) => d.header.parameterNumberName === "U-component_of_wind"
            );
            const vComponent = data.find(
                (d) => d.header.parameterNumberName === "V-component_of_wind"
            );

            if (uComponent && vComponent) {
                setWindData({ u: uComponent, v: vComponent });
                console.log("wind loaded:", {
                    gridSize: `${uComponent.header.nx} x ${uComponent.header.ny}`,
                    resolution: `${uComponent.header.dx}° x ${uComponent.header.dy}°`,
                });
            }

            setLoading(false);
        } catch (error) {
            console.error("wind data load err:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWindData();
    }, []);

    const getWindAt = (
        lat: number,
        lng: number
    ): { u: number; v: number } | null => {
        if (!windData) return null;

        const { header: uHeader, data: uData } = windData.u;
        const { data: vData } = windData.v;

        const normLng = (lng + 360) % 360;
        const x = Math.floor((normLng - uHeader.lo1) / uHeader.dx);
        const y = Math.floor((uHeader.la1 - lat) / uHeader.dy);

        if (x < 0 || x >= uHeader.nx || y < 0 || y >= uHeader.ny) {
            return null;
        }

        const index = y * uHeader.nx + x;

        return {
            u: uData[index],
            v: vData[index],
        };
    };

    return { windData, loading, refetch: loadWindData, getWindAt };
}
