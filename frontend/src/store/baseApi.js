import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/services/routes';
import { logout } from '@/features/auth/authSlice';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
    },
});

// 401 numa rota autenticada → encerra a sessão (o PrivateRoute redireciona ao login)
const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    const url = typeof args === 'string' ? args : args?.url;
    if (result.error?.status === 401 && !url?.includes('/auth/login')) {
        api.dispatch(logout());
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Faixa', 'Professor', 'Atleta', 'Turma', 'Tecnica'],
    endpoints: () => ({}),
});
