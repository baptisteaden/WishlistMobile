import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {Appbar, BottomNavigation} from 'react-native-paper';

const Friends: () => React$Node = ({username}) => {
  return (
    <Text>
      List of friends, clickable to see their list, FAB + to add new friends ?
    </Text>
  );
};

export default Friends;
