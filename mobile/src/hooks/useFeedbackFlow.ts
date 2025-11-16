/**
 * useFeedbackFlow Hook
 * Manages multi-step feedback flow state
 */

import { useState, useCallback } from 'react';
import { FeedbackFlowState, FeedbackData, FeedbackInputMode } from '@/types/feedback.types';

export const useFeedbackFlow = (initialMode: FeedbackInputMode = FeedbackInputMode.EMOJI) => {
  const [flowState, setFlowState] = useState<FeedbackFlowState>({
    currentStep: 0,
    totalSteps: 3,
    inputMode: initialMode,
    isSubmitting: false,
    errors: {},
  });

  const [draftData, setDraftData] = useState<Partial<FeedbackData>>({});

  /**
   * Move to next step
   */
  const nextStep = useCallback(() => {
    setFlowState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1),
    }));
  }, []);

  /**
   * Move to previous step
   */
  const prevStep = useCallback(() => {
    setFlowState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  /**
   * Update draft data
   */
  const updateDraft = useCallback((data: Partial<FeedbackData>) => {
    setDraftData((prev) => ({ ...prev, ...data }));
  }, []);

  /**
   * Set input mode
   */
  const setInputMode = useCallback((mode: FeedbackInputMode) => {
    setFlowState((prev) => ({ ...prev, inputMode: mode }));
  }, []);

  /**
   * Set error for a field
   */
  const setError = useCallback((field: string, error: string) => {
    setFlowState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  }, []);

  /**
   * Clear errors
   */
  const clearErrors = useCallback(() => {
    setFlowState((prev) => ({ ...prev, errors: {} }));
  }, []);

  /**
   * Set submitting state
   */
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFlowState((prev) => ({ ...prev, isSubmitting }));
  }, []);

  /**
   * Reset flow
   */
  const resetFlow = useCallback(() => {
    setFlowState({
      currentStep: 0,
      totalSteps: 3,
      inputMode: initialMode,
      isSubmitting: false,
      errors: {},
    });
    setDraftData({});
  }, [initialMode]);

  return {
    flowState,
    draftData,
    nextStep,
    prevStep,
    updateDraft,
    setInputMode,
    setError,
    clearErrors,
    setSubmitting,
    resetFlow,
  };
};
