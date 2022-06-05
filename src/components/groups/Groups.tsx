import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import DashboardLayout from '../layout/DashboardLayout'
import { EyeIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

interface UseFormInputs {
    id: number;
    name: string
    subject: string
    leader: string
    scheduleTime: string
    selected: number
}

const Groups = () => {
    const [formOpenOne, setFormOpenOne] = useState(false)
    const [formOpenTwo, setFormOpenTwo] = useState(false)
    const [groupsData, setGroupsData] = useState<UseFormInputs[]>([])
    const [id, setId] = useState<any | null>(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();
    //search data from datatable
    const [searchItem, setSearchItem] = useState<any | null>([])
    //paginations 
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    const pageCount = Math.ceil(groupsData!.length / dataPerPage);
    const changePage = ({ selected }: UseFormInputs) => {
        setPageNumber(selected);
    };
    const onSubmit = (data: UseFormInputs) => {
        axios.post(`${ApiUrl}group`,
            {
                name: data.name,
                subject: data.subject,
                leader: data.leader,
                scheduleTime: new Date(data.scheduleTime),
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        )
            .then((response) => {
                const newData = groupsData
                newData!.push(data)
                setGroupsData(newData)
                setFormOpenOne(false)
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message)
            })
        reset()
    };
    const handleDelete = () => {
        axios.delete(`${ApiUrl}group/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        )
            .then((response) => {
                setFormOpenTwo(false)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        axios.get(`${ApiUrl}groups`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setGroupsData(response.data.groups)
        })
    }, [setGroupsData])

    return (
        <DashboardLayout>
            <>
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">All Groups</h3>
                        </div>
                        <div className="">
                            <button
                                onClick={() => setFormOpenOne(true)}
                                type="button"
                                className="px-4 py-1 shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700 "
                            >
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-end flex-wrap sm:flex-nowrap">
                        <div className="">
                            <input type="text" placeholder='Search...' onChange={(event) => { setSearchItem(event.target.value); }} className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-1 outline-hidden px-3" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-4">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                                Subject
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Leader Name
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
                                        {groupsData && groupsData?.slice(pagesVisited, pagesVisited + dataPerPage).filter((val) => {
                                            if (searchItem == "") {
                                                return val
                                            } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
                                                return val
                                            }
                                        }).map((data, key) => (
                                            <tr key={key}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <UserGroupIcon className="h-10 w-10 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <Link to={`/groups/${data.id}`}>
                                                                <div className="text-sm font-medium text-gray-900 hover:text-sky-500">{data.name}</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 space-x-3">
                                                    <span className="px-4 inline-flex text-sm leading-5 font-semibold text-gray-900">
                                                        {data.subject}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 space-x-3">
                                                    <span className="px-4 inline-flex text-sm leading-5 font-semibold text-gray-900">
                                                        {data.leader}
                                                    </span>
                                                </td>


                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                                                    <Link to={`/groups/${data.id}`}>
                                                        <button className="border p-1 rounded-sm hover:bg-gray-100 text-blue-500 bg-blue-100 border-blue-200" title="Edit data">
                                                            <EyeIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </Link>
                                                    <button type='button' onClick={() => [setFormOpenTwo(true), setId(data.id)]} className="border p-1 rounded-sm hover:bg-gray-100 text-red-500 bg-red-100 border-red-200" title="Trash">
                                                        <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-start flex-wrap sm:flex-nowrap">
                        <div className="">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
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
                                    <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full sm:p-6">
                                        <div className="">
                                            <h3 className='text-2xl font-semibold'>Create Group</h3>
                                        </div>
                                        <div>
                                            <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
                                                <div className=" divide-gray-200">
                                                    <div>
                                                        <div className="mt-6 space-y-6">
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Group Name
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
                                                                    Leader Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        {...register("subject")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.subject && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Subject
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        {...register("leader")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.leader && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Date and time of study group
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="datetime-local"
                                                                        {...register("scheduleTime")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.scheduleTime && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-5">
                                                    <div className="grid grid-cols-2">
                                                        <button className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenOne(false)}>Close</button>
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
                                                        <button type='button' className='bg-sky-600 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenTwo(false)}>Close</button>
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

export default Groups
