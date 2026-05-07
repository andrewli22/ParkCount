import { useThemeStyles } from '@/utils/themeStyles';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Linking, Switch, Text, View, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function DarkModeSlider(props: DrawerContentComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const themeStyle = useThemeStyles();
  const handleOpenLink = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/au/app/parkcount/id6756878356')
    } else {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.b3ef.parkingapp&hl=en_US')
    }
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Leave a review"
        labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
        onPress={handleOpenLink}
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[themeStyle.textColor, { fontSize: 14, fontWeight: '500' }]}>Dark Mode</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>
    </DrawerContentScrollView>
  );
}