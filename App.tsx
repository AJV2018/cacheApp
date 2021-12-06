import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import ArtistComp from './src/components/ArtistComp';
import { Artist } from './src/models/Artist';
import { createTable, getArtistDb, getDBConnection, saveArtistDb } from './src/utils/dbUtils';
import { getAllArtistsApi } from './src/utils/requestUtils';

const App = () => {

  const [artists, setArtists] = useState<Artist[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedArtists = await getArtistDb(db);
      if (storedArtists.length) {
        setArtists(storedArtists);
      } else {
        try {
          const data: Artist[] = await getAllArtistsApi()
          const allPromises = data.map(itm => saveArtistDb(db, itm))
          Promise.all(allPromises).then(() => {
            setArtists(data);
          }).catch(err => alert('Oops! Something went wrong!'))
        } catch (error) {
          alert('Oops! Something went wrong!')
        }
      }
    } catch (error) {
      alert('Oops! Something went wrong!')
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const _renderItem = ({ item, index }) => <ArtistComp item={item} index={index} />
  return (
    <View>
      <FlatList
        data={artists}
        keyExtractor={itm => itm.char_id.toString()}
        renderItem={_renderItem}
        numColumns={3}
        contentContainerStyle={{
          padding: 10
        }}
      />
    </View>
  );
};

export default App;
