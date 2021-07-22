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

    const handleDeletAlbum = async () => {
        await dispatch(deleteAlbum(id))
        history.push('/album')
    }

    return (
        <div className="album__div">
            {photoArr?.map(photo => {
                if (photo?.albumId === Number(id)) {
                    return (
                        <div className="photo__list">
                            <div>
                                <h2 key={photo?.name}>{photo?.name}</h2>
                                <img key={photo?.id} src={photo?.imgUrl} alt="meow" height="100" width="100"></img>
                            </div>
                            <button hidden={sessionUser.id !== album.userId} className="delete__button">Delete</button>
                        </div>
                    )
                }
            })}
            <button hidden={sessionUser.id !== album.userId} className="delete__button" onClick={handleDeletAlbum}>Delete Album</button>
        </div>
    )


}

export default Album;