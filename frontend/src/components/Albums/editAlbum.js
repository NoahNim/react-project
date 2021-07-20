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

    function handleSubmit(e) {
        e.preventDefault();

        setErrors([]);
        const payload = {
            name,
            sessionUserId
        }

        dispatch(updateAlbum(id, payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        console.log(errors.length);
        if (errors.length === 0) return history.push('/album')
    }

    if (sessionUser) {
        return (
            <div className="form__container">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>New Album Name
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditAlbum;