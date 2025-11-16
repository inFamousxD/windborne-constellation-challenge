import Dashboard from "./Dashboard"
import { useConstellationData } from "../../hooks/useConstellationData"
import { useWindData } from "../../hooks/useWindData"

const DashboardContainer = () => {
    const {
        constellation,
        loading: constellationLoading,
        lastFetch,
        refetch,
        getBalloonTrajectory,
        getCurrentPositions
    } = useConstellationData();

    const {
        windData,
        loading: windLoading,
        getWindAt
    } = useWindData();

    if (!constellationLoading && constellation.length > 0) {
        console.log('data:', constellation);

        const currentPositions = getCurrentPositions();
        console.log(`balloon count: ${currentPositions?.length || 0}`);
        console.log('current position (sample):', currentPositions?.[0]);

        if (currentPositions && currentPositions.length > 0) {
            const balloon0Trajectory = getBalloonTrajectory(0);
            console.log('balloon 0 trajectory (24h):', balloon0Trajectory);
        }

        // Log wind data at first balloon position
        if (currentPositions && currentPositions.length > 0 && windData && !windLoading) {
            const balloon0 = currentPositions[0];
            const wind = getWindAt(balloon0[0], balloon0[1]);
            console.log('wind at balloon 0:', wind);
        }
    }

    return (
        <Dashboard
            constellation={constellation}
            loading={constellationLoading || windLoading}
            lastFetch={lastFetch}
            onRefresh={refetch}
            windData={windData}
            getWindAt={getWindAt}
        />
    )
}

export default DashboardContainer