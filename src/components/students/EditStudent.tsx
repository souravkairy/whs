import { UserGroupIcon, } from '@heroicons/react/solid'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline'
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
const EditStudent = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UseFormInputs>();
    const { id } = useParams();
    return (
        <DashboardLayout>
            <>
                <div className="bg-gray-50 px-4 py-3 border-b border rounded-sm my-4 mx-4">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <Link to="/students">
                            <ArrowLeftIcon className="h-7 w-7 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
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
                                                                {/* <select {...register('gender')} className="w-full">
                                                                    <option value="">Select Gender</option>
                                                                    {gender.map(value => (
                                                                        <>
                                                                            <option key={value.id} value={value.title}>
                                                                                {value.title}
                                                                            </option>
                                                                        </>
                                                                    ))}
                                                                </select> */}
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
                                                {/* <button type='button' className='bg-red-500 px-6 text-white rounded-sm border shadow-sm py-2 text-sm font-medium' onClick={() => setFormOpenThree(false)}>Close</button> */}
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


            </>
        </DashboardLayout>

    )
}

export default EditStudent