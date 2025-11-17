/**
 * Feedback Carousel Component
 * Horizontal scrollable carousel displaying feedback cards
 */

import React, { useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { FeedbackCard, FeedbackCardData } from './FeedbackCard';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';

interface FeedbackCarouselProps {
  feedbackItems: FeedbackCardData[];
  onLike?: (feedbackId: string) => void;
  onShare?: (feedbackId: string) => void;
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
}

export const FeedbackCarousel: React.FC<FeedbackCarouselProps> = ({
  feedbackItems,
  onLike,
  onShare,
  loading = false,
  title,
  emptyMessage = 'No feedback available',
}) => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem: ListRenderItem<FeedbackCardData> = ({ item }) => (
    <FeedbackCard
      feedback={item}
      onLike={onLike}
      onShare={onShare}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary.main} />
      <Text style={styles.loadingText}>Loading feedback...</Text>
    </View>
  );

  if (loading) {
    return renderLoading();
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        ref={flatListRef}
        data={feedbackItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        decelerationRate="fast"
        snapToInterval={300 + SPACING.md}
        snapToAlignment="start"
        pagingEnabled={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    marginLeft: SPACING.md,
  },
  listContent: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.md,
  },
  emptyContainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.paper,
    borderRadius: 12,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.sm,
  },
});
