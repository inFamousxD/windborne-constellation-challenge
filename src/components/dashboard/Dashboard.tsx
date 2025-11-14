import type React from "react"
import type { DashboardProps } from "./Dashboard.types"

const Dashboard: React.FC<DashboardProps> = (props) => {
    const {
        constellation,
    } = props;

    console.log('constellation', constellation);

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard