import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { withTheme, Chip } from 'react-native-paper';

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    textDecorationLine: 'underline',
  },
});

type Props = {
  urls: String[];
  onRemove: (index: number) => ValueType;
  theme: Object;
};

const UrlList: () => React$Node = ({ urls, onRemove, theme }: Props) => (
  <View style={styles.chips}>
    {urls.map((url, i) => (
      <Chip
        key={url + i}
        icon="launch"
        onPress={() => Linking.openURL(url)}
        onClose={onRemove ? onRemove(i) : null}
        textStyle={{ ...styles.chip, color: theme.colors.primary }}>
        {url}
      </Chip>
    ))}
  </View>
);

export default withTheme(UrlList);
