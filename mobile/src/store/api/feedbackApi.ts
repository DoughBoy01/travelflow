/**
 * Feedback RTK Query API
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants';
import { FeedbackData, FeedbackSubmissionResponse } from '@/types/feedback.types';
import type { RootState } from '../store';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
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
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    submitFeedback: builder.mutation<FeedbackSubmissionResponse, FeedbackData>({
      query: (feedback) => ({
        url: '/feedback',
        method: 'POST',
        body: feedback,
      }),
      invalidatesTags: ['Feedback'],
    }),
    getUserFeedback: builder.query<
      { items: FeedbackData[]; total: number },
      { userId: string; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: `/feedback/user/${userId}`,
        params: { page, limit },
      }),
      providesTags: ['Feedback'],
    }),
    getFeedbackById: builder.query<FeedbackData, string>({
      query: (id) => `/feedback/${id}`,
      providesTags: ['Feedback'],
    }),
    updateFeedback: builder.mutation<
      FeedbackData,
      { id: string; updates: Partial<FeedbackData> }
    >({
      query: ({ id, updates }) => ({
        url: `/feedback/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation<void, string>({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useSubmitFeedbackMutation,
  useGetUserFeedbackQuery,
  useGetFeedbackByIdQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
