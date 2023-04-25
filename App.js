import { View, Text, FlatList, StyleSheet, TextInput, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import CoinItem from './components/CoinItem';


const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async() => {
    const respuesta = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const data = await respuesta.json();
    setCoins(data);
  }

  useEffect(() => {
    //console.log("Loading data");
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#fff' />

      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('./assets/jcrypto.png')}
        />

        {/* <Text style={styles.title}>JCrypto</Text> */}

        <TextInput style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor='#858585'
          onChangeText={text => setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        data={
          coins.filter(coin => coin.name.includes(search) || 
          coin.symbol.toLowerCase().includes(search))
        }
        renderItem={({item}) => {
          //console.log(item.name)
          return <CoinItem coin={item}/> 
        }}

        showsVerticalScrollIndicator={false} //Ocultar Scroll

        refreshing={refreshing}
        onRefresh={async() => {
          //console.log('refreshing');
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 150,
    height: 60,
    //backgroundColor: '#fff',
    marginTop: 50,
    flexDirection: 'row'
  },

  title: {
    color: '#fff',
    marginTop: 50,
    fontSize: 25,
  },
  
  list: {
    width: '90%'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15
  },

  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    marginTop: 50,
    width: '40%',
    textAlign: 'center'
  },

})

export default App