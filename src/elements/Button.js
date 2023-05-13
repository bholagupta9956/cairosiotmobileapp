import { View, Text , TouchableOpacity , StyleSheet , ActivityIndicator} from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


const Button = (props) => {

  const {onPress,title , isLoading} = props ;

  return (
    <TouchableOpacity onPress={onPress}>
        <LinearGradient colors={['#6374BB' ,'#233581']} style={styles.cont}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.text}>{title}</Text> }
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    cont : {
        width : "85%" ,
        paddingVertical : 12 ,
        backgroundColor : 'blue' ,
        alignSelf : "center" ,
        marginVertical : 18 ,
        borderRadius : 50,
        height : 45 ,
        alignItems  : 'center'
    } ,
    text : {
        color : "#fff" ,
        textAlign :"center"
    }
})