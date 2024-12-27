"use client";
import { useEffect, useState } from "react";

const ProfilSayfasi = () => {
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    if (!userInfo) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-orange shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
                    Profil Sayfası
                </h1>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-semibold text-gray-700">Kullanıcı Adı:</div>
                        <div className="text-gray-600">{userInfo.username}</div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-semibold text-gray-700">Ad:</div>
                        <div className="text-gray-600">{userInfo.firstName}</div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-semibold text-gray-700">Soyad:</div>
                        <div className="text-gray-600">{userInfo.lastName}</div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-semibold text-gray-700">E-mail:</div>
                        <div className="text-gray-600">{userInfo.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilSayfasi;
