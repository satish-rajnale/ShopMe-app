// src/components/Product.js
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, Button, Image, Input} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {withNavigation} from 'react-navigation';
import {ReactReduxContext, useDispatch, useSelector} from 'react-redux';

function Product({item, withclosebutton, setModalVisible, updateCartCount}) {
  const [productCount, setProductCount] = useState('0');
  const dispatch = useDispatch();
  const store = useSelector(state =>
    state.countReducer.cart.filter(obj => obj.id == item.id),
  );

  useEffect(() => {
    if (store.length != 0) {
      setProductCount(store[0].count);
    }
  }, [store]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{uri: item.image}} />
      </View>
      <View style={styles.rightContent}>
        <View style={(styles.title, {display: 'flex', flexDirection: 'row'})}>
          <Text numberOfLines={2} style={{width: 150}}>
            {item.title}
          </Text>
          {withclosebutton ? (
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => setModalVisible(item.id)}>
              <Icon
                name="delete"
                type="material-icons"
                color="#ff8080"
                size={20}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={[
            styles.rightContent,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 180,
            },
          ]}>
          <Text style={styles.price}>${item.price}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                dispatch({
                  type: 'REDUCE_COUNT',
                  id: item.id,
                });
                dispatch({
                  type: 'SET_SUBTOTAL',
                });
                updateCartCount();
              }}>
              <Icon name="minus" type="font-awesome" size={20} />
            </TouchableOpacity>
            <TextInput
              textAlign={'center'}
              style={{
                backgroundColor: 'whitesmoke',
                height: 32,
                width: 32,
                padding: 0,
                color: '#000000',
                marginHorizontal: 5,
                borderColor: '#000000',
                borderWidth: 1,
                borderRadius: 7,
                marginBottom: 5,
              }}
              value={String(productCount)}
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                updateCartCount();
                dispatch({
                  type: 'INCREMENT_COUNT',
                  id: item.id,
                });
                dispatch({
                  type: 'SET_SUBTOTAL',
                });
              }}>
              <Icon name="plus" type="font-awesome" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    paddingVertical: 5,
    width: 35,
    height: 30,
  },

  name: {
    color: '#5a647d',
    fontWeight: 'bold',
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#c1c4cd',
  },
  wrapper: {
    flexDirection: 'row',
    height: 150,
    display: 'flex',
    alignItems: 'center',
    padding: 14,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 13,
    width: '92%',
    elevation: 10,
    borderRadius: 5,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 110,
    height: 130,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
    fontWeight: '400',

    width: 50,
  },
  price: {
    fontSize: 16,
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

export default withNavigation(Product);
