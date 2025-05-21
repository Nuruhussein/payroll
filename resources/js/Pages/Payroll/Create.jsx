import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Dashboard from '../Dashboard';

export default function Create({ employees, errors }) {
  const [form, setForm] = useState({
    employee_id: '',
    working_days: '',
    transport_allowance: '',
    other_commission: '',
    position_allowance: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    

    router.post(route('Payroll.store'), form);
  };

  return (
    <Dashboard>
    <div className="max-w-4xl mx-auto p-6 ml-64 mt-4 bg-white rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Select */}
        <div>
          <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-1">
            Employee
          </label>
          <select
            id="employee_id"
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
          {errors?.employee_id && (
            <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
          )}
        </div>

        {/* Working Days */}
        <div>
          <label htmlFor="working_days" className="block text-sm font-medium text-gray-700 mb-1">
            Working Days
          </label>
          <input
            id="working_days"
            type="number"
            name="working_days"
            min="0"
            max="30"
            value={form.working_days}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {errors?.working_days && (
            <p className="mt-1 text-sm text-red-600">{errors.working_days}</p>
          )}
        </div>

        {/* Transport Allowance */}
        <div>
          <label htmlFor="transport_allowance" className="block text-sm font-medium text-gray-700 mb-1">
            Transport Allowance
          </label>
          <input
            id="transport_allowance"
            type="number"
            name="transport_allowance"
            min="0"
            value={form.transport_allowance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {errors?.transport_allowance && (
            <p className="mt-1 text-sm text-red-600">{errors.transport_allowance}</p>
          )}
        </div>

        {/* Position Allowance */}
        <div>
          <label htmlFor="position_allowance" className="block text-sm font-medium text-gray-700 mb-1">
            Position Allowance
          </label>
          <input
            id="position_allowance"
            type="number"
            name="position_allowance"
            min="0"
            value={form.position_allowance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {errors?.position_allowance && (
            <p className="mt-1 text-sm text-red-600">{errors.position_allowance}</p>
          )}
        </div>

        {/* Other Commission */}
        <div>
          <label htmlFor="other_commission" className="block text-sm font-medium text-gray-700 mb-1">
            Other Commission
          </label>
          <input
            id="other_commission"
            type="number"
            name="other_commission"
            min="0"
            value={form.other_commission}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {errors?.other_commission && (
            <p className="mt-1 text-sm text-red-600">{errors.other_commission}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-medium"
        >
          Submit
        </button>
      </form>
    </div>
    </Dashboard>
  );
}