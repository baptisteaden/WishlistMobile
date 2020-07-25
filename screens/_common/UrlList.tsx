import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { withTheme, Chip } from 'react-native-paper';
import { Theme } from './_types.d';

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
  urls: string[];
  onRemove?: ((index: number) => () => void) | null;
  theme: Theme;
};

const UrlList: React.FC<Props> = ({ urls, onRemove, theme }) => (
  <View style={styles.chips}>
    {urls.map((url: string, i: number) => (
      <Chip
        key={url + i}
        icon="launch"
        onPress={() => Linking.openURL(url)}
        onClose={onRemove ? onRemove(i) : undefined}
        textStyle={{ ...styles.chip, color: theme.colors.primary }}>
        {url}
      </Chip>
    ))}
  </View>
);

export default withTheme(UrlList);
