import axios, { AxiosError } from 'axios';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        });

        const userData = response.data; // API'den dönen veriyi al
        console.log("API'den dönen veri:", userData);

        // localStorage'a token ve kullanıcı bilgilerini kaydet
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({ username: userData.username }));

        return userData; // API'den gelen veri
    } catch (error) {
        // Hata türünü kontrol et
        if (error instanceof AxiosError) {
            console.error('Axios Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
        }

        throw new Error('An unexpected error occurred.');
    }
};
