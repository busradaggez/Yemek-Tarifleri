"use client";
import React, { useState } from "react";
import { login } from "@/utils/api/login";
import { useRouter } from "next/navigation";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userData = await login(username, password);
            console.log("Login başarılı:", userData);

            localStorage.setItem("token", userData.token);

            router.push("/");
        } catch (err: any) {
            setError("Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-background1 bg-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-orange text-2xl font-semibold mb-6">Giriş Yap</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray mb-1">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
                            placeholder="Kullanıcı adı"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray mb-1">
                            Şifre
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange"
                            placeholder="Şifre"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-orange text-white font-semibold py-2 rounded-md hover:bg-orange2 transition"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
