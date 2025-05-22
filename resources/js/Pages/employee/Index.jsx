import { useState } from 'react';
import Dashboard from '../Dashboard';
// import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function EmployeeIndex({ employees, auth }) {
  console.log(employees);

  // State for edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    employment_type: '',
    position: '',
    employment_date: '',
    basic_salary: '',
    bank_account_number: '',
  });
  const [errors, setErrors] = useState({});

  // Open edit modal with employee data
  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      gender: employee.gender,
      employment_type: employee.employment_type,
      position: employee.position,
      employment_date: employee.employment_date,
      basic_salary: employee.basic_salary,
      bank_account_number: employee.bank_account_number,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleEditSubmit = (e) => {
    e.preventDefault();
    router.put(`/employees/${selectedEmployee.id}`, formData, {
        onSuccess: (page) => {
            setIsModalOpen(false);
            alert(page.props.flash?.success || 'Employee updated successfully');
        },
        onError: (errors) => {
            setErrors(errors);
        },
    });
};

  // Handle delete with confirmation
  const handleDelete = (employee) => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      router.delete(`/employees/${employee.id}`, {
        onSuccess: () => {
          alert('Employee deleted successfully');
        },
        onError: () => {
          alert('Failed to delete employee');
        },
      });
    }
  };

  return (
    <Dashboard>
      <div className="max-w-5xl ml-60 px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="mt-3 md:mt-0">
            <a
              href="/employee/create"
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
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Gender</th>
                <th className="py-3 px-6">Position</th>
                <th className="py-3 px-6">Salary</th>
                <th className="py-3 px-6">Bank Account</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {employees.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.basic_salary}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.bank_account_number}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    {auth.user.role === 'admin' && (
                      <>
                        <button
                          onClick={() => openEditModal(item)}
                          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
                {errors.employment_type && (
                  <p className="text-red-600 text-sm mt-1">{errors.employment_type[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="CEO">CEO</option>
                  <option value="COO">COO</option>
                  <option value="CIO">CIO</option>
                  <option value="CISO">CISO</option>
                  <option value="Director">Director</option>
                  <option value="Dept Lead">Dept Lead</option>
                  <option value="Normal Employee">Normal Employee</option>
                </select>
                {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position[0]}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Employment Date</label>
                <input
                  type="date"
                  name="employment_date"
                  value={formData.employment_date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.employment_date && (
                  <p className="text-red-600 text-sm mt-1">{errors.employment_date[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                <input
                  type="number"
                  name="basic_salary"
                  value={formData.basic_salary}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.basic_salary && (
                  <p className="text-red-600 text-sm mt-1">{errors.basic_salary[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bank Account Number</label>
                <input
                  type="text"
                  name="bank_account_number"
                  value={formData.bank_account_number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.bank_account_number && (
                  <p className="text-red-600 text-sm mt-1">{errors.bank_account_number[0]}</p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Dashboard>
  );
}