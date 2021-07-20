import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { id } = useParams();
    const photos = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const photoArr = Object.values(photos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    if (sessionUser) {
        return (
            <div>
                {photoArr.map(photo => {
                    console.log(photo.albumId)
                    if (sessionUser.id === photo.userId && photo.albumId === Number(id)) {
                        return (
                            <div>
                                <h2 key={photo.name}>{photo.name}</h2>
                                <img key={photo.id} src={photo.imgUrl} alt="meow" height="100" width="100"></img>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

}

export default Album;