/**
 * useContextualTrigger Hook
 * Manages contextual feedback triggers based on location, time, etc.
 */

import { useState, useEffect, useCallback } from 'react';
import { LocationService } from '@/services';
import { FeedbackTrigger } from '@shared/types/feedback.types';
import { Location } from '@shared/types/feedback.types';
import { TriggerConfig } from '@/types/feedback.types';

export const useContextualTrigger = (config: TriggerConfig) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [shouldTrigger, setShouldTrigger] = useState(false);
  const [lastTriggered, setLastTriggered] = useState<string | null>(null);

  /**
   * Check if cooldown period has passed
   */
  const isCooldownExpired = useCallback((): boolean => {
    if (!lastTriggered) return true;

    const lastTriggerTime = new Date(lastTriggered).getTime();
    const now = Date.now();
    const elapsed = now - lastTriggerTime;

    return elapsed >= config.cooldownPeriod;
  }, [lastTriggered, config.cooldownPeriod]);

  /**
   * Check if current time is within allowed hours
   */
  const isWithinAllowedHours = useCallback((): boolean => {
    if (!config.timeRestrictions) return true;

    const now = new Date();
    const currentHour = now.getHours();

    const { startHour, endHour } = config.timeRestrictions;

    if (startHour <= endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      // Handle case where end is next day (e.g., 22:00 to 06:00)
      return currentHour >= startHour || currentHour < endHour;
    }
  }, [config.timeRestrictions]);

  /**
   * Check location-based trigger
   */
  useEffect(() => {
    if (!config.enabled) return;

    let watchId: number | null = null;

    const setupLocationWatch = async () => {
      const hasPermission = await LocationService.requestLocationPermission();
      if (!hasPermission) return;

      watchId = LocationService.watchLocation(
        (newLocation) => {
          setLocation(newLocation);
        },
        (error) => {
          console.error('Location watch error:', error);
        }
      );
    };

    setupLocationWatch();

    return () => {
      if (watchId !== null) {
        LocationService.stopWatchingLocation(watchId);
      }
    };
  }, [config.enabled]);

  /**
   * Evaluate trigger conditions
   */
  useEffect(() => {
    if (!config.enabled) {
      setShouldTrigger(false);
      return;
    }

    const evaluateTrigger = () => {
      // Check cooldown
      if (!isCooldownExpired()) {
        setShouldTrigger(false);
        return;
      }

      // Check time restrictions
      if (!isWithinAllowedHours()) {
        setShouldTrigger(false);
        return;
      }

      // For now, just set to true if conditions are met
      // In real implementation, add more sophisticated trigger logic
      setShouldTrigger(true);
    };

    evaluateTrigger();
  }, [config.enabled, isCooldownExpired, isWithinAllowedHours]);

  /**
   * Mark trigger as fired
   */
  const markTriggered = useCallback(() => {
    setLastTriggered(new Date().toISOString());
    setShouldTrigger(false);
  }, []);

  /**
   * Reset trigger
   */
  const resetTrigger = useCallback(() => {
    setLastTriggered(null);
    setShouldTrigger(false);
  }, []);

  return {
    location,
    shouldTrigger,
    lastTriggered,
    markTriggered,
    resetTrigger,
  };
};
