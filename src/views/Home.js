// src/views/Home.js
import React from 'react';
import {View, SafeAreaView, StyleSheet, FlatList, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import Product from '../components/Product';
import configureStore from '../store';
import Loader from './Loader';
const store = configureStore;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainData: {products: props.products, offset: 0, limit: 10},
      cartCount: props.cartCount,
      loading: true,
      refresh: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Title',

      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 100,
          }}>
          <TouchableOpacity
            style={{
              elevation: 8,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              paddingVertical: 8,
              paddingRight: 2,
              width: 45,
              height: 44,
            }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Details');
            }}>
            <Icon name="shoppingcart" type="antdesign" size={30} />
          </TouchableOpacity>
        </View>
      ),
    };
  };
  componentDidMount() {
    if (this.props.loadData != undefined) {
      this.props.loadData();
      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.props.loadData();
        },
      );
    }
    this.forceUpdate();
    const products = store.getState().countReducer.mainData;
    const cartcount = store.getState().countReducer.cart.length;
    if (products != undefined) {
      this.setState({
        mainData: {products: products},
        cartCount: cartcount,
        loading: false,
      });
    }
  }

  updateCartCount = () => {
    this.forceUpdate();
    setTimeout(() => {
      const cart = store.getState().countReducer.cart;
      const cartCount = cart.reduce((acc, val) => {
        if (val.count != 0) {
          acc += 1;
        }
        return acc;
      }, 0);
      if (cartCount != undefined) {
        this.setState({
          cartCount: cartCount,
          loading: false,
        });
      }
    }, 500);
  };

  render() {
    return (
      <View
        style={{
          flexGrow: 0,
          width: '100%',
          height: '100%',
        }}>
        <SafeAreaView style={styles.container}>
          {this.state.cartCount != 0 && this.state.cartCount != undefined ? (
            <Text style={styles.addCartCount}>{this.state.cartCount}</Text>
          ) : null}

          {this.state.loading ? (
            <Loader />
          ) : (
            <FlatList
              style={{flex: 1}}
              extraData={this.state.mainData}
              onEndReached={this.fetchResult}
              onEndReachedThreshold={0.7}
              data={this.state.mainData.products}
              renderItem={({item}) => (
                <Product
                  item={item}
                  withclosebutton={false}
                  updateCartCount={this.updateCartCount}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addCartCount: {
    width: 22,
    alignSelf: 'flex-end',
    left: 290,
    top: -54,
    backgroundColor: '#00e600',
    height: 25,
    color: '#ffffff',
    textAlign: 'center',
    paddingTop: 3,
    borderRadius: 10,
    elevation: 8,
    position: 'absolute',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  products: state.countReducer.mainData,
  cartCount: state.cart.length,
});

const mapDispatchToProps = dispatch => ({
  fetchState: () => dispatch({type: 'SET_SUBTOTAL'}),
});

connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default withNavigation(HomeScreen);
