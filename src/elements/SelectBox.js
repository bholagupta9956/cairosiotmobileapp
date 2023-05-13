// creating custom select box here ;

import React from 'react';
import {View, Text, StyleSheet , ScrollView , Dimensions , Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';


const {width} = Dimensions.get('window');


const SelectBox = (props) => {
  
    const { options } = props;

  return (
    <>
      <View style={styles.container}>
      <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <SelectDropdown
            data={options}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select country'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return isOpened ? <Image source={require("../../assets/icons/upArrow.png")} style={styles.icon}/> : <Image source={require("../../assets/icons/downArrow.png")} style={styles.icon}/>;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return <Image source={require("../../assets/icons/search.png")} style={styles.icon}/>
            }}
          />
          </ScrollView>
      </View>
    </>
  );
};

export default SelectBox;

const styles = StyleSheet.create({

    container: {
        width : "100%" ,
        justifyContent : 'center',
        alignSelf : 'center'
    },
    icon :{
        width : 20 ,
        height : 20 
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF' },
    viewContainer: {flex: 1, width, backgroundColor: '#FFF' },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
        
    },
  
    dropdown1BtnStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'grey',
      alignSelf : "center",
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
    dropdown1searchInputStyleStyle: {
      backgroundColor: '#EFEFEF',
      borderRadius: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#444',
    },
  
    dropdown2BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#444',
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#444',
      borderRadius: 12,
    },
    dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
    dropdown2searchInputStyleStyle: {
      backgroundColor: '#444',
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
  
    dropdown3BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      paddingHorizontal: 0,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3BtnTxt: {
      color: '#444',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
    //   marginHorizontal: 12,
    },
    dropdown3DropdownStyle: {backgroundColor: 'slategray'},
    dropdown3RowStyle: {
      backgroundColor: 'slategray',
      borderBottomColor: '#444',
      height: 50,
    },
    dropdown3RowChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
    dropdown3RowTxt: {
      color: '#F1F1F1',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 24,
    },
    dropdown3searchInputStyleStyle: {
      backgroundColor: 'slategray',
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
  });