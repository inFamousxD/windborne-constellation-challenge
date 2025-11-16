import { useEffect, useState } from "react";
import axios from "axios";
import type { BalloonData, BalloonPosition, ConstellationSnapshot } from "../components/dashboard/Dashboard.types";

interface ConstellationState {
    constellation: BalloonData[];
    loading: boolean;
    lastFetch: Date | null;
}

export function useConstellationData() {
    const [state, setState] = useState<ConstellationState>({
        constellation: [],
        loading: true,
        lastFetch: null,
    });

    const fetchAllData = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        const requests = Array.from({ length: 24 }, async (_, i) => {
            const hour = String(i).padStart(2, "0");
            const apiBase = import.meta.env.DEV
                ? "/api"
                : "https://api.cors.lol/?url=https://a.windbornesystems.com";
            const response = await axios.get<ConstellationSnapshot>(`${apiBase}/treasure/${hour}.json`);

            return ({
                hour: i,
                data: response.data,
            });
        });

        try {
            const results = await Promise.all(requests);

            const sortedResults = results.sort((a, b) => a.hour - b.hour);

            setState({
                constellation: sortedResults,
                loading: false,
                lastFetch: new Date(),
            });

            console.log(`data loaded: ${results.length}`);
            console.log(`total tracked: ${results[0]?.data.length || 0}`);
            console.log("sample (index 0, current):", results[0]?.data[0]);
        } catch (error) {
            console.error("failed to fetch:", error);
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const getBalloonTrajectory = (
        balloonId: number
    ): Array<{ hour: number; position: BalloonPosition | undefined }> => {
        return state.constellation.map((snapshot) => ({
            hour: snapshot.hour,
            position: snapshot.data[balloonId],
        }));
    };

    const getCurrentPositions = (): ConstellationSnapshot | undefined => {
        return state.constellation.find((s) => s.hour === 0)?.data;
    };

    return {
        ...state,
        refetch: fetchAllData,
        getBalloonTrajectory,
        getCurrentPositions,
    };
}
