/**
 * Feedback Slice
 * Manages local feedback state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackData, FeedbackDraft } from '@/types/feedback.types';

interface FeedbackState {
  drafts: FeedbackDraft[];
  recentSubmissions: FeedbackData[];
  currentDraft: FeedbackDraft | null;
}

const initialState: FeedbackState = {
  drafts: [],
  recentSubmissions: [],
  currentDraft: null,
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    saveDraft: (state, action: PayloadAction<FeedbackDraft>) => {
      const existingIndex = state.drafts.findIndex(
        (d) => d.localId === action.payload.localId
      );

      if (existingIndex !== -1) {
        state.drafts[existingIndex] = action.payload;
      } else {
        state.drafts.push(action.payload);
      }

      state.currentDraft = action.payload;
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter((d) => d.localId !== action.payload);
      if (state.currentDraft?.localId === action.payload) {
        state.currentDraft = null;
      }
    },
    clearDrafts: (state) => {
      state.drafts = [];
      state.currentDraft = null;
    },
    setCurrentDraft: (state, action: PayloadAction<FeedbackDraft | null>) => {
      state.currentDraft = action.payload;
    },
    addRecentSubmission: (state, action: PayloadAction<FeedbackData>) => {
      state.recentSubmissions.unshift(action.payload);
      // Keep only last 10 submissions
      if (state.recentSubmissions.length > 10) {
        state.recentSubmissions = state.recentSubmissions.slice(0, 10);
      }
    },
    clearRecentSubmissions: (state) => {
      state.recentSubmissions = [];
    },
  },
});

export const {
  saveDraft,
  deleteDraft,
  clearDrafts,
  setCurrentDraft,
  addRecentSubmission,
  clearRecentSubmissions,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
