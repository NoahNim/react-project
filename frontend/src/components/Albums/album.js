import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAlbum, deleteAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { id } = useParams();
    const photos = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const photoArr = Object.values(photos);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    function handleDeletAlbum() {
        dispatch(deleteAlbum(id))
        return history.push('/album')
    }

    if (sessionUser) {
        return <button className="delete__button" onClick={handleDeletAlbum}>Delete Album</button>
    }

    return (
        <div>
            { }
            {photoArr.map(photo => {
                console.log(photo.albumId)
                if (sessionUser.id === photo.userId && photo.albumId === Number(id)) {
                    return (
                        <div>
                            <div>
                                <h2 key={photo.name}>{photo.name}</h2>
                                <img key={photo.id} src={photo.imgUrl} alt="meow" height="100" width="100"></img>
                            </div>
                            <button className="delete__button">Delete</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Album;