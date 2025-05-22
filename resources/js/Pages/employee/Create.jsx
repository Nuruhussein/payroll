
import React, { useState } from "react";
import Dashboard from "../Dashboard";
import { router } from '@inertiajs/react';

export default () => {
    const [form, setForm] = useState({
        name: "",
        gender: "Male",
        employment_type: "Full-time",
        position: "CEO",
        employment_date: "",
        basic_salary: "",
        bank_account_number: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/employees", form);
    };

    return (
        <Dashboard>
            <main className="w-full h-screen flex flex-col items-center sm:px-4">
    <div className="w-full space-y-6 text-gray-600 sm:max-w-4xl">
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <label className="font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div className="col-span-1">
                    <label className="font-medium">Gender</label>
                    <div className="relative">
                        <svg className="absolute top-2/3 -translate-y-1/2 w-5 h-5 text-gray-400 right-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="font-medium">Employment Type</label>
                    <div className="relative">
                        <svg className="absolute top-2/3 -translate-y-1/2 w-5 h-5 text-gray-400 right-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <select
                            name="employment_type"
                            value={form.employment_type}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="font-medium">Position</label>
                    <div className="relative">

<svg className="absolute top-2/3 -translate-y-1/2 w-5 h-5 text-gray-400 right-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <select
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                        >
                            <option>CEO</option>
                            <option>COO</option>
                            <option>CIO</option>
                            <option>CISO</option>
                            <option>Director</option>
                            <option>Dept Lead</option>
                            <option>Normal Employee</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="font-medium">Employment Date</label>
                    <input
                        type="date"
                        name="employment_date"
                        value={form.employment_date}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div className="col-span-1">
                    <label className="font-medium">Basic Salary</label>
                    <input
                        type="number"
                        step="0.01"
                        name="basic_salary"
                        value={form.basic_salary}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <label className="font-medium">Bank Account Number</label>
                    <input
                        type="text"
                        name="bank_account_number"
                        value={form.bank_account_number}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Create account
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>

        </Dashboard>
    );
};