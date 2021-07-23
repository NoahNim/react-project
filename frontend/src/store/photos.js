import { csrfFetch } from "./csrf";
import { LOAD_ALBUM, getAlbum } from "./albums";

const LOAD = 'photo/LOAD';
const NEW_PHOTO = 'photo/new';
const DELETE_PHOTO = 'photo/delete';
const UPDATE_PHOTO = 'photo/update';

const loadPhoto = photo => ({
    type: LOAD,
    photo
});

const makePhoto = photo => ({
    type: NEW_PHOTO,
    photo
})

const editPhoto = photo => ({
    type: UPDATE_PHOTO,
    photo
})

const destroyPhoto = photo => ({
    type: DELETE_PHOTO,
    payload: photo
})

export const getPhoto = (id) => async dispatch => {
    const res = await fetch(`/api/photo/${id}`);

    if (res.ok) {
        const photo = await res.json();
        dispatch(loadPhoto(photo));
    }
}

export const updatePhoto = (id, payload) => async dispatch => {
    const { name, imgUrl, userId } = payload

    const res = await csrfFetch(`/api/photo/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            imgUrl,
            userId
        })
    });

    const editedPhoto = await res.json();

    if (res.ok) {
        dispatch(editPhoto(editedPhoto));
    }

    return res;
}

export const deletePhoto = (id) => async dispatch => {
    const photoRes = await fetch(`/api/photo/${id}`);
    const photo = await photoRes.json();
    const res = await csrfFetch(`/api/photo/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(destroyPhoto(photo));
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

const PhotoReducer = (state = { albums: null, photo: null }, action) => {
    switch (action.type) {
        case LOAD:
            const photos = {};
            action.photo.albums.photo.forEach(photo => {
                photos[photo.id] = photo
            })
            state.albums.photo = photos
            return {
                ...state.photo
            };
        case NEW_PHOTO:
            return {
                ...state,
                ...action.photo
            }
        case UPDATE_PHOTO:
            return {
                ...state,
                ...action.photo.photo
            }
        case LOAD_ALBUM:
            const albums = {};
            action.albums.albums.forEach(photo => {
                albums[photo.id] = photo
            })
            state.photo = albums
            return {
                ...state.photo,
                ...state.albums,
                ...state.comments
            };
        default:
            return state;
    }
}

export default PhotoReducer;