import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/albums';
import './AlbumPage.css';

function AlbumsPage() {
    const dispatch = useDispatch();
    // const album = useSelector(state => state.album)

    // console.log(album);

    useEffect(() => {
        console.log(dispatch(getAlbums()));
        dispatch(getAlbums());
    }, [dispatch]);

    return (
        <div className="album__div">
            <h1>Test Text</h1>
        </div>
    )
}

export default AlbumsPage;