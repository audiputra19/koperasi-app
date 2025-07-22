import clsx from "clsx";
import { useEffect, useRef, useState, type FC } from "react";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash, FaStore } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login-image.png";
import { usePostLoginMutation } from "../services/apiAuth";
import { useAppDispatch } from "../store";
import { setToken } from "../store/authSlice";
import Alert from "../components/Alert";
import { useAlert } from "../contexts/AlertContext";
import Loading from "../components/Loading";

const LoginPage: FC = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [isIdAdminFocused, setIsIdAdminFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [login, { data, isSuccess, isLoading, error }] = usePostLoginMutation();
    const [form, setForm] = useState({ idAdmin: 0, password: "" });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    useEffect(() => {
        if(isSuccess && data) {
            dispatch(setToken(data.data));
            showAlert(data.message);
            navigate('/');
        } else if(error) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    },[isSuccess, data, error, dispatch]);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return (
        <div className="min-h-screen flex justify-center w-full items-center bg-blue-100">
            {isLoading && <Loading/>}
            <Alert/>
            <div className="grid grid-cols-3 w-4/6 shadow-lg rounded-2xl">
                <div className="bg-blue-500 rounded-l-2xl">
                    <div className="flex items-center text-blue-100 gap-2 pt-5 px-5">
                        <FaStore size={20}/>
                        <p className="font-bold">Kopsas</p>
                    </div>
                    <div className="bg-blue-600 rounded-2xl shadow-lg mt-10 mx-5 p-5">
                        <div className="">
                            <p className="text-2xl font-semibold text-white">Smarter Way to Run Your Cooperative</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-blue-200">
                                Easily manage your members, savings, loans, transactions, and reports.
                                Perfect for cooperatives of all sizes.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <img src={loginImage} alt={loginImage} className="w-70"/>
                    </div>
                </div>
                <div className="col-span-2 bg-white p-25 rounded-r-2xl">
                    <p className="text-2xl font-bold text-slate-800">
                        Login
                    </p>
                    <div className="mt-8">
                        <label htmlFor="idAdmin" className="block text-sm font-medium text-gray-400">
                            ID Admin
                        </label>
                        <div className="relative">
                            <div className="absolute top-[20px] left-3">
                                <FaRegUser className={clsx(isIdAdminFocused ? "text-blue-500" : "text-gray-400")}/>
                            </div>
                            <input 
                                type="number" 
                                name="idAdmin" 
                                id="idAdmin"
                                onFocus={() => setIsIdAdminFocused(true)}
                                onBlur={() => setIsIdAdminFocused(false)} 
                                ref={ref}
                                className="w-full border-2 pl-10 pr-3 py-2 mt-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-300"
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        idAdmin: Number(e.target.value)
                                    }))
                                } 
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute top-[18px] left-[10px]">
                                <TbLockPassword size={20} className={clsx(isPasswordFocused ? "text-blue-500" : "text-gray-400")}/>
                            </div>
                            <div className="absolute top-[19px] right-3 cursor-pointer">
                                {
                                    isPasswordShow ?
                                    <FaRegEyeSlash 
                                        size={18} 
                                        className="text-gray-400"
                                        onClick={() => setIsPasswordShow(!isPasswordShow)}
                                    /> :
                                    <FaRegEye 
                                        size={18} 
                                        className="text-gray-400"
                                        onClick={() => setIsPasswordShow(!isPasswordShow)}
                                    />
                                }
                            </div>
                            <input 
                                type={isPasswordShow ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                className="w-full border-2 pl-10 pr-3 py-2 mt-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-300" 
                                onChange={(e) => 
                                    setForm(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                }
                                onKeyDown={(e) => e.key === 'Enter' && login(form)}
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <button 
                            className="bg-blue-500 btn btn-lg font-bold text-white text-base rounded-lg w-full gap-3 hover:bg-blue-600"
                            onClick={() => login(form)}
                        >
                            Login
                            <FaArrowRight size={16}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;