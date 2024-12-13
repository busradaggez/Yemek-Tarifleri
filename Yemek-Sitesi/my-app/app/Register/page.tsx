import React from 'react';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background1 bg-no-repeat bg-cover">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mt-8 mb-8">
                <h1 className="text-2xl font-bold text-center text-orange mb-6">Üye Ol</h1>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray mb-2">Ad Soyad</label>
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Ad Soyad"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray mb-2">Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Kullanıcı Adı"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray mb-2">E-posta Adresi</label>
                        <input
                            type="email"
                            className="custom-input"
                            placeholder="E-posta"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray mb-2">Şifre</label>
                        <input
                            type="password"
                            className="custom-input"
                            placeholder="Şifre"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange text-white py-2 rounded-md hover:bg-orange2 transition"
                    >
                        Üye Ol
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

