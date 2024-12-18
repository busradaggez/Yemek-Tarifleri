import axios, { AxiosError } from 'axios';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
            username,
            password,
        });

        const userData = response.data;
        console.log("API'den dönen veri:", userData);


        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({ username: userData.username }));

        return userData;
    } catch (error) {

        if (error instanceof AxiosError) {
            console.error('Axios Error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
        }

        throw new Error('An unexpected error occurred.');
    }
};
