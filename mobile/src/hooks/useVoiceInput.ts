/**
 * useVoiceInput Hook
 * Manages voice input state and controls
 */

import { useState, useEffect, useCallback } from 'react';
import { VoiceService } from '@/services';

export const useVoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [partialTranscription, setPartialTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if voice is available on mount
   */
  useEffect(() => {
    const checkAvailability = async () => {
      const available = await VoiceService.isVoiceAvailable();
      setIsAvailable(available);
    };

    checkAvailability();
  }, []);

  /**
   * Setup voice listeners
   */
  useEffect(() => {
    VoiceService.setupVoiceListeners({
      onSpeechStart: () => {
        setIsRecording(true);
        setError(null);
      },
      onSpeechEnd: () => {
        setIsRecording(false);
      },
      onSpeechResults: (results) => {
        if (results && results.length > 0) {
          setTranscription(results[0]);
        }
      },
      onSpeechPartialResults: (results) => {
        if (results && results.length > 0) {
          setPartialTranscription(results[0]);
        }
      },
      onSpeechError: (e) => {
        setError(e.error?.message || 'Voice recognition error');
        setIsRecording(false);
      },
    });

    return () => {
      VoiceService.removeVoiceListeners();
      VoiceService.destroyVoiceRecognition();
    };
  }, []);

  /**
   * Start recording
   */
  const startRecording = useCallback(async (language: string = 'en-US') => {
    try {
      setError(null);
      setTranscription('');
      setPartialTranscription('');
      await VoiceService.startVoiceRecognition(language);
    } catch (err) {
      setError('Failed to start voice recognition');
      setIsRecording(false);
    }
  }, []);

  /**
   * Stop recording
   */
  const stopRecording = useCallback(async () => {
    try {
      await VoiceService.stopVoiceRecognition();
    } catch (err) {
      setError('Failed to stop voice recognition');
    }
  }, []);

  /**
   * Cancel recording
   */
  const cancelRecording = useCallback(async () => {
    try {
      await VoiceService.cancelVoiceRecognition();
      setTranscription('');
      setPartialTranscription('');
      setError(null);
    } catch (err) {
      setError('Failed to cancel voice recognition');
    }
  }, []);

  /**
   * Clear transcription
   */
  const clearTranscription = useCallback(() => {
    setTranscription('');
    setPartialTranscription('');
  }, []);

  return {
    isRecording,
    isAvailable,
    transcription,
    partialTranscription,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    clearTranscription,
  };
};
