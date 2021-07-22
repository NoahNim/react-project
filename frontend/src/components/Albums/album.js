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

    const handleDeletAlbum = async () => {
        await dispatch(deleteAlbum(id))
        history.push('/album')
    }

    if (!sessionUser) history.push("/");

    return (
        <div className="album__div">
            {photoArr?.map(photo => {
                if (photo?.albumId === Number(id)) {
                    return (
                        <div className="photo__list">
                            <div>
                                <h2 key={photo?.name}>{photo?.name}</h2>
                                <img key={photo?.id} src={photo?.imgUrl} alt="meow" height="100" width="140"></img>
                            </div>
                            <button hidden={sessionUser.id !== photo?.userId} className="delete__button photo__delete">Delete</button>
                        </div>
                    )
                }
                return 'success!';
            })}
            <button className="delete__button" onClick={handleDeletAlbum}>Delete Album</button>
        </div>
    )
}

// hidden = { sessionUser.id !== album.albums?.userId }
export default Album;