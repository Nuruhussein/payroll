import Dashboard from "../Dashboard"

export default ({payrolls}) => {

    return (
        <Dashboard>
        <div className="max-w-5xl ml-60   px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                {/* <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div> */}
                <div className="mt-3 md:mt-0">
                    <a
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add member
                    </a>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">employee_id</th>
                            <th className="py-3 px-6">month</th>
                            <th className="py-3 px-6">working_days</th>
                            <th className="py-3 px-6">earned_salary</th>
                            <th className="py-3 px-6">position_allowance</th>
                            <th className="py-3 px-6">transport_allowance</th>
                            <th className="py-3 px-6">other_commission</th>
                            <th className="py-3 px-6">taxable_income</th>
                            <th className="py-3 px-6">income_tax</th>
                            <th className="py-3 px-6">employee_pension</th>
                            <th className="py-3 px-6">employer_pension</th>
                            <th className="py-3 px-6">gross_pay</th>
                            <th className="py-3 px-6">total_deduction</th>
                            <th className="py-3 px-6">net_payment</th>
                            <th className="py-3 px-6">prepared_by</th>
                            <th className="py-3 px-6">approved_by</th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                           payrolls.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.employee_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.month}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.working_days}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.earned_salary}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.position_allowance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.transport_allowance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.other_commission}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.taxable_income}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.income_tax}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.employee_pension}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.gross_pay}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.total_deduction}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.net_payment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.prepared_by}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.approved_by}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </a>
                                        <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </Dashboard>
    )
}