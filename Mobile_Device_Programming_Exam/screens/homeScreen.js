import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import { mdiFaceMan } from '@mdi/js';
import { styles, COLORS } from '../style/style';
import SearchFilters from '../components/SearchFilters';

const DATA_URL = 'https://people.vts.su.ac.rs/~probi/MobilProg/vizsga/Adatok/house-price-parquet.json';

export default function Home({ onSelectHouse, onShowAbout }){
    const insets = useSafeAreaInsets();
    const [allHousesData, setAllHousesData] = useState(null); // Új állapot az összes ház tárolására
    const [displayHouses, setDisplayHouses] = useState(null); // Az aktuálisan megjelenítendő házak

    const [filters, setFilters] = useState({});

    /* ---- sqft → m² ---- */
    const ft2m2 = sqft => Math.round(Number(sqft) * 0.092903);

    // Initial fetch of all houses when component mounts
    useEffect(() => {
        fetchHouses();
    }, []);

    // Apply filters whenever filters or allHousesData changes
    useEffect(() => {
        if (allHousesData) { // Only apply filters if allHousesData is available
            applyCurrentFilters();
        }
    }, [filters, allHousesData]);

    // Function to fetch all houses
    const fetchHouses = async () => {
        setRefreshing(true); // Start refreshing indicator
        try {
            const raw   = await fetch(DATA_URL).then(r => r.text());
            const objs  = raw.trim().split(/\r?\n/).map(JSON.parse);
            setAllHousesData(objs); // Store all fetched houses
        } catch (err) {
            console.warn('Fetch error:', err);
        } finally {
            setRefreshing(false); // Stop refreshing indicator
        }
    };

    // Function to apply filters or show random 10
    const applyCurrentFilters = () => {
        if (!allHousesData) return; // Guard clause: if allHousesData is null, exit

        if (Object.keys(filters).length === 0) {
            // No filters active, show 10 random houses
            const randomTen = [];
            const used = new Set();
            while (randomTen.length < 10 && used.size < allHousesData.length) {
                const index = Math.floor(Math.random() * allHousesData.length);
                if (!used.has(index)) {
                    used.add(index);
                    randomTen.push(allHousesData[index]);
                }
            }
            setDisplayHouses(randomTen);
            setTotalPages(1); // Only one page if showing random 10
        } else {
            // Filters are active, filter all houses
            const filteredResults = allHousesData.filter(item => {
                const p = Number(filters.minPrice || 0);
                const P = Number(filters.maxPrice || Infinity);
                if ('minPrice' in filters && item.price < p) return false;
                if ('maxPrice' in filters && item.price > P) return false;

                if ('minArea'  in filters && ft2m2(item.area) < filters.minArea) return false;
                if ('maxArea'  in filters && ft2m2(item.area) > filters.maxArea) return false;

                if ('bedrooms' in filters && Number(item.bedrooms)   !== filters.bedrooms) return false;
                if ('bathrooms'in filters && Number(item.bathrooms)  !== filters.bathrooms) return false;
                if ('parking'  in filters && Number(item.parking)    !== filters.parking) return false;

                if ('furnishing'in filters && item.furnishingstatus !== filters.furnishing) return false;

                if ('mainroad' in filters && item.mainroad       !== 'yes') return false;
                if ('guestroom'in filters && item.guestroom      !== 'yes') return false;
                if ('basement' in filters && item.basement       !== 'yes') return false;
                if ('hotwaterheating' in filters && item.hotwaterheating !== 'yes') return false;
                if ('airconditioning' in filters && item.airconditioning !== 'yes') return false;
                if ('prefarea' in filters && item.prefarea       !== 'yes') return false;

                if ('stories'  in filters && Number(item.stories) !== filters.stories) return false;

                return true;
            });
            setFilteredResults(filteredResults); // Store filtered results
            setCurrentPage(1); // Reset to first page when filters are applied
        }
    };

    // States for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 10 items per page
    const [filteredResults, setFilteredResults] = useState([]); // Stores the filtered houses
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [refreshing, setRefreshing] = useState(false);

    // Update paginated data when filteredResults or currentPage changes
    useEffect(() => {
        if (filteredResults) { // Guard against null filteredResults
            const newTotalPages = Math.ceil(filteredResults.length / itemsPerPage);
            setTotalPages(newTotalPages);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setDisplayHouses(filteredResults.slice(startIndex, endIndex));
        }
    }, [filteredResults, currentPage]);

    // Show loading indicator if allHousesData is not yet loaded
    if(!allHousesData) return <ActivityIndicator style={styles.center} />;

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onSelectHouse(item)}>
            <Text style={styles.title}>Ár: {Number(item.price)} RSD</Text>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Terület:</Text>
                <Text style={styles.text}>{ft2m2(item.area)} m²</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Hálók:</Text>
                <Text style={styles.text}>{item.bedrooms}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Szintek:</Text>
                <Text style={styles.text}>{item.stories}</Text>
            </View>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-end',
                alignItems: 'center',  
                marginBottom: 8
            }}>
                <TouchableOpacity style={styles.button} onPress={onShowAbout}>
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                        <Path d={mdiFaceMan} fill={'#fff'} />
                    </Svg>
                </TouchableOpacity>
            </View>
            <View>
                <SearchFilters data={allHousesData} onApply={f => setFilters(f)} />
            </View>
            <View style={{ flex: 1}}>
                <FlatList
                    data={displayHouses} // Use displayHouses for rendering
                    keyExtractor={(_, idx) => idx.toString()}
                    ListEmptyComponent={() => ( // Message when no results
                        <View style={styles.center}>
                            <Text style={styles.text}>Nincs találat a kiválasztott szűrőkkel.</Text>
                        </View>
                    )}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    style={{flex: 1}}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    refreshControl={ // Pull-to-refresh
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setFilters({}); // Clear filters on refresh
                                setCurrentPage(1); // Reset page to 1
                                fetchHouses(); // Re-fetch houses
                            }}
                            tintColor={COLORS.primary}
                        />
                    }
                />
            </View>
            {totalPages > 1 && ( 
                <View style={styles.paginationContainer}>
                    {[...Array(totalPages)].map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setCurrentPage(index + 1)}
                            style={[styles.paginationButton, currentPage === index + 1 && styles.paginationButtonActive]}
                            >
                            <Text style={[styles.paginationButtonText, currentPage === index + 1 && styles.paginationButtonTextActive]}>{index + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
}