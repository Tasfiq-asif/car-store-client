// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'


export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (build) => ({
    getCar: build.query({
        query:()=>`/cars`,
    })
  }),
})


export const {useGetCarQuery } = carApi