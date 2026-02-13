import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-2xl shadow-xl transition-all hover:shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">Sign in to continue to <span className="text-blue-600 font-semibold">QuickChat</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="text"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to='/signup' className='text-sm text-blue-600 hover:text-blue-800 hover:underline block text-right'>
                        {"Don't"} have an account?
                    </Link>

                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                        {loading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
