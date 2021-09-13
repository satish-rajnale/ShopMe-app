// src/views/Details.js
import React, {useEffect, useState} from 'react';
import { Modal, Pressable, SafeAreaView} from 'react-native';

import Product from '../components/Product';
import { shallowEqual} from 'react-redux';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './Loader';
import { Divider} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const DetailsScreen = ({navigation}) => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [subTotal, setsubTotal] = useState(0);
  const [selctedProduct, setselctedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openShipModal, setopenShipModal] = useState(false);

const loadData = () => {
  axios.get('https://fakestoreapi.com/products')
  .then(res => res.data)
  .then(data => {
    if (data && data.length > 0) {
      setState(data);
      setisfetched(true);
    }
  })
  .catch((err)=> {
      console.log(err);
      setloading(false)
  })
}

  const dispatch = useDispatch();
  const cart = useSelector(state => state.countReducer.cart, shallowEqual);
  const mainData = useSelector(state => state.countReducer.mainData);
  const gettotal = useSelector(state => state.countReducer.subtotal);

  const deleteItemFromCart =() => {
    dispatch({
      type : "DELETE_RECORD",
      id : selctedProduct
    });
    dispatch({
      type: 'SET_SUBTOTAL',
    });
 setModalVisible(!modalVisible);
 setloading(!loading);
 
  }

  useEffect(() => {
    if (cart.length != 0) {
      const prodList = [];
      for (let obj of mainData) {
        for (let cartObj of cart) {
          if (cartObj.id == obj.id && cartObj.count !=0) {
            prodList.push(obj);
          }
        }
      }

      setproducts(prodList);
      setloading(false);
      setsubTotal(gettotal);
     
    } else {
      setloading(false);
    }
  }, [cart, mainData, gettotal,loading]);
  const openCloseModal = (id) => {
    setModalVisible(!modalVisible);
    setselctedProduct(id)
  };
const shipOrder = () => {

setopenShipModal(!openShipModal);
dispatch({type:"DESTROY_CART"})

navigation.push("Home", {loadData : loadData})
}
 const updateCartCount = () => {
  }
  return (
    <ScrollView
     >
      {/* {ishipped ? <Image style={{width:300,height:300,resizeMode:"contain"}} source={require('../../assets/shipping.gif')} /> : 
} */}
      {loading ? (
        <Loader />
      ) : products.length != 0 ? (
        <SafeAreaView style={{flex: 1}}>
          {products.map(item => (
            <Product
              item={item}
              key={item.id}
              withclosebutton={true}
              updateCartCount={updateCartCount}
              setModalVisible={openCloseModal}
            />
          ))}
          <View style={styles.priceContainer}>
            <View style={styles.priceSection}>
              <Text style={styles.priceHeadings}>Total</Text>
              <Text style={styles.totalPrice}>${subTotal}</Text>
            </View>

            <Divider style={{backgroundColor: 'blue', height: 1}} />
            <TouchableOpacity
              style={styles.buyButton}
              activeOpacity={0.7}
              onPress={() => {
                setopenShipModal(!openShipModal)
              }}>
              <Text style={{fontSize: 21, color: '#ffffff'}}>BUY</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={{backgroundColor:"#ffffff", alignItems:"center",justifyContent:"center", width:"100%",height:650}}>
        <Text style={{fontSize:30}}>No items in the Cart! </Text>
        </View>
      )}
      {/* modal for delete options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to remove this product from cart?</Text>
            <View style={{flexDirection:"row"}}> 
            <Pressable
              style={[styles.modalbutton, styles.buttonClose,{backgroundColor:"#00e600",color:"#ffffff"}]}
              onPress={() =>
                deleteItemFromCart()
                }>
              <Text style={styles.textStyle}>YES</Text>
            </Pressable>
            <Pressable
              style={[styles.modalbutton, styles.buttonClose,{backgroundColor:"#ff3333",color:"#ffffff"}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>NO</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      
      {/* modal for buy */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openShipModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setopenShipModal(!openShipModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ready to Order?</Text>
            <Text style={styles.modalText, {fontWeight:"bold"}}>Price : {subTotal}</Text>
            <View style={{flexDirection:"row"}}> 
            <Pressable
              style={[styles.modalbutton, styles.buttonClose,{backgroundColor:"#00e600",color:"#ffffff"}]}
              onPress={() =>
                shipOrder()}
                >
              <Text style={styles.textStyle}>YES</Text>
            </Pressable>
            <Pressable
              style={[styles.modalbutton, styles.buttonClose,{backgroundColor:"#ff3333",color:"#ffffff"}]}
              onPress={() => setopenShipModal(!openShipModal)}>
              <Text style={styles.textStyle}>NO</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width:250,
    height:150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbutton: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical:10,
    marginHorizontal:20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buyButton: {
    elevation: 8,
    backgroundColor: '#9999ff',
    borderRadius: 7,
    alignItems: 'center',
    paddingTop: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    width: 255,
    height: 50,
  },
  priceContainer: {
    height: 150,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 13,
    width: '92%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  priceSection: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 130,
    resizeMode: 'contain',
  },
  priceHeadings: {
    fontSize: 18,
    fontWeight: '400',

    width: 160,
  },
  totalPrice: {
    fontSize: 20,
    color: '#303540',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rightContent: {
    height: 120,
    display: 'flex',

    justifyContent: 'space-between',
  },
});
