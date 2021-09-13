import {createAppContainer} from 'react-navigation';
import AppNavigator from './src/AppNavigator';
import configureStore from './src/store';
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Loader from './src/views/Loader';
import {SafeAreaView, Text} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-elements';
const store = configureStore;
const Appcontainer = createAppContainer(AppNavigator);

const App = () => {
  const [state, setState] = useState([]);
  const [isfetched, setisfetched] = useState(false);
  const [loading, setloading] = useState(true);
  const mainData = useSelector(state => state.countReducer.mainData);
  const dispatch = useDispatch();

  const getData = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => res.data)
      .then(data => {
        if (data && data.length > 0) {
          setState(data);
          setisfetched(true);
        }
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isfetched) {
      dispatch({
        type: 'STORE_MAIN_DATA',
        payload: state,
      });
      if (mainData.length != 0) {
        setloading(false);
      }
    }
  }, [state, mainData, isfetched]);
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : isfetched ? (
        <Provider store={store}>
          <Appcontainer />
        </Provider>
      ) : (
        <Button title="Retry" onPress={() => getData()} />
      )}
    </SafeAreaView>
  );
};

export default App;
