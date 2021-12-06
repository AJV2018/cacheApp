import shorthash from "shorthash"
import * as fs from 'react-native-fs'

//if cache exists return file uri or else cache it and return the uri
export const getCachedImage = async (uri: string) => {
    const hash = shorthash.unique(uri);
    const path = `${fs.CachesDirectoryPath}/${hash}`
    const image = await fs.exists(path);
    if (image) {
        // console.log('IMAGE EXISTS')
        return `file://${path}`
    }
    // console.log('IMAGE DOES NOT EXISTS')
    fs.downloadFile({
        fromUrl: uri,
        toFile: path
    });
    return uri;
}

