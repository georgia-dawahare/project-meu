import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';

function CustomIcon({ source, size, color }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          tintColor: isPressed ? '#E62B85' : color,
          marginTop: 14,
        //   backgroundColor: 'green',
        }}
      />
    </TouchableOpacity>
  );
}

export default CustomIcon;
