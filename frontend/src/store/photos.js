import { csrfFetch } from "./csrf";

const LOAD = 'photo/LOAD';
const LOAD_photo = 'photo/LOAD_photo';
const NEW_photo = 'photo/new';
const DELETE_photo = 'photo/delete';
const UPDATE_photo = 'photo/update';

const load = photo => ({
    type: LOAD,
    photo
});

const loadPhoto = photo => ({
    type: LOAD_photo,
    photo
})

const makePhoto = photo => ({
    type: NEW_photo,
    photo
})

const editPhoto = photo => ({
    type: UPDATE_photo,
    photo
})

const destroyPhoto = photo => ({
    type: DELETE_photo,
    payload: photo
})

export const getPhoto = (id) => async dispatch => {
    const res = await fetch(`/api/photo/${id}`);

    if (res.ok) {
        const photo = await res.json();
        dispatch(loadPhoto(photo));
    }
}

export const createPhoto = ({ name, imgUrl, userId, albumId }) => async dispatch => {
    const res = await csrfFetch(`/api/photo/album/${albumId}/new-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            imgUrl,
            userId,
            albumId
        })
    });

    const newPhoto = await res.json();

    if (res.ok) {
        dispatch(makePhoto(newPhoto));
    }

    return res;
}

const PhotoReducer = (state = { photo: null, comments: null }, action) => {
    switch (action.type) {
        case LOAD:
            const photos = {};
            action.photo.photo.forEach(thisPhoto => {
                photos[thisPhoto.id] = thisPhoto
            });
            state.photo = photos;
            return {
                ...state.photo,
                ...state.comments
            }
        default:
            return state;
    }
}

export default PhotoReducer;