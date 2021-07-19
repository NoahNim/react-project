import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
            {albumArr.map((album) => {
                return (
                    <NavLink className="nav__link" key={album.name} to={`/album/${album.id}`}>{album.name}</NavLink>
                )
            })}
        </div>
    )
}

export default AlbumsPage;