import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import './AlbumPage.css';


function CreateAlbum() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();



    // if (sessionUser) {
        return (
            <div>
                <h1>Test Text</h1>
            </div>
        )
    // }
   
}

export default CreateAlbum;