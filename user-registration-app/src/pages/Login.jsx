// src/pages/Register.js
function Login() {
    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <form>
                    <div className="space-y-6">
                        <h1 className="text-gray-800 text-xl">Login Form</h1>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Email Id
                            </label>
                            <input
                                name="email"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                            />
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button
                            type="button"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            onClick={() => window.location.replace("/home")}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
