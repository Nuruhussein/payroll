
import Dashboard from "../Dashboard"

export default () => {

    const tableItems = [
        {
            name: "Liam James",
            email: "liamjames@example.com",
            position: "Software engineer",
            salary: "$100K"
        },
        {
            name: "Olivia Emma",
            email: "oliviaemma@example.com",
            position: "Product designer",
            salary: "$90K"
        },
        {
            name: "William Benjamin",
            email: "william.benjamin@example.com",
            position: "Front-end developer",
            salary: "$80K"
        },
        {
            name: "Henry Theodore",
            email: "henrytheodore@example.com",
            position: "Laravel engineer",
            salary: "$120K"
        },
        {
            name: "Amelia Elijah",
            email: "amelia.elijah@example.com",
            position: "Open source manager",
            salary: "$75K"
        },
    ]

    return (
        <Dashboard>
        <div className="max-w-6xl ml-80   px-4 md:px-8">
            <div class="mb-6">
    <h1 class="text-2xl font-semibold">Transaction details for Jan. 29, 2020</h1>
    <p class="text-sm text-gray-600 mt-1">
      For <span class="text-blue-600 font-medium">Jan. 16 – Jan. 31, 2020 payroll</span> with payday Jan. 31, 2020
    </p>
  </div>

  <div class="bg-white shadow-sm rounded-md p-6 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
    <div>
      <p class="text-sm text-gray-500">Amount</p>
      <p class="text-2xl font-bold text-gray-900">$5,050.00</p>
    </div>
    <div>
      <p class="text-sm text-gray-500">Withdrawal date</p>
      <p class="text-gray-900 mt-1">January 29, 2020</p>
    </div>
    <div>
      <p class="text-sm text-gray-500">Funding account</p>
    </div>
    <div class="flex items-center">
      <span class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">Scheduled</span>
    </div>
  </div>

  <div class="mb-8">
    <h2 class="text-lg font-semibold mb-3">For your team</h2>
    <div class="overflow-auto bg-white shadow-sm rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-sm text-gray-600 text-left">
          <tr>
            <th class="px-6 py-3">Recipient</th>
            <th class="px-6 py-3">Deposit date</th>
            <th class="px-6 py-3">Amount</th>
            <th class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-sm">
          <tr>
            <td class="px-6 py-4 text-blue-600 font-medium">John Adams</td>
            <td class="px-6 py-4">Jan 31, 2020</td>
            <td class="px-6 py-4">$2,000.00</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Scheduled</span>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-blue-600 font-medium">John Macintosh</td>
            <td class="px-6 py-4">Jan 31, 2020</td>
            <td class="px-6 py-4">$50.00</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Scheduled</span>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-blue-600 font-medium">Karen Lord</td>
            <td class="px-6 py-4">Jan 31, 2020</td>
            <td class="px-6 py-4">$2,000.00</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Scheduled</span>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-blue-600 font-medium">Mary Lambert</td>
            <td class="px-6 py-4">Jan 31, 2020</td>
            <td class="px-6 py-4">$50.00</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Scheduled</span>
            </td>
          </tr>
          <tr>


<td class="px-6 py-4 text-blue-600 font-medium">Neil McAdams</td>
            <td class="px-6 py-4">Jan 31, 2020</td>
            <td class="px-6 py-4">$50.00</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">Scheduled</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
      <div>
        Show: 
        <select class="ml-2 border border-gray-300 rounded px-2 py-1">
          <option>5</option>
        </select>
        per page
      </div>
      <div>
        1–5 of 8
        <button class="ml-2 text-gray-400" disabled>&rsaquo;</button>
      </div>
    </div>
  </div>

  <div>
    <h2 class="text-lg font-semibold mb-3">For your accrued taxes</h2>
    <div class="bg-white shadow-sm rounded-md overflow-auto">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-100 text-gray-600 text-left">
          <tr>
            <th class="px-6 py-3">Tax</th>
            <th class="px-6 py-3">Due date</th>
            <th class="px-6 py-3">Amount</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4">IN DOR - State Income Tax Withholding</td>
            <td class="px-6 py-4">Feb 15, 2020</td>
            <td class="px-6 py-4">$1,500.00</td>
            <td class="px-6 py-4">
              <a href="#" class="text-blue-600 font-medium">Tax details</a>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4">IRS - Federal Income Tax Withholding</td>
            <td class="px-6 py-4">Feb 21, 2020</td>
            <td class="px-6 py-4">$1,500.00</td>
            <td class="px-6 py-4">
              <a href="#" class="text-blue-600 font-medium">Tax details</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
        </div>
        </Dashboard>
    )
}