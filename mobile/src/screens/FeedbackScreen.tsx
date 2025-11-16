/**
 * Feedback Screen
 * Main screen for submitting feedback
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ProgressiveFeedbackFlow } from '@/components/feedback/ProgressiveFeedbackFlow';
import { useSubmitFeedbackMutation } from '@/store/api/feedbackApi';
import { SPACING, COLORS } from '@/constants/theme';

export const FeedbackScreen: React.FC = () => {
  const [submitFeedback, { isLoading, isSuccess, isError }] = useSubmitFeedbackMutation();
  const [showFlow, setShowFlow] = useState(true);

  const handleSubmit = async (feedbackData: any) => {
    try {
      await submitFeedback(feedbackData).unwrap();
      setShowFlow(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleCancel = () => {
    setShowFlow(false);
  };

  if (!showFlow) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {isSuccess ? 'Thank you for your feedback!' : 'Feedback cancelled'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressiveFeedbackFlow
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
    padding: SPACING.md,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});
