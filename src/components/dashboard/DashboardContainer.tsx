import Dashboard from "./Dashboard"
import { useConstellationData } from "./useConstellationData"

const DashboardContainer = () => {
    const {
        constellation,
        loading,
        lastFetch,
        refetch,
        getBalloonTrajectory,
        getCurrentPositions
    } = useConstellationData();

    if (!loading && constellation.length > 0) {
        console.log('data:', constellation);

        const currentPositions = getCurrentPositions();
        console.log(`balloon count: ${currentPositions?.length || 0}`);
        console.log('current position (sample):', currentPositions?.[0]);

        if (currentPositions && currentPositions.length > 0) {
            const balloon0Trajectory = getBalloonTrajectory(0);
            console.log('balloon 0 trajectory (24h):', balloon0Trajectory);
        }
    }

    return (
        <Dashboard
            constellation={constellation}
            loading={loading}
            lastFetch={lastFetch}
            onRefresh={refetch}
        />
    )
}

export default DashboardContainer