import React from 'react'

type ImagePreviewProps = {
    id: string;
    path: string;
    delete: (id: string) => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img src={props.path} />
        </div>
    )
}

export default ImagePreview