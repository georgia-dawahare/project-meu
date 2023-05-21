import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavigationBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuPress = (menuIndex) => {
    setActiveMenu(menuIndex);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 1 && styles.activeMenuItem]}
        onPress={() => handleMenuPress(1)}
      >
        <Image
          source={
            activeMenu === 1
              ? require('../assets/Icons/navigationIcon_1_active.png')
              : require('../assets/Icons/navigationIcon_1.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 2 && styles.activeMenuItem]}
        onPress={() => handleMenuPress(2)}
      >
        <Image
          source={
            activeMenu === 2
              ? require('../assets/Icons/navigationIcon_2_active.png')
              : require('../assets/Icons/navigationIcon_2.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, activeMenu === 3 && styles.activeMenuItem]}
        onPress={() => handleMenuPress(3)}
      >
        <Image
          source={
            activeMenu === 3
              ? require('../assets/Icons/navigationIcon_3_active.png')
              : require('../assets/Icons/navigationIcon_3.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    width: 390,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 716,
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigationBar;
