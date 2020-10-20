import React, { useCallback } from 'react'

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import IconButton from "@material-ui/core/IconButton"
import { storage } from '../../firebase/index'
import ImagePreview from './ImagePreview'
import { Images } from '../../reducks/products/types'

type ImageAreaProps = {
    images: Array<Images>
    setImages: Function
}

const ImageArea = (props: ImageAreaProps) => {

    const uploadImage =  useCallback((event: any) => {
        //dispatch(showLoadingAction("uploading..."))
        const file = event.target.files;
        
        let blob = new Blob(file, { type: "image/jpeg" });

        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef  = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages(((prevState: Array<Images>) => [...prevState, newImage]))
                //dispatch(hideLoadingAction())
            });
        }).catch(() => {
            //dispatch(hideLoadingAction())
        });
    }, [props.setImages])

    const deleteImage = useCallback(async (id: string): Promise<any> => {
        const ret = window.confirm('削除しますか?')

        if (!ret) {
            return false
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages)
            return storage.ref('images').child(id).delete()
        }
    }, [props.images])

    return (
        <div>
            <div className="p-grid__list-images">
                {props.images.length > 0 && (
                    props.images.map(image =>
                        <ImagePreview
                            delete={deleteImage}
                            id={image.id}
                            path={image.path}
                            key={image.id}
                        />)
                )}
            </div>
            <div className="u-text-right">
                <span>商品画像を登録</span>
                <IconButton>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input
                            className="u-display-none"
                            type="file"
                            id="image"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea