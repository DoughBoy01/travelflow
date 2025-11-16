/**
 * Star Rating Component
 * 5-star rating system for feedback
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useHaptics } from '@/hooks';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  title?: string;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  title = 'Rate your experience',
  size = 40,
}) => {
  const { triggerSelection } = useHaptics();

  const handlePress = (newRating: number) => {
    triggerSelection();
    onRatingChange(newRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handlePress(star)}
            accessibilityLabel={`${star} star${star > 1 ? 's' : ''}`}
            accessibilityRole="button"
          >
            <Text style={[styles.star, { fontSize: size }]}>
              {star <= rating ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  stars: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  star: {
    color: COLORS.warning.main,
  },
});
