import React from 'react'
import requireAuth from './hoc/requireAuth';

function Dashboard() {
    return (
        <div>
            Dashboard
        </div>
    )
}

export default requireAuth(Dashboard);
