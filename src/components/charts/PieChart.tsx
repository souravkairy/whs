import React, { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);




const PieChart: FC<{ data1: any }> = ({ data1 }) => {
    return (
        <Pie data={data1} />
    )
}

export default PieChart