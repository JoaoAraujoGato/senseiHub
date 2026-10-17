import { baseApi } from '@/store/baseApi';
import { ROUTES } from '@/services/routes';
import { crudEndpoints } from '@/services/crudEndpoints';

export const professorApi = baseApi.injectEndpoints({
    endpoints: (builder) => crudEndpoints(builder, { path: ROUTES.PROFESSOR, tag: 'Professor' }),
});

export const {
    useGetProfessorsQuery,
    useGetProfessorQuery,
    useCreateProfessorMutation,
    useUpdateProfessorMutation,
    useRemoveProfessorMutation,
} = professorApi;
