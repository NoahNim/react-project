import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getPhoto, deletePhoto } from '../../store/albums';
import './Photos.css';

function Photo() {
    const { id } = useParams();
    const currPhoto = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const photoArr = Object.values(currPhoto);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch]);

    const handleDeletPhoto = async () => {
        await dispatch(deletePhoto(id))
        history.go(-1);
    }

    return (
        <div className="photo__div">
            {
                photoArr?.map(photo => {
                    if (photo?.id === Number(id)) {
                        return (
                            <div>
                                <div className="user__photo__div">
                                    <h2 key={photo?.name}>{photo?.name}</h2>
                                    <img key={photo?.id} src={photo?.imgUrl} alt="meow" height="100" width="140"></img>
                                    <p className="added__by"> Uploaded by: {photo?.User?.username}</p>
                                </div>
                                <button hidden={sessionUser.id !== photo?.userId} className="edit__button"><Link className="nav__link" key={photo?.name} to={`/photo/${photo?.id}/edit`}>Edit</Link></button>
                                <button hidden={sessionUser.id !== photo?.userId} className="delete__button photo__delete" onClick={handleDeletPhoto}>Delete</button>
                            </div>
                        )
                    }
                    return null;
                })
            }
        </div>
    )
}

export default Photo;