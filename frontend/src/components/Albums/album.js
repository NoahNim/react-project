import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getAlbum, deleteAlbum } from '../../store/albums';
import './AlbumPage.css';

function Album() {
    const { id } = useParams();
    const photos = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const photoArr = Object.values(photos);
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = photoArr.filter(photo => sessionUser?.id === photo?.id);

    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    const handleDeletAlbum = async () => {
        if (userId !== null ) {
            await dispatch(deleteAlbum(id))
            history.push('/album')
        }
        else {
            <h1>
                Seriously, stop trying to hack the website
            </h1>
        }
    }

    function newDirect() {
        history.push(`/photo/album/${id}/new-photo`)
    }

    if (!sessionUser) history.push("/");

    return (
        <div>
            <div className="one__album__div">
                <button hidden={sessionUser.id !== Number(id) ? true : false}  className="new__photo__button" onClick={newDirect}>Add Photo</button>
                {photoArr?.map(photo => {
                    if (photo?.albumId === Number(id)) {
                        return (
                            <div className="photo__list">
                                <div>
                                    {/* <h2 key={photo?.name}>{photo?.name}</h2> */}
                                    <Link to={`/photo/${photo?.id}`}>
                                        <img key={photo?.albumId} src={photo?.imgUrl} alt="meow" height="200" width="230"></img>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <button hidden={sessionUser.id !== Number(id) ? true : false} className="delete__button" onClick={handleDeletAlbum}>Delete Album</button>
        </div>
    )
}

// hidden = { sessionUser.id !== album.albums?.userId }
export default Album;