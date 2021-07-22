import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function NewPhoto() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([]);
    const sessionUserId = sessionUser.id

    // onSubmit = {
    //     // handleSubmit

    return (
        <div className="form__container">
            <form className="album__form" >
                <ul>
                    {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label><div className="label">Photo Name</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                </label>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPhoto;