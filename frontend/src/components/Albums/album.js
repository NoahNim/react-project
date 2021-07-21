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
    const album = useSelector(state => state.albums);

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    function handleDeletAlbum() {
        dispatch(deleteAlbum(id))
        return history.push('/album')
    }

    return (
        <div>
            <button hidden={!sessionUser && sessionUser.id !== album.album.id} className="delete__button" onClick={handleDeletAlbum}>Delete Album</button>
            {photoArr?.map(photo => {
                if (photo?.albumId === Number(id)) {
                    return (
                        <div>
                            <div>
                                <h2 key={photo?.name}>{photo?.name}</h2>
                                <img key={photo?.id} src={photo?.imgUrl} alt="meow" height="100" width="100"></img>
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