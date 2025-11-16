/**
 * useHaptics Hook
 * Convenient hook for haptic feedback
 */

import { useCallback } from 'react';
import {
  lightHaptic,
  mediumHaptic,
  heavyHaptic,
  successHaptic,
  warningHaptic,
  errorHaptic,
  selectionHaptic,
  pointsEarnedHaptic,
} from '@/utils/haptics';

export const useHaptics = () => {
  const triggerLight = useCallback(() => {
    lightHaptic();
  }, []);

  const triggerMedium = useCallback(() => {
    mediumHaptic();
  }, []);

  const triggerHeavy = useCallback(() => {
    heavyHaptic();
  }, []);

  const triggerSuccess = useCallback(() => {
    successHaptic();
  }, []);

  const triggerWarning = useCallback(() => {
    warningHaptic();
  }, []);

  const triggerError = useCallback(() => {
    errorHaptic();
  }, []);

  const triggerSelection = useCallback(() => {
    selectionHaptic();
  }, []);

  const triggerPointsEarned = useCallback((points: number) => {
    pointsEarnedHaptic(points);
  }, []);

  return {
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSuccess,
    triggerWarning,
    triggerError,
    triggerSelection,
    triggerPointsEarned,
  };
};
