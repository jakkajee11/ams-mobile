import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const baseStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 5,
    //backgroundColor: Colors.yellow,
    //height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 5,
  },
  content: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  attachmentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 0.6,
    borderColor: Colors.yellow,
    minHeight: 300,
  },
  image: {
    minWidth: 200,
    minHeight: 300,
  },
  imageLabel: {
    textAlign: 'center',
  },
  buttonGroupBottom: {
    width: '100%',
    padding: 5,
    justifyContent: 'space-around',
    flex: 0.2,
  },
  qrCodeFoundLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  qrCodeNotFoundLabel: {
    fontSize: 18,
    color: Colors.red,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
  },
  col: {
    padding: 5,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  textCenter: {
    textAlign: 'center',
  },
  label: {
    fontStyle: 'normal',
  },
  longText: {
    flex: 0.98,
    textAlign: 'right',
  },
  textSmallItalic: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  textItalic: {
    fontStyle: 'italic',
  },
})

export default baseStyles
