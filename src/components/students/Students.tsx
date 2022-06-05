import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import DashboardLayout from '../layout/DashboardLayout'
import { TrashIcon, EyeIcon, PlusIcon, PencilAltIcon, UserIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../config/ApiConfig';
import ReactPaginate from 'react-paginate';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';

const gender = [
    { id: 1, title: 'Male' },
    { id: 2, title: 'Female' },
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
    selected: number

}

const Students = () => {
    const [formOpenOne, setFormOpenOne] = useState(false)
    const [formOpenTwo, setFormOpenTwo] = useState(false)
    const [formOpenThree, setFormOpenThree] = useState(false)
    const [formOpenFour, setFormOpenFour] = useState(false)
    const [studentsData, setStudentsData] = useState<UseFormInputs[]>([])
    const [selected, setSelected] = useState<UseFormInputs[]>();
    const [groupsData, setGroupsData] = useState<UseFormInputs[]>()
    const [id, setId] = useState<any | null>(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();
    //search data from datatable
    const [searchItem, setSearchItem] = useState<any | null>([])
    //paginations 
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    const pageCount = Math.ceil(studentsData!.length / dataPerPage);
    const changePage = ({ selected }: UseFormInputs) => {
        setPageNumber(selected);
    };
    const onSubmitStudent = (data: UseFormInputs) => {
        console.log(data);

        axios.post(`${ApiUrl}student`,
            {
                name: data.name,
                email: data.email,
                gender: data.gender,
                placeOfBirth: data.placeOfBirth,
                dateOfBirth: new Date(data.dateOfBirth),
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`,
                },
            }
        )
            .then((response) => {
                // const newData = studentsData
                // newData!.push(data)
                // setStudentsData(newData)
                setFormOpenOne(false)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const onSubmitStudentToGroup = (data: UseFormInputs) => {

        const group_ids = selected!.map((groupId) => groupId.id);

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
                // const newData = studentsData
                // newData!.push(data)
                // setStudentsData(newData)
                // setFormOpenTwo(false)
                window.location.reload();
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error);
            })
        // reset()
    }
    const handleDelete = () => {
        axios.delete(`${ApiUrl}student/${id}`,
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
    useEffect(() => {
        axios.get(`${ApiUrl}students`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("user-info")}`
                },
            }
        ).then((response) => {
            setStudentsData(response.data.students)
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

    }, [setStudentsData])
    return (
        <DashboardLayout>
            <>
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">All Students</h3>
                        </div>
                        <div className="">
                            <button
                                onClick={() => setFormOpenOne(true)}
                                type="button"
                                className="px-4 py-1 shadow-sm text-sm font-medium rounded-sm text-white bg-sky-600 hover:bg-sky-700 "
                            >
                                Add Student
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
                                                Study Groups
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
                                        {studentsData && studentsData?.slice(pagesVisited, pagesVisited + dataPerPage).filter((val) => {
                                            if (searchItem == "") {
                                                return val
                                            } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
                                                return val
                                            }
                                        }).map((data, key) => (
                                            <tr key={key}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            {/* <img className="h-10 w-10 rounded-sm" src={`${data.image}`} alt="" /> */}
                                                            <UserIcon className="w-10 h-10 text-sky-500" aria-hidden="true" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <Link to={`/students/${data.id}`}>
                                                                <div className="text-sm font-medium text-gray-900 hover:text-sky-500">{data.name}</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 space-x-3">

                                                    {
                                                        data?.studyGroups.map((studyData, key) =>
                                                            <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-sm bg-green-100 text-green-800">
                                                                {studyData.name}
                                                            </span>
                                                        )
                                                    }
                                                    <button type='button' onClick={() => [setFormOpenTwo(true), setId(data.id)]}>
                                                        <PlusIcon className="h-5 w-5 inline-flex text-green-800 bg-green-100 rounded-sm" aria-hidden="true" />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                                                    <Link to={`/students/${data.id}`}>
                                                        <button type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-sky-500 bg-sky-100 border-sky-200" title="Edit data">
                                                            <EyeIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </Link>
                                                    {/* <Link to={`/edit-students/${data.id}`}>
                                                        <button type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-yellow-500 bg-yellow-100 border-yellow-200" title="Edit data">
                                                            <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </Link> */}
                                                    <button onClick={() => [setFormOpenFour(true), setId(data.id)]} type='button' className="border p-1 rounded-sm hover:bg-gray-100 text-red-500 bg-red-100 border-red-200" title="Trash">
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
                                            <h3 className='text-2xl font-semibold'>Add Student</h3>
                                        </div>
                                        <div>
                                            {/* <form className="divide-gray-200" onSubmit={handleSubmit(onSubmit)}> */}
                                            <form className="divide-gray-200" onSubmit={handleSubmit(onSubmitStudent)}>
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
                                                                    Place of birth
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        {...register("placeOfBirth")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.placeOfBirth && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Date of birth
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="datetime-local"
                                                                        {...register("dateOfBirth")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.dateOfBirth && <span>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            {/* <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Select Image
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="file"
                                                                        {...register("image")}
                                                                        id="image"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.image && <span>This field is required</span>}
                                                                </div>
                                                            </div> */}
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
                                            <form className="divide-gray-200" onSubmit={handleSubmit(onSubmitStudentToGroup)}>
                                                <div className=" divide-gray-200">
                                                    <div>
                                                        <div className="mt-6 space-y-6">
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Group Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <Multiselect
                                                                        disablePreSelectedValues
                                                                        displayValue="name"
                                                                        onKeyPressFn={function noRefCheck() { }}
                                                                        onRemove={function noRefCheck() { }}
                                                                        onSearch={function noRefCheck() { }}
                                                                        onSelect={setSelected}
                                                                        options={groupsData}
                                                                        selectionLimit={4}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-5">
                                                    <div className="grid grid-cols-2">
                                                        <button type='button' className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenTwo(false)}>Close</button>
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
                                    <Dialog.Panel className="relative bg-white rounded-sm p-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full sm:p-6">
                                        <div className="">
                                            <h3 className='text-2xl font-semibold'>Edit Student</h3>
                                        </div>
                                        <div>
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
                                                                    Place of birth
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="text"
                                                                        {...register("placeOfBirth")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.placeOfBirth && <span>This field is required</span>}
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                                    Date of birth
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="date"
                                                                        {...register("dateOfBirth")}
                                                                        id="email"
                                                                        className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-sm py-2 outline-hidden px-3"
                                                                    />
                                                                    {errors.dateOfBirth && <span>This field is required</span>}
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-6">
                                                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                                                    Photo
                                                                </label>
                                                                <div className="mt-1 flex items-center">
                                                                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                                    >
                                                                        Change
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:col-span-6">
                                                                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                                                    Cover photo
                                                                </label>
                                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-sm">
                                                                    <div className="space-y-1 text-center">
                                                                        <svg
                                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                                            stroke="currentColor"
                                                                            fill="none"
                                                                            viewBox="0 0 48 48"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path
                                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                strokeWidth={2}
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            />
                                                                        </svg>
                                                                        <div className="flex text-sm text-gray-600">
                                                                            <label
                                                                                htmlFor="file-upload"
                                                                                className="relative cursor-pointer bg-white rounded-sm font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                                                                            >
                                                                                <span>Upload a file</span>
                                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                            </label>
                                                                            <p className="pl-1">or drag and drop</p>
                                                                        </div>
                                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                                    </div>
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

        </DashboardLayout >
    )
}

export default Students
