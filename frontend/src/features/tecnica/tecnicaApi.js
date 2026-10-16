import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';
import { crudEndpoints } from '@/services/crudEndpoints';

export const tecnicaApi = baseApi.injectEndpoints({
    endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.TECNICA, tag: 'Tecnica' }),
});

export const {
    useGetTecnicasQuery,
    useCreateTecnicaMutation,
    useUpdateTecnicaMutation,
    useRemoveTecnicaMutation,
} = tecnicaApi;
