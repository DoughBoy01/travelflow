/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { SPACING, COLORS, TYPOGRAPHY } from '@/constants/theme';

export const ProfileScreen: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Text style={styles.name}>{user?.name || 'Guest'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.totalPoints || 0}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>Level {user?.level || 1}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </Card>

      <View style={styles.section}>
        <Button title="Edit Profile" onPress={() => {}} variant="outline" />
        <Button title="Settings" onPress={() => {}} variant="outline" style={styles.button} />
        <Button title="Logout" onPress={() => {}} variant="outline" style={styles.button} />
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
  name: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  email: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
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
  button: {
    marginTop: SPACING.md,
  },
});
