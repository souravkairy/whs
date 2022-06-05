import axios from 'axios';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { ApiUrl } from '../../config/ApiConfig';
import PieChart from '../charts/PieChart'
import DashboardLayout from '../layout/DashboardLayout'

interface UseFormInputs {
    id: number;
    name: string
    email: string
    gender: string
    image: File[]
    placeOfBirth: string
    dateOfBirth: string
    studyGroups: any[]
    selected: number

}

const Dashboard = () => {
    const [students, setStudents] = useState<UseFormInputs[]>([])
    const [groupsData, setGroupsData] = useState<UseFormInputs[]>()
    const [assistants, setAssistants] = useState<UseFormInputs[]>()

    useEffect(() => {
        axios.get(`${ApiUrl}students`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setStudents(response.data.students)
            console.log(response.data.students);
        })

        axios.get(`${ApiUrl}groups`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setGroupsData(response.data.groups)
        })
        axios.get(`${ApiUrl}admins`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setAssistants(response.data.admins)
        })

    }, [setStudents])
    return (
        <>
            <DashboardLayout>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 px-4 py-3'>
                    <div className='border border-sky-200 p-4 rounded-sm flex flex-wrap justify-center'>
                        <div className='p-10 flex flex-col justify-center items-center space-y-5'>
                            <h3 className='text-3xl'>Total Student</h3>
                            <span className='border border-sky-200 rounded-full text-3xl h-20 w-20 flex justify-center items-center bg-sky-200'>{students?.length}</span>
                        </div>
                    </div>
                    <div className='border border-sky-200 p-4 rounded-sm flex flex-wrap justify-center'>
                        <div className='p-10 flex flex-col justify-center items-center space-y-5'>
                            <h3 className='text-3xl'>Total Groups</h3>
                            <span className='border border-sky-200 rounded-full text-3xl h-20 w-20 flex justify-center items-center bg-sky-200'>{groupsData?.length}</span>
                        </div>
                    </div>
                    <div className='border border-sky-200 p-4 rounded-sm'>
                        <div className='py-10 px-8 flex flex-col justify-center items-center space-y-5'>
                            <h3 className='text-3xl'>Total Assistance</h3>
                            <span className='border border-sky-200 rounded-full text-3xl h-20 w-20 flex justify-center items-center bg-sky-200'>{assistants?.length}</span>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard