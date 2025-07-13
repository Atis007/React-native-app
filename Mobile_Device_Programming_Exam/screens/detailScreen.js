import React from 'react';
import { Text, Image, ScrollView, TouchableOpacity, Dimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, COLORS } from '../style/style';

export default function Detail({ house, onBack }) {
    const insets = useSafeAreaInsets();
    const { width, height } = Dimensions.get('window');

    const MIN_HEIGHT   = height * 0.5;
    const MAX_HEIGHT   = height * 0.7;
    const calcHeight   = Math.min(
    Math.max(width * 9 / 16, MIN_HEIGHT),MAX_HEIGHT);

    /* ---- dinamikus ház-kép a “stories” alapján ---- */
    const imgUri = `https://people.vts.su.ac.rs/~26224103/images/Charming_${house.stories}_storey_Country_Manor.png`;

    const label = {
        price: 'Ár',
        area: 'Terület',
        bedrooms: 'Hálószobák',
        bathrooms: 'Fürdők',
        stories: 'Szintek',
        mainroad: 'Főút mellett',
        guestroom: 'Vendégszoba',
        basement: 'Pince',
        hotwaterheating: 'Melegvíz-fűtés',
        airconditioning: 'Légkondi',
        parking: 'Parkoló',
        prefarea: 'Keresett környék',
        furnishingstatus: 'Bútorozottság',
    };
    const ft2m2 = sqft => Math.round(Number(sqft) * 0.092903);

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
                <Image source={{ uri: imgUri }} 
                    style={{ 
                        width: '100%', 
                        height: calcHeight, 
                        borderRadius: 12,
                        marginBottom: 16
                    }} resizeMode="cover" />
                <Text style={styles.title}>Részletek</Text>
                
                {Object.entries(house).map(([k, v]) => (
                    <View key={k} style={styles.row}>
                        <Text style={styles.subtitle}>{label[k]}</Text>
                        <Text style={styles.text}>
                            {k === 'area' ? `${ft2m2(v)} m²` : 
                             (k === 'guestroom' || 
                              k === 'basement' || 
                              k === 'hotwaterheating' || 
                              k === 'airconditioning')
                              ? (v === 'yes' ? 'Van' : 'Nincs')
                              : k === 'prefarea' ? (v === 'yes' ? 'Igen' : 'Nem')
                              : k === 'mainroad' ? (v === 'yes' ? 'Igen' : 'Nem')
                              : v === 'furnished' ? 'Berendezett'
                              : v === 'semi-furnished' ? 'Félig berendezett' 
                              : v === 'unfurnished' ? 'Üres' 
                              : v
                            }
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
        <TouchableOpacity style={[styles.button, {alignSelf:'center', width: '50%', marginTop: 8}]} onPress={onBack}>
            <Text style={styles.buttonText}>Vissza</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}