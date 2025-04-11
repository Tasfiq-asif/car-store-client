import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const allProductsApi = createApi({
  reducerPath: 'allProductsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (build) => ({
    getCar: build.query({
        query:()=>`/cars`,
    })
  }),
})


export const {useGetCarQuery } = allProductsApi