// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { updatePhoto } from '../../store/albums';

// function EditPhoto() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector(state => state.session.user);
//     const history = useHistory();
//     const [name, setName] = useState('')
//     const [imgUrl, setImgUrl] = useState('')
//     const [errors, setErrors] = useState([]);
//     const sessionUserId = sessionUser.id
//     const { id } = useParams();
//     const album = useSelector(state => state.albums);

//     console.log(album);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setErrors([]);
//         const payload = {
//             name,
//             imgUrl,
//             sessionUserId,
//         }
//         const photo = await dispatch(updatePhoto(id, payload))
//             .catch(async (res) => {
//                 const data = await res?.json();
//                 setErrors(data.errors);
//             });
//         if (photo) {
//             history.go(-1);
//         }
//     }

//     if (sessionUser.id === id) {
//         return (
//             <div className="form__container">
//                 <form className="album__form" onSubmit={handleSubmit}>
//                     <ul>
//                         {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
//                     </ul>
//                     <label><div className="label">Edit Photo Name</div>
//                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
//                     </label>
//                     <label><div className="label">Edit Photo URL</div>
//                         <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} required></input>
//                     </label>
//                     <button type="submit" className="submit">Submit</button>
//                 </form>
//             </div>
//         )
//     }
//     else {
//         return (
//             <div>
//                 <h1>I'm afraid I can't let you do that, {sessionUser.username}</h1>
//             </div>
//         )
//     }
// }

// export default EditPhoto;