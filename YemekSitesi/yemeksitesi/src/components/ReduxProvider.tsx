'use client';

import { Provider } from 'react-redux';
import store from '../utils/store/store'; // Burada default export olarak import ediliyor

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
