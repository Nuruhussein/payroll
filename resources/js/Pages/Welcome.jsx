import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('image-section')
            ?.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-blue-700 via-blue-500 to-yellow-400 text-white">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Welcome To Qelemmeda Payroll System
                        </h1>
                        <p className="mb-8 text-white/90">
                            Manage payroll efficiently with Qelemmeda — your trusted payroll automation solution.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('report.dashboard')}
                                    className="bg-yellow-400 text-blue-800 font-semibold px-6 py-2 rounded shadow hover:bg-yellow-300 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded shadow hover:bg-yellow-300 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-blue-700 font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                       
                    </div>
                </div>

                <div
                    id="image-section"
                    className="w-full md:w-1/2 bg-white flex items-center justify-center p-6"
                >
                    <img
                        src="/image/OIP.jpg"
                        alt="Screenshot"
                        className="max-w-full h-auto rounded shadow-lg"
                        onError={handleImageError}
                    />
                </div>
            </div>
        </>
    );
}