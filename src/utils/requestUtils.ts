import { default as axios } from 'axios';
import { Artist } from '../models/Artist';

export const getAllArtistsApi = (): Promise<Artist[]> => {
    return new Promise((resolve, reject) => {
        axios.get('https://www.breakingbadapi.com/api/characters')
            .then(res => resolve(res.data))
            .catch(reject)
    })

}