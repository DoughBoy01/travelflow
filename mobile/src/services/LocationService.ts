/**
 * Location Service
 * Handles geolocation for contextual triggers
 */

import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '@shared/types/feedback.types';

/**
 * Request location permission
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    // iOS permissions are handled via Info.plist
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'TravelFlow needs access to your location for contextual feedback',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

/**
 * Get current location
 */
export const getCurrentLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Watch location changes
 */
export const watchLocation = (
  callback: (location: Location) => void,
  errorCallback?: (error: any) => void
): number => {
  return Geolocation.watchPosition(
    (position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    },
    errorCallback,
    {
      enableHighAccuracy: true,
      distanceFilter: 10, // Update every 10 meters
    }
  );
};

/**
 * Stop watching location
 */
export const stopWatchingLocation = (watchId: number): void => {
  Geolocation.clearWatch(watchId);
};

/**
 * Calculate distance between two locations (in meters)
 * Using Haversine formula
 */
export const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (loc1.lat * Math.PI) / 180;
  const φ2 = (loc2.lat * Math.PI) / 180;
  const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const Δλ = ((loc2.lng - loc1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export const LocationService = {
  requestLocationPermission,
  getCurrentLocation,
  watchLocation,
  stopWatchingLocation,
  calculateDistance,
};
