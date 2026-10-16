import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';
import { crudEndpoints } from '@/services/crudEndpoints';

export const turmaApi = baseApi.injectEndpoints({
    endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.TURMA, tag: 'Turma' }),
});

export const {
    useGetTurmasQuery,
    useCreateTurmaMutation,
    useUpdateTurmaMutation,
    useRemoveTurmaMutation,
} = turmaApi;
