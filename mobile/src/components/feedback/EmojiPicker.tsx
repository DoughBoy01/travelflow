/**
 * Emoji Picker Component
 * Allows users to select an emoji for feedback
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useHaptics } from '@/hooks';

const EMOJI_OPTIONS = [
  { emoji: '😊', sentiment: 'positive', label: 'Happy' },
  { emoji: '😍', sentiment: 'positive', label: 'Love it' },
  { emoji: '😐', sentiment: 'neutral', label: 'Neutral' },
  { emoji: '😕', sentiment: 'negative', label: 'Concerned' },
  { emoji: '😞', sentiment: 'negative', label: 'Disappointed' },
];

interface EmojiPickerProps {
  onSelect: (emoji: string, sentiment: 'positive' | 'neutral' | 'negative') => void;
  selectedEmoji?: string;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  selectedEmoji,
}) => {
  const { triggerSelection } = useHaptics();

  const handleSelect = (emoji: string, sentiment: 'positive' | 'neutral' | 'negative') => {
    triggerSelection();
    onSelect(emoji, sentiment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How was your experience?</Text>
      <View style={styles.emojiGrid}>
        {EMOJI_OPTIONS.map(({ emoji, sentiment, label }) => (
          <TouchableOpacity
            key={emoji}
            style={[
              styles.emojiButton,
              selectedEmoji === emoji && styles.selectedEmoji,
            ]}
            onPress={() => handleSelect(emoji, sentiment as any)}
            accessibilityLabel={label}
            accessibilityRole="button"
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.label}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: SPACING.md,
  },
  emojiButton: {
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    minWidth: 80,
  },
  selectedEmoji: {
    backgroundColor: COLORS.primary.light + '20',
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
  },
});
