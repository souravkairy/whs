import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { ApiUrl } from "../../config/ApiConfig";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Inputs = {
    email: string,
    password: string,
};

const Login = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.post(`${ApiUrl}admin/login`, data)
            .then((response) => {
                localStorage.setItem("user-info", response.data.token)
                navigate('/dashboard');
                toast.success(response.data.status)
            })
            .catch((error) => {
                toast(error.data.message)
            })
        reset()
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border shadow sm:rounded-lg sm:px-10">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign in to <span className='text-sky-600'>Admin Dashboard</span> </h2>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <p className="text-sky-600 text-xs">This field is required</p>}

                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                    {...register("password", { required: true })}

                                />
                                {errors.password && <p className="text-sky-600 text-xs">This field is required</p>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Welcome</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login