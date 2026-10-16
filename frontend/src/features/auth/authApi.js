import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credenciais) => ({ url: ROUTES.AUTH_LOGIN, method: 'POST', body: credenciais }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
