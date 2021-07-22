import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getPhoto } from '../../store/photos';

function Photo() {
    const { id } = useParams();
    const currPhoto = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const photoArr = Object.values(currPhoto);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPhoto(id))
    });

    return (
        <div>
            {
                photoArr?.map(photo => {
                    if (photo?.id === Number(id)) {
                        return (
                            <div>
                                <h2 key={photo?.name}>{photo?.name}</h2>
                                <img key={photo?.id} src={photo?.imgUrl} alt="meow" height="100" width="140"></img>
                            </div>
                        )
                    }
                })
            }
        </div>
    )    
}

export default Photo;