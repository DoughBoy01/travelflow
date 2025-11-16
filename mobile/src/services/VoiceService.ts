/**
 * Voice Service
 * Handles voice recording and recognition
 */

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

export interface VoiceRecognitionResult {
  text: string;
  confidence?: number;
}

/**
 * Start voice recognition
 */
export const startVoiceRecognition = async (
  language: string = 'en-US'
): Promise<void> => {
  try {
    await Voice.start(language);
  } catch (error) {
    console.error('Error starting voice recognition:', error);
    throw error;
  }
};

/**
 * Stop voice recognition
 */
export const stopVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.stop();
  } catch (error) {
    console.error('Error stopping voice recognition:', error);
    throw error;
  }
};

/**
 * Cancel voice recognition
 */
export const cancelVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.cancel();
  } catch (error) {
    console.error('Error cancelling voice recognition:', error);
    throw error;
  }
};

/**
 * Destroy voice recognition
 */
export const destroyVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.destroy();
  } catch (error) {
    console.error('Error destroying voice recognition:', error);
  }
};

/**
 * Check if voice recognition is available
 */
export const isVoiceAvailable = async (): Promise<boolean> => {
  try {
    const available = await Voice.isAvailable();
    return available === 1;
  } catch (error) {
    console.error('Error checking voice availability:', error);
    return false;
  }
};

/**
 * Set up voice recognition event listeners
 */
export const setupVoiceListeners = (callbacks: {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onSpeechResults?: (results: string[]) => void;
  onSpeechError?: (error: SpeechErrorEvent) => void;
  onSpeechPartialResults?: (results: string[]) => void;
}) => {
  if (callbacks.onSpeechStart) {
    Voice.onSpeechStart = callbacks.onSpeechStart;
  }

  if (callbacks.onSpeechEnd) {
    Voice.onSpeechEnd = callbacks.onSpeechEnd;
  }

  if (callbacks.onSpeechResults) {
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      callbacks.onSpeechResults?.(e.value || []);
    };
  }

  if (callbacks.onSpeechError) {
    Voice.onSpeechError = callbacks.onSpeechError;
  }

  if (callbacks.onSpeechPartialResults) {
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      callbacks.onSpeechPartialResults?.(e.value || []);
    };
  }
};

/**
 * Remove voice recognition event listeners
 */
export const removeVoiceListeners = () => {
  Voice.onSpeechStart = null;
  Voice.onSpeechEnd = null;
  Voice.onSpeechResults = null;
  Voice.onSpeechError = null;
  Voice.onSpeechPartialResults = null;
};

export const VoiceService = {
  startVoiceRecognition,
  stopVoiceRecognition,
  cancelVoiceRecognition,
  destroyVoiceRecognition,
  isVoiceAvailable,
  setupVoiceListeners,
  removeVoiceListeners,
};
