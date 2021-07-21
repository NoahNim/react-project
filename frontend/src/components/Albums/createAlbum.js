import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbum } from '../../store/albums';
import './AlbumPage.css';


function CreateAlbum() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [name, setName] = useState('')
    const [errors, setErrors] = useState(null);
    const sessionUserId = sessionUser.id

    useEffect(() => {
      if (errors?.length === 0) history.push('/album')  
    }, [errors, history])
 
    function handleSubmit(e) {
        e.preventDefault();

        setErrors(null);
        const payload = {
            name,
            sessionUserId
        }

        dispatch(createAlbum(payload))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data.errors);
                if (data && data.errors) setErrors(data.errors);
            });
        console.log(errors?.length);
        // if (errors?.length === 0) {
        //     history.push('/album')
        // }
        return;
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