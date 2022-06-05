import { Fragment } from 'react'
import Sidebar from '../common/Sidebar'
import { HomeIcon, UserIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: JSX.Element,
};

const DashboardLayout = ({ children }: Props) => {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.setItem("user-info", "")
        navigate('/login');
        toast.success('Logout successfull')
    }
    return (
        <>
            <Sidebar />
            <div className='md:pl-64'>
                <div className="sticky top-0 z-10  flex h-16 bg-white shadow">
                    <div className="flex-1 px-4 flex justify-end">

                        <div className="ml-4 flex items-center md:ml-6">
                            <Link to="/" >
                                <button
                                    type="button"
                                    className="bg-white p-1 rounded-full text-sky-600 hover:text-sky-500 focus:outline-none"
                                >
                                    <HomeIcon className="h-8 w-8 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                                </button>
                            </Link>

                            <Menu as="div" className="relative">
                                <div>
                                    <Menu.Button className="bg-white p-1 rounded-full text-sky-600 hover:text-sky-500 focus:outline-none">
                                        <span className="sr-only">Open user menu</span>
                                        <UserIcon className="h-8 w-8 text-sky-500 border border-sky-500 rounded-sm" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item >
                                            {({ active }) => (
                                                <button onClick={() => logout()} type='button' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'>
                                                    Logout
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                {children}
            </div>
        </>
    )
}

export default DashboardLayout