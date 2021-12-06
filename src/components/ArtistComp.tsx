import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Artist } from '../models/Artist'
import CachedImage from './CachedImage'
interface ArtistCompProps {
    item: Artist,
    index: number;
}
const ArtistComp = ({ item, index }: ArtistCompProps) => {
    return (
        <View style={styles.container}>
            <CachedImage
                uri={item.img}
                style={styles.image}
            />
        </View>
    )
}

export default ArtistComp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height / 4,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})
