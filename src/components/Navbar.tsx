import React, {Fragment} from 'react';
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon, UserIcon} from "@heroicons/react/24/outline";
import fetchJson from "@/lib/fetchJson";
import Router, {useRouter} from "next/router";

const navigation = [
    {name: 'Login', href: '/'},
    {name: 'Gated', href: '/gated/video'},
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const router = useRouter();
    const logout = async () => {

        // Call logout API route to end session
        await fetchJson("/api/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
        Router.push('/');

    }

    return (
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <a className="flex flex-shrink-0 items-center" href={'/'}>
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src="https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/Whal3s_black.png"
                                        alt="Whal3s"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src="https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/Whal3s_black.png"
                                        alt="Whal3s"
                                    />
                                </a>
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                router.pathname === item.href
                                                    ? 'border-whal3s-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                                            )}
                                            aria-current={router.pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button
                                            className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-whal3s-500 focus:ring-offset-2 bg-gray-200 p-1">
                                            <span className="sr-only">Open user menu</span>
                                            <UserIcon className="h-8 w-8 rounded-full"/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href={'#'}
                                                        onClick={logout}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Logout
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-whal3s-500 focus:ring-offset-2">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        router.pathname === item.href
                                            ? 'border-whal3s-500 bg-whal3s-50 text-whal3s-700'
                                            : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                                    )}
                                    aria-current={router.pathname === item.href ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <UserIcon className="h-10 w-10 rounded-full "/>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Disclosure.Button
                                    as="a"
                                    href={'#'}
                                    onClick={logout}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Logout
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
