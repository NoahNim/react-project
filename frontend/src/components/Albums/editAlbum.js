import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateAlbum } from '../../store/albums';
import './AlbumPage.css';

function EditAlbum() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([]);
    const sessionUserId = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const payload = {
            name,
            sessionUserId
        }

        const album = await dispatch(updateAlbum(id, payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (album) history.push('/album')   
    }

    if (sessionUser.id === id) {
        return (
            <div className="form__container">
                <form className="album__form" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label><div className="label">Edit Album Name</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </label>
                    <button type="submit" className="submit">Submit</button>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>I'm afraid I can't let you do that, {sessionUser.username}</h1>
            </div>
        )
    }
}

export default EditAlbum;