import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, COLORS } from '../style/style';

export default function About({ onBack }) {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('window');

    const MIN_HEIGHT   = height * 0.5;
    const MAX_HEIGHT   = height * 0.7;
    const calcHeight   = Math.min(
    Math.max(width * 9 / 16, MIN_HEIGHT),MAX_HEIGHT);

    const imgUri = `https://people.vts.su.ac.rs/~26224103/images/me.jpg`;
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom','left','right']}>
      <Text style={[styles.title, {textAlign: 'center'}]}>Rólam</Text>
      <ScrollView>
        <View style={styles.card}>
          <Image source={{ uri: imgUri }} 
            style={{ 
              width: '100%', 
              height: calcHeight, 
              borderRadius: 12,
              marginBottom: 16}} resizeMode="cover" />
              <Text style={[styles.text, {textAlign: 'center', fontSize: 24}]}>Tóth Attila</Text>
              <Text style={[styles.text, {textAlign: 'center', }]}>26224103</Text>
        </View>
        <View style={styles.card}>
              <Text style={[styles.text, {fontSize: 18}]}>Iskola</Text>
              <Text style={styles.text}>Szabadkai Műszaki szakfőiskola</Text>
              <Text style={styles.text}>2023 - </Text>
              <Text style={styles.text}>Bolyai Tehetséggondozó Gimnázium és Kollégium</Text>
              <Text style={styles.text}>2019 - 2023</Text>
              <Text style={styles.text}>Thurzó Lajos Általános Iskola</Text>
              <Text style={styles.text}>2012 - 2019</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.button, {alignSelf:'center', width: '50%'}]} onPress={onBack}>
            <Text style={styles.buttonText}>Vissza</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}