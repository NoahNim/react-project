import { csrfFetch } from "./csrf";

const LOAD = 'albums/LOAD';
const LOAD_ALBUM = 'album/LOAD_ALBUM';
const NEW_ALBUM = 'album/new';
const DELETE_ALBUM = 'album/delete';

const load = albums => ({
    type: LOAD,
    albums
});

const loadAlbum = photos => ({
    type: LOAD_ALBUM,
    photos
})

const makeAlbum = albums => ({
    type: NEW_ALBUM,
    albums
})

const destroyAlbum = albums => ({
    type: DELETE_ALBUM,
    payload: albums
})

export const getAlbums = () => async dispatch => {
    const res = await fetch('/api/album')

    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
    }

    return;
}

export const createAlbum = ({name, userId}) => async dispatch => {    
    const res = await csrfFetch('/api/album/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            userId
        })
    });

    const newAlbum = await res.json();

    if (res.ok) {
        dispatch(makeAlbum(newAlbum));
    }

    return res;
}


export const updateAlbum = (id, payload) => async dispatch => {
    const { name, userId } = payload

    const res = await csrfFetch(`/api/album/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            userId
        })
    });

    const newAlbum = await res.json();

    if (res.ok) {
        dispatch(makeAlbum(newAlbum.payload));
    }

    return res;
}

export const getAlbum = (id) => async dispatch => {
    const res = await fetch(`/api/album/${id}`);

    if (res.ok) {
        const album = await res.json();
        dispatch(loadAlbum(album));
    }
}

export const deleteAlbum = (id) => async dispatch => {
    const albumRes = await fetch(`/api/album/${id}`);
    const album = await albumRes.json();
    const res = await csrfFetch(`/api/album/${id}`, {
        method: 'DELETE'
    })

       if (res.ok) {
        dispatch(destroyAlbum(album));
    }
}

const AlbumReducer = (state = {albums: null, photo: null}, action) => {
    console.log(action);
    let newState;
    switch (action.type) {
        case LOAD: 
            const allAlbums = {};
            action.albums.albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            }
        case LOAD_ALBUM:
            const photos = {};

            action.photos.photos.forEach(photo => {
                photos[photo.id] = photo
            })
            return {
                ...state.photo
            };
        case NEW_ALBUM:
            // newState = Object.assign({}, state);
            // newState.albums = action.album;
            // return newState;
            return {
                ...state,
                ...action.albums
            }
        case DELETE_ALBUM:
            delete action.payload
            newState = {
                ...state
            }
            return newState;
        default:
            return state;
    }
}

export default AlbumReducer;