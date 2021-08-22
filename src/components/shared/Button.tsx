import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

interface ButtonProps {
  text: string;
  icon?: string;
  onPress?: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={onPress}>
    <View
      style={{
        width: '40%',
        //backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //alignContent: 'flex-end',
        //alignSelf: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Ionicons
        name='log-in'
        style={{ color: 'white', marginRight: 5 }}
        size={32}
      />

      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    //flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    height: 60,
    //borderWidth: 1,
    //borderColor: 'green',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    //textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
  },
});
