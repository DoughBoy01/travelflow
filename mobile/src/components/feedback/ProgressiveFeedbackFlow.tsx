/**
 * Progressive Feedback Flow Component
 * Multi-step feedback collection with progressive disclosure
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useFeedbackFlow } from '@/hooks';
import { FeedbackInputMode } from '@/types/feedback.types';
import { SPACING } from '@/constants/theme';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { EmojiPicker } from './EmojiPicker';
import { StarRating } from './StarRating';

interface ProgressiveFeedbackFlowProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ProgressiveFeedbackFlow: React.FC<ProgressiveFeedbackFlowProps> = ({
  onSubmit,
  onCancel,
}) => {
  const {
    flowState,
    draftData,
    nextStep,
    prevStep,
    updateDraft,
    setSubmitting,
  } = useFeedbackFlow(FeedbackInputMode.EMOJI);

  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleEmojiSelect = (emoji: string, sentiment: string) => {
    setSelectedEmoji(emoji);
    updateDraft({
      type: FeedbackInputMode.EMOJI,
      content: { emoji, sentiment },
    });
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    updateDraft({
      type: FeedbackInputMode.STAR_RATING,
      content: { rating: newRating },
    });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    onSubmit(draftData);
  };

  const renderStep = () => {
    switch (flowState.currentStep) {
      case 0:
        return (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            selectedEmoji={selectedEmoji}
          />
        );
      case 1:
        return (
          <StarRating
            rating={rating}
            onRatingChange={handleRatingChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        {renderStep()}

        <View style={styles.actions}>
          {flowState.currentStep > 0 && (
            <Button
              title="Back"
              onPress={prevStep}
              variant="outline"
              style={styles.button}
            />
          )}

          {flowState.currentStep < flowState.totalSteps - 1 ? (
            <Button
              title="Next"
              onPress={nextStep}
              disabled={flowState.currentStep === 0 && !selectedEmoji}
              style={styles.button}
            />
          ) : (
            <Button
              title="Submit"
              onPress={handleSubmit}
              loading={flowState.isSubmitting}
              style={styles.button}
            />
          )}
        </View>

        <Button
          title="Cancel"
          onPress={onCancel}
          variant="text"
          style={styles.cancelButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    marginTop: SPACING.md,
  },
});
