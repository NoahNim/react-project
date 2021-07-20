import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbum } from '../../store/albums';
import './AlbumPage.css';


function CreateAlbum() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [name, setName] = useState('')
    const sessionUserId = sessionUser.id
 
    function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            name,
            sessionUserId
        }

        dispatch(createAlbum(payload))

        return history.push('/')
    }

    if (sessionUser) {
        return (
            <div className="form__container">
                <form onSubmit={handleSubmit}>
                    <label>Album Name
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateAlbum;