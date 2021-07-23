import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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

    if (!sessionUser) history.push('/');

    if (sessionUser) {
        return (
            <div className="album__div">
                <div className="user__album__div">
                    <button className="new__album__button" onClick={newDirect}>New Album</button>
                <h3 className="user__albums__title">Your Albums</h3>
                {
                    albumArr.map((album) => {
                        if (sessionUser.id === album?.userId) {
                            return (
                                <div className="albums__list">
                                    <Link className="nav__link" key={album?.name} to={`/album/${album?.id}`}>{album?.name}
                                    </Link>
                                    <button className="edit__button"><Link className="nav__link" key={album?.name} to={`/album/${album?.id}/edit`}>Edit</Link></button>
                                </div>
                            )
                        }
                        return null;
                    })
                    }
                </div>
                <div className="other__album__div">
                    <h3>Expore Other Users Albums</h3>                    
                {
                    albumArr.map((album) => {
                        if (sessionUser.id !== album?.userId && album !== undefined) {
                            return (
                                <div className="albums__list">
                                    <Link className="nav__link" key={album?.name} to={`/album/${album?.id}`}>{album?.name}
                                    </Link>
                                    <p className="added__by">Added by: {album?.User?.username}</p>
                                </div>

                            )
                        }
                        return null;
                    })
                    }
                </div>
            </div>
        )
    }
    else {
        return history.push("/");
    }
}

export default AlbumsPage;