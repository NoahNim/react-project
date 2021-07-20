import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { albumId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbum(albumId));
    }, [dispatch, albumId]);

    return (
        <div>
            Test Text
        </div>
    )
}

export default Album;