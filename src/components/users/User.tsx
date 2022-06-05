import { ArrowLeftIcon, UserIcon } from '@heroicons/react/outline'
import { Link, useParams } from "react-router-dom";
import DashboardLayout from '../layout/DashboardLayout';
import { userType } from '../../../types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';

const User = () => {
    const { id } = useParams();

    const [assistant, setAssistant] = useState<userType>()
    useEffect(() => {
        axios.get(`${ApiUrl}admin/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setAssistant(response.data.admin)
        })
    }, [setAssistant])

    return (
        <DashboardLayout>
            <div className="min-h-full">
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <Link to="/setting/users">
                            <ArrowLeftIcon className="h-7 w-7 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
                <main className="py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <UserIcon className="h-10 w-10 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{assistant?.name}</h1>
                                <p className="text-sm font-medium text-gray-900">
                                    {assistant?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                            User Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{assistant?.gender}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    )
}

export default User