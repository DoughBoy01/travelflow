/**
 * Rewards Screen
 * Display available rewards and user's redemptions
 */

import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useGetAvailableRewardsQuery, useGetPointBalanceQuery } from '@/store/api/rewardsApi';
import { Card } from '@/components/common/Card';
import { SPACING, COLORS, TYPOGRAPHY } from '@/constants/theme';

export const RewardsScreen: React.FC = () => {
  const { data: points, isLoading: pointsLoading } = useGetPointBalanceQuery();
  const { data: rewards, isLoading: rewardsLoading } = useGetAvailableRewardsQuery();

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.title}>Your Points</Text>
        <Text style={styles.points}>{points || 0}</Text>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        {rewards?.map((reward) => (
          <Card key={reward.id} style={styles.rewardCard}>
            <Text style={styles.rewardName}>{reward.name}</Text>
            <Text style={styles.rewardPoints}>{reward.pointsRequired} points</Text>
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
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
  },
  points: {
    fontSize: 48,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary.main,
    marginTop: SPACING.sm,
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
  rewardCard: {
    marginBottom: SPACING.md,
  },
  rewardName: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text.primary,
  },
  rewardPoints: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});
