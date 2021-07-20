import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { id } = useParams();
    const photos = useSelector(state => state.albums);
    const photoArr = Object.values(photos);
    console.log(photoArr);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    return (
        <div>
            {photoArr.map(photo => {
                return (
                    <div>
                        <h2 key={photo.name}>{photo.name}</h2>
                        <img key={photo.name} src={photo.imgUrl} height="100" width="100"></img>
                    </div>
                )
            })}
        </div>
    )
}

export default Album;