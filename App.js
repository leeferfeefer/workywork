import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

const App: () => Node = () => {
  
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <Text>Hewo</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
