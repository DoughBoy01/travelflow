/**
 * Impact Dashboard Screen
 * Shows user's impact metrics
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useGetUserImpactQuery } from '@/store/api/analyticsApi';
import { Card } from '@/components/common/Card';
import { FeedbackCarousel } from '@/components/feedback/FeedbackCarousel';
import { FeedbackCardData } from '@/components/feedback/FeedbackCard';
import { SPACING, COLORS, TYPOGRAPHY } from '@/constants/theme';

export const ImpactDashboard: React.FC = () => {
  const { data: impact, isLoading } = useGetUserImpactQuery();

  // Sample feedback data for carousel demonstration
  const [sampleFeedback] = useState<FeedbackCardData[]>([
    {
      id: 'fb_1',
      type: 'positive',
      content: 'The new meal options on my recent flight were absolutely fantastic! Great variety and quality.',
      userName: 'Sarah M.',
      category: 'airline meals',
      likes: 24,
      isLiked: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'fb_2',
      type: 'suggestion',
      content: 'Hotel check-in was smooth, but it would be great to have a mobile key option.',
      userName: 'John D.',
      category: 'hotel service',
      likes: 12,
      isLiked: true,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 'fb_3',
      type: 'issue',
      content: 'WiFi connection was spotty during the flight. Could use improvement.',
      userName: 'Emily R.',
      category: 'connectivity',
      likes: 8,
      isLiked: false,
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
    {
      id: 'fb_4',
      type: 'positive',
      content: 'Lounge access was amazing! Comfortable seating and great food selection.',
      userName: 'Michael T.',
      category: 'lounge',
      likes: 35,
      isLiked: false,
      timestamp: new Date(Date.now() - 14400000).toISOString(),
    },
  ]);

  const handleLike = useCallback((feedbackId: string) => {
    console.log('Liked feedback:', feedbackId);
    // TODO: Implement API call to like feedback
  }, []);

  const handleShare = useCallback((feedbackId: string) => {
    console.log('Shared feedback:', feedbackId);
    // TODO: Implement API call to track share
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.title}>Your Impact</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{impact?.totalFeedback || 0}</Text>
            <Text style={styles.statLabel}>Total Feedback</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{impact?.travelersHelped || 0}</Text>
            <Text style={styles.statLabel}>Travelers Helped</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{impact?.impactScore || 0}</Text>
            <Text style={styles.statLabel}>Impact Score</Text>
          </View>
        </View>
      </Card>

      {/* Recent Community Feedback Carousel */}
      <View style={styles.section}>
        <FeedbackCarousel
          title="Recent Community Feedback"
          feedbackItems={sampleFeedback}
          onLike={handleLike}
          onShare={handleShare}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Changes You Influenced</Text>
        {impact?.changesInfluenced?.map((change, index) => (
          <Card key={index} style={styles.changeCard}>
            <Text style={styles.changeTitle}>{change.title}</Text>
            <Text style={styles.changeDate}>{change.date}</Text>
            <Text style={styles.changeContribution}>{change.yourContribution}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.default,
    padding: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.main,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  changeCard: {
    marginBottom: SPACING.md,
  },
  changeTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.primary,
  },
  changeDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  changeContribution: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.success.main,
    marginTop: SPACING.xs,
  },
});
