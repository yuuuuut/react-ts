import React, { useState } from 'react'

import 'swiper/css/swiper.css'
import Swiper     from 'react-id-swiper'
import NoImage    from '../../assets/img/src/no_image.png'
import { Images } from '../../reducks/products/types'

type ImageSwiperProps = {
    images: Array<Images>
}

const ImageSwiper = (props: ImageSwiperProps) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true
    })

    const images = props.images

    return (
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className="p-media__thumb">
                    <img src={NoImage} />
                </div>
            ): (
                images.map(image => (
                    <div key={image.id} className="p-media__thumb">
                        <img src={image.path} />
                    </div>
                ))
            )}
        </Swiper>
    )
}

export default ImageSwiper