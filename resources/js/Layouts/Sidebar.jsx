
const Sidebar = () => {

    const navigation = [

        {
            href: '/adminDashboard',
            name: 'Dashboard',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z" />
</svg>

        },
        {
            href: '/employees',
            name: 'Employees',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a7 7 0 0114 0H4z" />
</svg>

            ,
        },
        {
            href: '/Payroll',
            name: 'Payroll',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V3h16v4H4zm0 4h16v10H4V11zm4 4v4m4-4v4m4-4v4" />
</svg>

            ,
        },
        {
            href: '/Transaction',
            name: 'Transaction',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25M15.75 5.25L18 7.5M15.75 5.25L13.5 7.5M8.25 15V18.75M8.25 18.75L6 16.5M8.25 18.75L10.5 16.5" />
</svg>


            ,
        },
        {
            href: '/Report',
            name: 'Report',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4.5H7A2.25 2.25 0 014.75 18V6A2.25 2.25 0 017 3.75h6.379a2.25 2.25 0 011.591.659l3.621 3.621a2.25 2.25 0 01.659 1.591V18A2.25 2.25 0 0117.25 20.25z" />
</svg>

        }
    ]

    const navsFooter = [
        {
            href: 'javascript:void(0)',
            name: 'Help',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            ,
        },
        {
            href: 'javascript:void(0)',
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            ,
        }
    ]

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-52">
                <div class="flex flex-col h-full">
                    <div className='h-20 flex items-center px-2'>
                        <a href='javascript:void(0)' className='flex-none'>
                            <img src="/image/OIP.jpg" width={50} className="mx-auto" />
                        </a>
                        <label
  htmlFor="Qelemmeda"
  className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent font-bold"
>
  ..Qelemmeda
</label>

</div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 mt-4 text-sm font-medium flex-1">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.href} className="flex text-lg items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                            <div className="text-gray-500">{item.icon}</div>
                                            {item.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                           
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Sidebar;