import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1></h1>
        </div>
    )
}

export default Album;