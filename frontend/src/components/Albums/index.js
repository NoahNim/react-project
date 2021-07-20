import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import './AlbumPage.css';

function AlbumsPage() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const albumArr = Object.values(albums);
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    function newDirect() {
        history.push("/album/new")
    }

    if (sessionUser) {
        return (
            <div className="user__album__div">
                <button onClick={newDirect}>New Album</button>
                <h3>Your Albums</h3>
                {
                    albumArr.map((album) => {
                        if (sessionUser.id === album.userId) {
                            return (
                                <div>
                                    <NavLink className="nav__link" key={album.name} to={`/album/${album.id}`}>{album.name}
                                    </NavLink>
                                    <button className="edit__button"><NavLink className="nav__link" key={album.name} to={`/album/${album.id}/edit`}>Edit</NavLink></button>
                                </div>
                            )
                        }
                    })
                }
                <h3>Expore Other Users Albums</h3>
                {
                    albumArr.map((album) => {
                        if (sessionUser.id !== album.userId) {
                            return (
                                <div>
                                    <NavLink className="nav__link" key={album.name} to={`/album/${album.id}`}>{album.name}
                                    </NavLink>
                                </div>
                               
                            )
                        }
                    })
                }
            </div>
        )
    }
    else {
        return history.push("/");
    }
}

export default AlbumsPage;