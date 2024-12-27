import axios, { AxiosError } from 'axios';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        });

        // API'den dönen tüm kullanıcı verilerini al
        const userData = response.data;
        console.log("API'den dönen veri:", userData);

        // localStorage'a token ve kullanıcı bilgilerini kaydet
        localStorage.setItem('token', userData.token);
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: userData.id,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                birthDate: userData.birthDate,
            })
        );

        return {
            id: userData.id,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            birthDate: userData.birthDate,
            token: userData.token,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Axios Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
        }

        throw new Error('An unexpected error occurred.');
    }
};
