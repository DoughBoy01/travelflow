/**
 * Badge Display Component
 * Displays a badge with animation
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Badge, BadgeRarity } from '@/types/gamification.types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  showDescription?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  size = 'medium',
  showName = true,
  showDescription = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'medium':
        return 64;
      case 'large':
        return 96;
    }
  };

  const getRarityColor = (rarity: BadgeRarity) => {
    return COLORS.badge[rarity] || COLORS.badge.common;
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badgeContainer,
          {
            width: getSize(),
            height: getSize(),
            borderColor: getRarityColor(badge.rarity),
          },
        ]}
      >
        {badge.iconUrl ? (
          <Image
            source={{ uri: badge.iconUrl }}
            style={{ width: getSize() - 8, height: getSize() - 8 }}
            resizeMode="contain"
          />
        ) : (
          <Text style={{ fontSize: getSize() * 0.6 }}>🏆</Text>
        )}
      </View>

      {showName && (
        <Text style={styles.name} numberOfLines={1}>
          {badge.name}
        </Text>
      )}

      {showDescription && (
        <Text style={styles.description} numberOfLines={2}>
          {badge.description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.sm,
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 3,
    backgroundColor: COLORS.background.paper,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs / 2,
    textAlign: 'center',
  },
});
