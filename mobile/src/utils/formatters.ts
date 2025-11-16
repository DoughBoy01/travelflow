/**
 * Formatting Utilities
 * Helper functions for formatting data
 */

/**
 * Format points with commas
 */
export const formatPoints = (points: number): string => {
  return points.toLocaleString();
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format duration in seconds to readable format
 */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (mins === 0) {
    return `${secs}s`;
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format file size to readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format badge rarity for display
 */
export const formatBadgeRarity = (rarity: string): string => {
  return capitalizeFirst(rarity);
};
