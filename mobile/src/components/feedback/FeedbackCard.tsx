/**
 * Feedback Card Component
 * Displays feedback item with share and like functionality
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Card } from '@/components/common/Card';
import { Pill } from '@/components/common/Pill';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { triggerHaptic } from '@/utils/haptics';

export interface FeedbackCardData {
  id: string;
  type: string;
  content: string;
  userName?: string;
  category?: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
}

interface FeedbackCardProps {
  feedback: FeedbackCardData;
  onLike?: (feedbackId: string) => void;
  onShare?: (feedbackId: string) => void;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  onLike,
  onShare,
}) => {
  const [localLiked, setLocalLiked] = useState(feedback.isLiked);
  const [localLikes, setLocalLikes] = useState(feedback.likes);

  const handleLike = async () => {
    try {
      // Trigger haptic feedback
      await triggerHaptic('medium');

      // Toggle like state
      const newLiked = !localLiked;
      setLocalLiked(newLiked);
      setLocalLikes(prev => newLiked ? prev + 1 : prev - 1);

      // Call parent handler
      if (onLike) {
        onLike(feedback.id);
      }
    } catch (error) {
      console.error('Error handling like:', error);
      Alert.alert('Error', 'Failed to update like. Please try again.');
      // Revert on error
      setLocalLiked(feedback.isLiked);
      setLocalLikes(feedback.likes);
    }
  };

  const handleShare = async () => {
    try {
      // Trigger haptic feedback
      await triggerHaptic('light');

      const shareMessage = `Check out this feedback on TravelFlow: "${feedback.content}"`;

      const result = await Share.share({
        message: shareMessage,
        title: 'TravelFlow Feedback',
      });

      if (result.action === Share.sharedAction) {
        // Call parent handler
        if (onShare) {
          onShare(feedback.id);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share feedback. Please try again.');
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card style={styles.card} elevation="sm">
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {feedback.userName && (
            <Text style={styles.userName}>{feedback.userName}</Text>
          )}
          <Text style={styles.timestamp}>
            {formatTimestamp(feedback.timestamp)}
          </Text>
        </View>
        {feedback.category && (
          <Pill text={feedback.category} variant="primary" />
        )}
      </View>

      {/* Content */}
      <Text style={styles.content}>{feedback.content}</Text>

      {/* Type Pill */}
      <View style={styles.typeContainer}>
        <Pill text={feedback.type} variant="info" />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          accessibilityLabel={localLiked ? 'Unlike' : 'Like'}
          accessibilityRole="button"
        >
          <Text style={[styles.actionIcon, localLiked && styles.likedIcon]}>
            {localLiked ? '❤️' : '🤍'}
          </Text>
          <Text style={[styles.actionText, localLiked && styles.likedText]}>
            {localLikes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          accessibilityLabel="Share feedback"
          accessibilityRole="button"
        >
          <Text style={styles.actionIcon}>🔗</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginRight: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs / 2,
  },
  timestamp: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.secondary,
  },
  content: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.primary,
    lineHeight: TYPOGRAPHY.fontSize.md * 1.5,
    marginBottom: SPACING.md,
  },
  typeContainer: {
    marginBottom: SPACING.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider || '#E0E0E0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.lg,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: SPACING.xs,
  },
  actionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  likedText: {
    color: COLORS.error?.main || '#D32F2F',
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});
