import React from "react";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover tra bg-background1 bg-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-orange text-2xl font-semibold mb-6">Giriş Yap</h2>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray mb-1"
                    >
                        Kullanıcı Adı
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full border border-gr rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
                        placeholder="Kullanıcı adı"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray mb-1">
                        Şifre
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            className="w-full border border-gray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
                            placeholder="Şifre"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">

                    <a
                        href="#"
                        className="text-sm text-orange hover:underline focus:outline-orange2"
                    >
                        Şifremi Unuttum
                    </a>
                </div>
                <button className="w-full bg-orange text-white font-semibold py-2 rounded-md hover:bg-orange2 transition">
                    Giriş Yap
                </button>
            </div>
        </div>
    );
};

export default Login;
