import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import './AlbumPage.css';

function AlbumsPage() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const albumArr = Object.values(albums);

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    if (sessionUser) {
        return (
            <div className="album__div">
                {
                    albumArr.map((album) => {
                        if (sessionUser.id === album.userId) {
                            return (
                                <NavLink className="nav__link" key={album.userId} to={`/album/${album.id}`}>{album.name}
                                </NavLink>
                            )
                        }
                    })}
            </div>
        )
    }
}

export default AlbumsPage;