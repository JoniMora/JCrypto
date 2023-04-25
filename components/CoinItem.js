import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CoinItem = ({coin}) => {
  return (
    <View style={styles.conteinerItem}>
       <View style={styles.coinName}>
            <Image
                style={styles.image}
                source={{uri: coin.image}}
            />

            <View style={styles.conteinerName}>
                <Text style={styles.text}>
                    {coin.name}
                </Text>

                <Text style={styles.textSymbol}>
                    {coin.symbol}
                </Text>
            </View>
       </View>

        <View>
            <Text style={styles.textPrice}>
                ${coin.current_price}
            </Text>

            <Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown]}>
                {coin.price_change_percentage_24h}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conteinerItem: {
        backgroundColor: '#121212',
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    conteinerName: {
        marginLeft: 10
    },

    coinName: {
        flexDirection: 'row',
    },

    image: {
        width: 40,
        height: 40
    },

    text: {
        color: '#ffffff',
        fontSize: 15
    },

    textSymbol: {
        color: '#434343',
        textTransform: 'uppercase'
    },

    textPrice: {
        color: '#fff',
        textAlign: 'right',
    },

    pricePercentage: {
        textAlign: 'right',
    },

    priceUp: {
        color: '#28A745'
    },

    priceDown: {
        color: '#DC3545'
    }
})

export default CoinItem