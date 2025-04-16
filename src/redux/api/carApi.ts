// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: "import.meta.env.VITE_API_URL/api/v1" }),
  tagTypes: ["StoreCarData"],
  endpoints: (builder) => ({
    getAllCar: builder.query({
      query: () => `/cars`,
      providesTags: ["StoreCarData"],
    }),
  }),
});

export const { useGetAllCarQuery } = carApi;
