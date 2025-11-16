/**
 * Analytics RTK Query API
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants';
import type { RootState } from '../store';

export interface UserImpact {
  totalFeedback: number;
  travelersHelped: number;
  changesInfluenced: Array<{
    title: string;
    date: string;
    yourContribution: string;
  }>;
  topCategory: string;
  impactScore: number;
}

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_CONFIG.BASE_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.session?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Impact'],
  endpoints: (builder) => ({
    getUserImpact: builder.query<UserImpact, void>({
      query: () => '/analytics/impact',
      transformResponse: (response: { data: UserImpact }) => response.data,
      providesTags: ['Impact'],
    }),
  }),
});

export const { useGetUserImpactQuery } = analyticsApi;
