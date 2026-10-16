// Gera os endpoints CRUD padrão para uma entidade (o "apiFactory" do frontend).
// Uso:
//   baseApi.injectEndpoints({ endpoints: (b) => crudEndpoints(b, { path: ROUTES.FAIXA, tag: 'Faixa' }) })
export const crudEndpoints = (builder, { path, tag }) => ({
    [`get${tag}s`]: builder.query({
        query: (params) => ({ url: path, params }),
        providesTags: [tag],
    }),
    [`create${tag}`]: builder.mutation({
        query: (body) => ({ url: path, method: 'POST', body }),
        invalidatesTags: [tag],
    }),
    [`update${tag}`]: builder.mutation({
        query: ({ id, ...body }) => ({ url: `${path}/${id}`, method: 'PATCH', body }),
        invalidatesTags: [tag],
    }),
    [`remove${tag}`]: builder.mutation({
        query: (id) => ({ url: `${path}/${id}`, method: 'DELETE' }),
        invalidatesTags: [tag],
    }),
});
