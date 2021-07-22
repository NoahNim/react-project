import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { createPhoto } from '../../store/photos';

function NewPhoto() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [name, setName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [errors, setErrors] = useState([]);
    const sessionUserId = sessionUser.id
    const { id } = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumId = Number(id);

        // setErrors([]);
        const payload = {
            name,
            imgUrl,
            sessionUserId,
            albumId
        }
        const photo = await dispatch(createPhoto(payload))
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data.errors);
            });
        if (photo) {
            history.push(`/album/${albumId}`)
        }
    }

    return (
        <div className="form__container">
            <form className="album__form" onSubmit={handleSubmit}>
                <ul>
                    {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label><div className="label">Photo Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                </label>
                <label><div className="label">Photo URL</div>
                    <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required></input>
                </label>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPhoto;