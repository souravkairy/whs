import { UserGroupIcon, } from '@heroicons/react/solid'
import { ArrowLeftIcon, TrashIcon, UserIcon } from '@heroicons/react/outline'
import { Link, useParams } from "react-router-dom";
import DashboardLayout from '../layout/DashboardLayout';
import { Fragment, useEffect, useState } from 'react';
import { groupType, userType } from '../../../types';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';
import moment from "moment";
import { Dialog, Transition } from '@headlessui/react';
import Multiselect from 'multiselect-react-dropdown';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const groups = [
    {
        id: 1,
        name: 'group1',
    },
    {
        id: 1,
        name: 'group2',
    },
]
interface UseFormInputs {
    id: number;
    name: string
    email: string
    gender: string
    image: File[]
    placeOfBirth: string
    dateOfBirth: string
    studyGroups: any[]

}
const Student = () => {
    const { id } = useParams();
    const [studentData, setStudentData] = useState<userType>()
    const [groupData, setGroupData] = useState<groupType>()
    const [selected, setSelected] = useState<UseFormInputs[]>();
    const [groupId, setGroupId] = useState<any | null>(null)
    const [formOpenTwo, setFormOpenTwo] = useState(false)
    const [formOpenFour, setFormOpenFour] = useState(false)
    useEffect(() => {
        axios.get(`${ApiUrl}student/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setStudentData(response.data.student)
        })
        axios.get(`${ApiUrl}groups`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setGroupData(response.data.groups)
        })
    }, [setStudentData])
    const DOB = moment(studentData?.dateOfBirth).utc().format('YYYY-MM-DD')
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();
    const onSubmit = (data: UseFormInputs) => {

        const group_ids = selected!.map((id) => id.id);
        axios.patch(`${ApiUrl}student/${id}/assign-groups`,
            {
                group_ids: group_ids,
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }

        )
            .then((response) => {
                // const newData = students
                // newData!.push(data)
                // setStudents(newData)
                setFormOpenTwo(false)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
        // reset()
    }
    const handleDelete = () => {
        axios.patch(`${ApiUrl}student/${id}/remove-group`,
            {
                group_id: groupId
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        )
            .then((response) => {
                setFormOpenFour(false)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <DashboardLayout>
            <>
                <div className="min-h-full">
                    <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <Link to="/students">
                                <ArrowLeftIcon className="h-7 w-7 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <main className="py-10">
                        {/* Page header */}
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                            <div className="flex items-center space-x-5">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        {/* <img
                                            className="h-16 w-16 rounded-full"
                                            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                            alt=""
                                        /> */}
                                        <UserIcon className="w-16 h-16 text-sky-500" aria-hidden="true" />
                                        <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{studentData?.name}</h1>
                                    <p className="text-sm font-medium text-gray-900">
                                        {studentData?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                {/* Description list*/}
                                <section aria-labelledby="applicant-information-title">
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                Student Information
                                            </h2>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                                                    <dd className="mt-1 text-sm text-gray-900"> {DOB}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Place of birth</dt>
                                                    <dd className="mt-1 text-sm text-gray-900"> {studentData?.placeOfBirth}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                    <dd className="mt-1 text-sm text-gray-900"> {studentData?.gender}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <section aria-labelledby="groups-title" className="lg:col-start-3 lg:col-span-1">
                                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                    <h2 id="groups-title" className="text-lg font-medium text-gray-900">
                                        Existing Groups
                                    </h2>

                                    {/* Activity Feed */}
                                    <div className="mt-6 flow-root">
                                        <ul role="list" className="-mb-8">
                                            {studentData?.studyGroups?.map((item, itemIdx) => (
                                                <li key={item.id}>
                                                    <div className="relative pb-6">
                                                        {itemIdx !== groups.length - 1 ? (
                                                            <span
                                                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"
                                                            />
                                                        ) : null}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span
                                                                    className='bg-gray-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                                >
                                                                    <UserGroupIcon className="w-5 h-5 text-white" aria-hidden="true" />
                                                                </span>
                                                            </div>
                                                            <div className="min-w-0 flex-1 pt-1 flex justify-between space-x-4">
                                                                <div>
                                                                    <p className="text-base text-gray-500">
                                                                        {item.name}{' '}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                    <button type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-red-500 bg-red-100 border-red-200" title="Trash">
                                                                        <TrashIcon onClick={() => [setFormOpenFour(true), setGroupId(item.id)]} className="h-6 w-6" aria-hidden="true" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-6 flex flex-col justify-stretch">
                                        <button
                                            onClick={() => setFormOpenTwo(true)}
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                        >
                                            Assign to a new group
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
                <Transition.Root show={formOpenFour} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setFormOpenFour}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div>
                                                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
                                                    <TrashIcon className="h-20 w-20 text-red-500 p-4" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-5">
                                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                        Are you want to delete this student?
                                                    </Dialog.Title>
                                                </div>
                                                <div className="pt-5">
                                                    <div className="grid grid-cols-2">
                                                        <button type='button' className='bg-sky-600 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenFour(false)}>Close</button>
                                                        <button type="submit" onClick={() => handleDelete()} className="inline-flex px-6 justify-center py-2 border shadow-sm text-sm font-medium rounded-sm text-white bg-red-500 hover:bg-sky-700">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <Transition.Root show={formOpenTwo} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setFormOpenTwo}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full sm:p-6 h-screen">
                                        <div className="">
                                            <h3 className='text-2xl font-semibold'>Add Student to groups</h3>
                                        </div>
                                        <div>
                                            <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
                                                <div className=" divide-gray-200">
                                                    <div className="mt-6 space-y-6">
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Group Name
                                                            </label>
                                                            <div className="mt-1">
                                                                {/* @ts-ignore */}
                                                                <Multiselect
                                                                    disablePreSelectedValues
                                                                    displayValue="name"
                                                                    onKeyPressFn={function noRefCheck() { }}
                                                                    onRemove={function noRefCheck() { }}
                                                                    onSearch={function noRefCheck() { }}
                                                                    onSelect={setSelected}
                                                                    options={groupData}
                                                                    selectionLimit={4}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 pt-6">
                                                    <button type='button' className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenTwo(false)}>Close</button>
                                                    <button type="submit" className="inline-flex px-6 justify-center py-2 border shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700">
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </>
        </DashboardLayout>
    )
}

export default Student