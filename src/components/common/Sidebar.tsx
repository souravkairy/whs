import { Fragment, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { useLocation } from 'react-router-dom';
import {
    ChartBarIcon,
    MenuIcon,
    UsersIcon,
    XIcon,
    CogIcon,
    UserGroupIcon
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import clsx from 'clsx';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: true },
    { name: 'Students', href: '/students', icon: UsersIcon, current: false },
    { name: 'Groups', href: '/groups', icon: UserGroupIcon, current: false },
    { name: 'Settings', href: '/setting/users', icon: CogIcon, current: true },
]

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation();
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-sky-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <h3 className='text-3xl text-sky-600 font-bold px-3 border border-sky-600 rounded-sm pb-1'>SAF</h3>
                                    </div>
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <div className="" key={item.name}>
                                                <Link to={item.href}>
                                                    <Menu as="div" className="">
                                                        <div className='flex justify-between'>
                                                            <Menu.Button className={clsx(location.pathname.includes(item.href)
                                                                ? 'bg-sky-100 text-sky-900'
                                                                : 'text-sky-600 hover:text-sky-900 hover:bg-sky-50',
                                                                'inline-flex w-full justify-between rounded-sm text-sky-900 px-2 py-2 text-sm font-medium hover:bg-sky-100 hover:text-sky-900'
                                                            )}>
                                                                <span className='flex justify-start'>
                                                                    <item.icon
                                                                        className='mr-3 flex-shrink-0 h-6 w-6 text-sky-900 group-hover:text-sky-500'
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}</span>
                                                            </Menu.Button>
                                                        </div>
                                                    </Menu>
                                                </Link>
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex border-t border-sky-200 p-4">
                                    <a href="#" className="flex-shrink-0 group block">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-sky-700 group-hover:text-sky-900">Tom Cook</p>
                                                <p className="text-sm font-medium text-sky-500 group-hover:text-sky-700">View profile</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 border-r border-sky-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center justify-start px-2">
                            <Link to='/dashboard'>
                                <h3 className='text-3xl text-sky-600 font-bold px-3 border border-sky-600 rounded-sm pb-1'>SAF</h3>
                            </Link>
                        </div>
                        <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                            {navigation.map((item) => (
                                <div className="" key={item.name}>
                                    <Link to={item.href}>
                                        <div className='flex justify-between'>
                                            <div className={clsx(location.pathname.includes(item.href)
                                                ? 'bg-sky-100 text-sky-900'
                                                : 'text-sky-600 hover:text-sky-900 hover:bg-sky-50',
                                                'inline-flex w-full justify-between rounded-sm text-sky-900 px-2 py-2 text-sm font-medium hover:bg-sky-100 hover:text-sky-900'
                                            )}>
                                                <span className='flex justify-start'>
                                                    <item.icon
                                                        className='mr-3 flex-shrink-0 h-6 w-6 text-sky-900 group-hover:text-sky-500'
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-sky-200 p-4">
                        <a href="#" className="flex-shrink-0 w-full group block">
                            <div className="flex items-center">

                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="sticky top-0 z-10 md:hidden p-3 bg-sky-100">
                <button
                    type="button"
                    className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center border border-sky-400 text-sky-600 rounded-sm hover:text-sky-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-sky-500"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </>
    )
}

export default Sidebar