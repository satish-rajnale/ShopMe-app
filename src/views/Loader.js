import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from 'react';
 const Loader = () => {
    const loaderStyles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
    });
    return (
      <View style={loaderStyles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  };

  export default Loader