import { StyleSheet,Platform } from 'react-native';

const COLORS = {
  primary: '#1E88E5',
  secondary: '#1976D2',
  background: '#121212',
  card: '#1E1E1E',
  text: '#EDEDED',
  subtitle: '#B0B0B0',
  border: '#272727',
  accent: '#64B5F6',
};

const FONTS = {
  regular: 'Montserrat-Regular',
  semiBold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold'
}

const SHADOW = Platform.select({
  ios: {
    shadowColor  : '#000',
    shadowOffset : { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius : 8,
  },
  android: {
    elevation: 6,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 13,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.subtitle,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCard: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    maxHeight: 170
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.text,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 8,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  filterPicker: {
    flex: 1,
    color: COLORS.text
  },
  filterPickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden', // Ensures the picker's border radius is respected
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkboxLabel: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.text,
  },
  storiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  paginationButton: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: COLORS.border,
  },
  paginationButtonActive: {
    backgroundColor: COLORS.primary,
  },
  paginationButtonText: {
    color: COLORS.text,
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  paginationButtonTextActive: {
    color: '#fff',
    fontFamily: FONTS.bold,
  },
});

export { styles, COLORS, FONTS };