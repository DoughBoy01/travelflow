/**
 * Impact Dashboard Screen
 * Shows user's impact metrics
 */

import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useGetUserImpactQuery } from '@/store/api/analyticsApi';
import { Card } from '@/components/common/Card';
import { SPACING, COLORS, TYPOGRAPHY } from '@/constants/theme';

export const ImpactDashboard: React.FC = () => {
  const { data: impact, isLoading } = useGetUserImpactQuery();

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
