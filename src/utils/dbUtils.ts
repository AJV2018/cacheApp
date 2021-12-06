import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import { Artist } from '../models/Artist';
enablePromise(true);


const tableName = 'Artist';
const CREATE_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS ${tableName}(char_id INTEGER PRIMARY KEY, name VARCHAR(255), birthday VARCHAR(30), occupation VARCHAR(255), img VARCHAR(255), status VARCHAR(255), nickname VARCHAR(30), appearance VARCHAR(255), portrayed VARCHAR(30), category VARCHAR(30), better_call_saul_appearance VARCHAR(255));`
const TABLE_PROPERTIES = 'char_id, name, birthday, occupation, img, status, nickname, appearance, portrayed, category, better_call_saul_appearance'


const getArtistParams = (i: Artist) => [i.char_id, i.name, i.birthday, JSON.stringify(i.occupation), i.img, i.status, i.nickname, JSON.stringify(i.appearance), i.portrayed, i.category, JSON.stringify(i.better_call_saul_appearance)]


export const getDBConnection = async () => {
    return openDatabase({ name: 'todo-data.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    await db.executeSql(CREATE_TABLE_QUERY);
};

export const getArtistDb = async (db: SQLiteDatabase): Promise<Artist[]> => {
    try {
        const artists: Artist[] = [];
        const results = await db.executeSql(`SELECT * FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                artists.push(result.rows.item(index))
            }
        });
        return artists;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get artists !!!');
    }
};


export const saveArtistDb = async (db: SQLiteDatabase, artist: Artist) => {
    const placeholders = Object.keys(demoArtist).map(itm => '?');
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(${TABLE_PROPERTIES}) values` +
        `(${placeholders});`;
    const insertParams = getArtistParams(artist)
    // console.log('INSERT >>', insertQuery, insertParams)
    return db.executeSql(insertQuery, insertParams);
};

export const deleteArtist = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery = `DELETE from ${tableName} where char_id = ${id}`;
    await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
    const query = `drop table ${tableName}`;

    await db.executeSql(query);
};


const demoArtist = {
    "char_id": 1,
    "name": "Walter White",
    "birthday": "09-07-1958",
    "occupation": [
        "High School Chemistry Teacher",
        "Meth King Pin"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
    "status": "Presumed dead",
    "nickname": "Heisenberg",
    "appearance": [
        1,
        2,
        3,
        4,
        5
    ],
    "portrayed": "Bryan Cranston",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
}