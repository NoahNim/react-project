import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/albums';
import './AlbumPage.css';

function AlbumsPage() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    const albumArr = Object.values(albums);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    return (
        <div className="album__div">
            <h1>Test Text</h1>
            {albumArr.map((album) => {
                return (
                    <p>{album.name}</p>
                )
            })}
        </div>
    )
}

export default AlbumsPage;