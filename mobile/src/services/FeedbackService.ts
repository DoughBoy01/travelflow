/**
 * Feedback Service
 * Handles feedback submission and management
 */

import axios from 'axios';
import { API_CONFIG } from '@/constants';
import { FeedbackData, FeedbackSubmissionResponse } from '@/types/feedback.types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Submit feedback to the backend
 */
export const submitFeedback = async (
  feedbackData: FeedbackData,
  token: string
): Promise<FeedbackSubmissionResponse> => {
  const response = await api.post('/api/v1/feedback', feedbackData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get user's feedback history
 */
export const getUserFeedback = async (
  userId: string,
  token: string,
  page: number = 1,
  limit: number = 20
): Promise<{ items: FeedbackData[]; total: number }> => {
  const response = await api.get(`/api/v1/feedback/user/${userId}`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Get feedback by ID
 */
export const getFeedbackById = async (
  feedbackId: string,
  token: string
): Promise<FeedbackData> => {
  const response = await api.get(`/api/v1/feedback/${feedbackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Update feedback (within 24 hours)
 */
export const updateFeedback = async (
  feedbackId: string,
  updates: Partial<FeedbackData>,
  token: string
): Promise<FeedbackData> => {
  const response = await api.patch(`/api/v1/feedback/${feedbackId}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

/**
 * Delete feedback (privacy control)
 */
export const deleteFeedback = async (
  feedbackId: string,
  token: string
): Promise<void> => {
  await api.delete(`/api/v1/feedback/${feedbackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Upload photo for feedback
 */
export const uploadPhoto = async (
  uri: string,
  token: string
): Promise<{ photoUrl: string; thumbnailUrl: string }> => {
  const formData = new FormData();
  formData.append('photo', {
    uri,
    type: 'image/jpeg',
    name: 'feedback-photo.jpg',
  } as any);

  const response = await api.post('/api/v1/upload/photo', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

/**
 * Upload voice recording for feedback
 */
export const uploadVoice = async (
  uri: string,
  duration: number,
  token: string
): Promise<{ audioUrl: string; transcription?: string }> => {
  const formData = new FormData();
  formData.append('audio', {
    uri,
    type: 'audio/mp4',
    name: 'feedback-voice.m4a',
  } as any);
  formData.append('duration', duration.toString());

  const response = await api.post('/api/v1/upload/voice', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const FeedbackService = {
  submitFeedback,
  getUserFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
  uploadPhoto,
  uploadVoice,
};
