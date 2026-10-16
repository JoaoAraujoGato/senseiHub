import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';
import { crudEndpoints } from '@/services/crudEndpoints';

export const faixaApi = baseApi.injectEndpoints({
    endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.FAIXA, tag: 'Faixa' }),
});

export const {
    useGetFaixasQuery,
    useCreateFaixaMutation,
    useUpdateFaixaMutation,
    useRemoveFaixaMutation,
} = faixaApi;
