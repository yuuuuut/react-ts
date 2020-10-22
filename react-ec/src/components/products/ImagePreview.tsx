import React from 'react'

type ImagePreviewProps = {
    id: string;
    path: string;
    delete: (id: string) => void;
};

const ImagePreview = (props: ImagePreviewProps) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img src={props.path} />
        </div>
    )
}

export default ImagePreview