import React, { useEffect, useState } from 'react'
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native'
import { getCachedImage } from '../utils/fsUtils'

interface CachedImageProps {
    uri: string;
    style: StyleProp<ImageStyle>;
}

const CachedImage = ({ uri, style }: CachedImageProps) => {
    const [image, setImage] = useState(null)

    useEffect(() => {
        (
            async () => {
                const imageSource = await getCachedImage(uri);
                setImage({
                    uri: imageSource
                })
            }
        )()
    }, [])
    return (
        <Image
            source={image}
            style={style}
        />
    )
}

export default CachedImage
