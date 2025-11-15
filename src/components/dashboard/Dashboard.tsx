import type React from "react"
import type { DashboardProps } from "./Dashboard.types"
import Globe from "./Globe"

const Dashboard: React.FC<DashboardProps> = (props) => {
    const {
        constellation,
        loading,
    } = props;

    console.log('constellation', constellation);

    return (
        <div>
            {!loading && <Globe constellation={constellation} />}
        </div>
    )
}

export default Dashboard