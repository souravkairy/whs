import { useState, Fragment, useEffect } from 'react'
import { UserGroupIcon } from '@heroicons/react/solid'
import { ArrowLeftIcon, EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { Link, useParams } from "react-router-dom";
import DashboardLayout from '../layout/DashboardLayout';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';
import { groupType } from '../../../types/index'
import { Dialog, Transition } from '@headlessui/react'
import Multiselect from 'multiselect-react-dropdown';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

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

const Group = () => {
    const [formOpenTwo, setFormOpenTwo] = useState(false)
    const { id } = useParams();
    const [groupData, setGroupData] = useState<groupType>()
    const [students, setStudents] = useState<UseFormInputs[]>()
    const [selected, setSelected] = useState<UseFormInputs[]>();
    const [stdId, setStdId] = useState<any | null>(null)
    const [formOpenFour, setFormOpenFour] = useState(false)

    useEffect(() => {
        axios.get(`${ApiUrl}group/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setGroupData(response.data.group)
        })

        axios.get(`${ApiUrl}students`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setStudents(response.data.students)
            toast.success(response.data.message)
        })

    }, [setGroupData, setStudents])
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();
    const onSubmit = (data: UseFormInputs) => {
        const student_ids = selected!.map((id) => id.id);

        axios.patch(`${ApiUrl}group/${id}/assign-students`,
            {
                student_ids: student_ids,
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
                // setFormOpenOne(false)
                // console.log(response.data)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
        // reset()
    }

    const handleDelete = () => {
        axios.patch(`${ApiUrl}group/${id}/remove-student`,
            {
                student_id: stdId
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
        reset()
    }
    return (
        <DashboardLayout>
            <>
                <div className="min-h-full">
                    <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <Link to="/groups">
                                <ArrowLeftIcon className="h-7 w-7 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <main className="py-10">
                        {/* Page header */}
                        <div className="max-w-3xl mx-auto px-4 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                            <div className="flex items-center space-x-5 justify-between">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <UserGroupIcon className="w-14 h-14 text-sky-500" aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{groupData?.name}</h1>
                                    <p className="text-sm font-medium text-gray-900">
                                        Leader : {groupData?.leader}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => setFormOpenTwo(true)}
                                    type="button"
                                    className="px-4 py-1 shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700 "
                                >
                                    Add Students
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 max-w-3xl mx-auto sm:px-4 lg:max-w-7xl">
                            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                {/* Description list*/}
                                <section aria-labelledby="applicant-information-title">
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                                Group Information
                                            </h2>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Number of students : {groupData?.students?.length}</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-4">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {groupData?.students!.map((data) => (
                                                    <tr key={data.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-sm" src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{data.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{data.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                                                            <Link to={`/student/${data.id}`}>
                                                                <button type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-sky-500 bg-sky-100 border-sky-200" title="Edit data">
                                                                    <EyeIcon className="h-6 w-6" aria-hidden="true" />
                                                                </button>
                                                            </Link>
                                                            <button onClick={() => [setFormOpenFour(true), setStdId(data.id)]} type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-red-500 bg-red-100 border-red-200" title="Trash">
                                                                <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {/* <ToastContainer /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
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
                                                                    options={students}
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
            </>
        </DashboardLayout>
    )
}

export default Group