import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import { TrashIcon, EyeIcon, UserIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';
import { toast } from 'react-toastify';

interface UseFormInputs {
    id: number;
    name: string
    email: string
    password: string
    gender: string
}

const gender = [
    { id: 1, title: 'male' },
    { id: 2, title: 'female' },
]

const Users = () => {
    const [formOpenOne, setFormOpenOne] = useState(false)
    const [formOpenThree, setFormOpenThree] = useState(false)
    const [formOpenFour, setFormOpenFour] = useState(false)
    const [id, setId] = useState<any | null>(null)
    const [assistants, setAssistants] = useState<UseFormInputs[]>()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();

    const onSubmit = (data: UseFormInputs) => {
        axios.post(`${ApiUrl}admin`,
            {
                name: data.name,
                gender: data.gender,
                email: data.email,
                password: data.password,
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        )
            .then((response) => {
                const newData = assistants
                newData!.push(data)
                setAssistants(newData)
                setFormOpenOne(false)
                toast.success(response.data.message)
            })
            .catch((error) => {
                toast.error(error.data.message)
                console.log(error);
            })
        reset()
    }

    const handleDelete = () => {

        console.log(id);
        setFormOpenFour(false)
    }

    useEffect(() => {
        axios.get(`${ApiUrl}admins`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setAssistants(response.data.admins)
        })
    }, [setAssistants])

    return (
        <>
            <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <div className="">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Assistants</h3>
                    </div>
                    <div className="">
                        <button
                            onClick={() => setFormOpenOne(true)}
                            type="button"
                            className="px-4 py-1 shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700 "
                        >
                            Add Assistant
                        </button>
                    </div>
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
                                    {assistants?.map((data) => (
                                        <tr key={data.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <UserIcon className="h-10 w-10 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                                                    <div className="ml-4">
                                                        <Link to={`/setting/users/${data.id}`}>
                                                            <div className="text-sm font-medium text-gray-900 hover:text-sky-500">{data.name}</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 space-x-3">
                                                <div className="text-sm font-medium text-gray-900">{data.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                                                <Link to={`/setting/users/${data.id}`}>
                                                    <button type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-sky-500 bg-sky-100 border-sky-200" title="Edit data">
                                                        <EyeIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Transition.Root show={formOpenOne} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setFormOpenOne}>
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
                                <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="">
                                        <h3 className='text-2xl font-semibold'>Add Student</h3>
                                    </div>
                                    <div>
                                        {/* <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}> */}
                                        <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
                                            <div className=" divide-gray-200">
                                                <div>
                                                    <div className="mt-6 space-y-6">
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    {...register("name")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.name && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Email
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    {...register("email")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.email && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Gender
                                                            </label>
                                                            <div className="mt-1">
                                                                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                                                    <select {...register('gender')} className="w-full">
                                                                        <option value="">Select Gender</option>
                                                                        {gender.map(value => (
                                                                            <>
                                                                                <option key={value.id} value={value.title}>
                                                                                    {value.title}
                                                                                </option>
                                                                            </>
                                                                        ))}
                                                                    </select>
                                                                    {errors.gender && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Password
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="password"
                                                                    {...register("password")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.email && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-5">
                                                <div className="grid grid-cols-2">
                                                    <button type='button' className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenOne(false)}>Close</button>
                                                    <button type="submit" className="inline-flex px-6 justify-center py-2 border shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={formOpenThree} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setFormOpenThree}>
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
                                <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="">
                                        <h3 className='text-2xl font-semibold'>Edit User</h3>
                                    </div>
                                    <div>
                                        {/* <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}> */}
                                        <form className="divide-gray-200" >
                                            <div className=" divide-gray-200">
                                                <div>
                                                    <div className="mt-6 space-y-6">
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    {...register("name")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.name && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Email
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    {...register("email")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.email && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-4">
                                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                Password
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    {...register("password")}
                                                                    id="email"
                                                                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                />
                                                                {errors.email && <span>This field is required</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-5">
                                                <div className="grid grid-cols-2">
                                                    <button type='button' className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenThree(false)}>Close</button>
                                                    <button type="submit" className="inline-flex px-6 justify-center py-2 border shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700">
                                                        Update
                                                    </button>
                                                </div>
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
    )
}

export default Users
