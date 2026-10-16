import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';
import { crudEndpoints } from '@/services/crudEndpoints';

export const atletaApi = baseApi.injectEndpoints({
    endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.ATLETA, tag: 'Atleta' }),
});

export const {
    useGetAtletasQuery,
    useCreateAtletaMutation,
    useUpdateAtletaMutation,
    useRemoveAtletaMutation,
} = atletaApi;
