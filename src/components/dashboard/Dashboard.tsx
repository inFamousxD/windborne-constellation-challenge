import type React from "react"
import type { DashboardProps } from "./Dashboard.types"
import Globe from "../globe/Globe"

const Dashboard: React.FC<DashboardProps> = (props) => {
    const {
        constellation,
        loading,
        windData,
        getWindAt
    } = props;

    console.log('constellation', constellation);

    return (
        <div>
            {!loading && (
                <Globe 
                    constellation={constellation} 
                    windData={windData}
                    getWindAt={getWindAt}
                />
            )}
        </div>
    )
}

export default Dashboard