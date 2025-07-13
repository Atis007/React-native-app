// components/SearchFilters.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Svg, Path } from 'react-native-svg';
import { mdiHomeFloor0, mdiHomeFloor1, mdiHomeFloor2, mdiHomeFloor3 } from '@mdi/js';
import { styles, COLORS, FONTS } from '../style/style';

export default function SearchFilters({ data, onApply }) {
  const ft2m2 = sqft => Math.round(Number(sqft) * 0.092903);
  
  const prices = data.map(d => Number(d.price));
  const areas  = data.map(d => Number(d.area));   
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minArea  = ft2m2(Math.min(...areas));
  const maxArea  = ft2m2(Math.max(...areas));

  // form state-ek
  const [minP, setMinP] = useState('');
  const [maxP, setMaxP] = useState('');
  const [minA, setMinA] = useState('');
  const [maxA, setMaxA] = useState('');

  const [bedrooms, setBedrooms]     = useState('');
  const [bathrooms, setBathrooms]   = useState('');
  const [parking, setParking]       = useState('');
  const [furnishing, setFurnishing] = useState('');

  const [mainroad, setMainroad]               = useState(false);
  const [guestroom, setGuestroom]             = useState(false);
  const [basement, setBasement]               = useState(false);
  const [hotwaterheating, setHotwaterheating] = useState(false);
  const [airconditioning, setAirconditioning] = useState(false);
  const [prefarea, setPrefarea]               = useState(false);

  const [stories, setStories] = useState(null);

  const clearFilters = () => {
    setMinP('');
    setMaxP('');
    setMinA('');
    setMaxA('');
    setBedrooms('');
    setBathrooms('');
    setParking('');
    setFurnishing('');
    setMainroad(false);
    setGuestroom(false);
    setBasement(false);
    setHotwaterheating(false);
    setAirconditioning(false);
    setPrefarea(false);
    setStories(null);
  };

  return (
    <ScrollView style={styles.filterCard} contentContainerStyle={{ paddingBottom: 16 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      
      {/* Ár szűrő */}
      <Text style={[styles.filterLabel, {marginLeft: 6, marginBottom: 8}]}>Ár</Text>
      <View style={styles.filterRow}>
        <TextInput
          placeholder={`${minPrice} RSD`}
          placeholderTextColor={COLORS.subtitle}
          keyboardType="numeric"
          style={[styles.filterInput, {marginRight: 8}]}
          value={minP}
          onChangeText={setMinP}
        />
        <TextInput
          placeholder={`${maxPrice} RSD`}
          placeholderTextColor={COLORS.subtitle}
          keyboardType="numeric"
          style={styles.filterInput}
          value={maxP}
          onChangeText={setMaxP}
        />
      </View>

      {/* Terület szűrő */}
      <Text style={[styles.filterLabel, {marginLeft: 6, marginBottom: 8}]}>Terület</Text>
      <View style={styles.filterRow}>
        <TextInput
          placeholder={`${minArea} m²`}
          placeholderTextColor={COLORS.subtitle}
          keyboardType="numeric"
          style={[styles.filterInput, {marginRight: 8}]}
          value={minA}
          onChangeText={setMinA}
        />
        <TextInput
          placeholder={`${maxArea} m²`}
          placeholderTextColor={COLORS.subtitle}
          keyboardType="numeric"
          style={styles.filterInput}
          value={maxA}
          onChangeText={setMaxA}
        />
      </View>

      {/* Hálószobák picker */}
      <View style={[styles.filterPickerContainer, {marginBottom: 12}]}>
        <Picker
          selectedValue={bedrooms}
          onValueChange={setBedrooms}
          style={styles.filterPicker}
        >
          <Picker.Item label="Hálószobák" value="" />
          {[1,2,3,4,5,6].map(n => (
            <Picker.Item key={n} label={`${n} hálószoba`} value={n} />
          ))}
        </Picker>
      </View>

      {/* Fürdőszobák picker */}
      <View style={[styles.filterPickerContainer, {marginBottom: 12}]}>
        <Picker
          selectedValue={bathrooms}
          onValueChange={setBathrooms}
          style={styles.filterPicker}
        >
          <Picker.Item label="Fürdőszobák" value="" />
          {[1,2,3,4].map(n => (
            <Picker.Item key={n} label={`${n} fürdőszoba`} value={n} />
          ))}
        </Picker>
      </View>

      {/* Parkoló picker */}
      <View style={[styles.filterPickerContainer, {marginBottom: 12}]}>
        <Picker
          selectedValue={parking}
          onValueChange={setParking}
          style={styles.filterPicker}
        >
          <Picker.Item label="Parkolóhelyek" value="" />
          {[0,1,2,3].map(n => (
            <Picker.Item key={n} label={`${n} parkolóhely`} value={n} />
          ))}
        </Picker>
      </View>

      {/* Berendezés picker */}
      <View style={[styles.filterPickerContainer, {marginBottom: 16}]}>
        <Picker
          selectedValue={furnishing}
          onValueChange={setFurnishing}
          style={styles.filterPicker}
        >
          <Picker.Item label="Berendezettség" value="" />
          <Picker.Item label="Berendezett" value="furnished" />
          <Picker.Item label="Félig berendezett" value="semi-furnished" />
          <Picker.Item label="Üres" value="unfurnished" />
        </Picker>
      </View>

      {/* Checkboxok */}
      {[
        ['Főút mellett', mainroad, setMainroad],
        ['Vendégszoba', guestroom, setGuestroom],
        ['Pince', basement, setBasement],
        ['Melegvíz fűtés', hotwaterheating, setHotwaterheating],
        ['Légkondicionáló', airconditioning, setAirconditioning],
        ['Keresett környék', prefarea, setPrefarea],
      ].map(([label, val, setter]) => (
        <View key={label} style={[styles.checkboxContainer, {marginBottom: 8}]}>
          <Text style={styles.checkboxLabel}>{label}</Text>
          <Switch 
            value={val} 
            onValueChange={setter}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
            thumbColor={val ? COLORS.primary : COLORS.subtitle}
          />
        </View>
      ))}

      {/* Szintek ikonok */}
      <Text style={[styles.filterLabel, {marginLeft: 6, marginBottom: 8, marginTop: 8}]}>Szintek</Text>
      <View style={styles.storiesRow}>
        {[mdiHomeFloor0, mdiHomeFloor1, mdiHomeFloor2, mdiHomeFloor3].map(
          (path, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setStories(idx + 1)}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: stories === idx + 1 ? COLORS.primary : COLORS.border,
                marginHorizontal: 4,
                borderWidth: 1,
                borderColor: stories === idx + 1 ? COLORS.accent : COLORS.border,
              }}
            >
              <Svg width={32} height={32} viewBox="0 0 24 24">
                <Path
                  d={path}
                  fill={stories === idx + 1 ? '#fff' : COLORS.text}
                />
              </Svg>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Gombok */}
      <View style={[styles.filterRow, {marginTop: 16}]}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: COLORS.border, flex: 1, marginRight: 8}]}
          onPress={clearFilters}
        >
          <Text style={[styles.buttonText, {color: COLORS.text}]}>Törlés</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, {flex: 1}]}
          onPress={() =>
            onApply({
              ...(minP !== '' && { minPrice: Number(minP) }),
              ...(maxP !== '' && { maxPrice: Number(maxP) }),
              ...(minA !== '' && { minArea: Number(minA) }),
              ...(maxA !== '' && { maxArea: Number(maxA) }),
              ...(bedrooms !== '' && { bedrooms: Number(bedrooms) }),
              ...(bathrooms !== '' && { bathrooms: Number(bathrooms) }),
              ...(parking !== '' && { parking: Number(parking) }),
              ...(furnishing !== '' && { furnishing }),
              ...(mainroad && { mainroad: true }),
              ...(guestroom && { guestroom: true }),
              ...(basement && { basement: true }),
              ...(hotwaterheating && { hotwaterheating: true }),
              ...(airconditioning && { airconditioning: true }),
              ...(prefarea && { prefarea: true }),
              ...(stories !== null && { stories: Number(stories) })
            })
          }
        >
          <Text style={styles.buttonText}>Szűrés</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}