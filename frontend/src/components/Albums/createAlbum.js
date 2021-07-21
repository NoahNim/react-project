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
    const [errors, setErrors] = useState([]);
    const sessionUserId = sessionUser.id
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // setErrors([]);
        const payload = {
            name,
            sessionUserId
        }
        const album = await dispatch(createAlbum(payload))
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data.errors);
            });
        if (album) {
            history.push('/album')
        }
    }

    if (sessionUser) {
        return (
            <div className="form__container">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
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