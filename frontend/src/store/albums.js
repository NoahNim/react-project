import { csrfFetch } from "./csrf";

const LOAD = 'albums/LOAD';
const LOAD_ALBUM = 'album/LOAD_ALBUM';
const NEW_ALBUM = 'album/new';
const DELETE_ALBUM = 'album/delete';
const UPDATE_ALBUM = 'album/update';
// const LOAD_PHOTO = 'photo/LOAD';
const NEW_PHOTO = 'photo/new';
const DELETE_PHOTO = 'photo/delete';
// const UPDATE_PHOTO = 'photo/update';

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

const editAlbum = albums => ({
    type: UPDATE_ALBUM,
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

    const editedAlbum = await res.json();

    if (res.ok) {
        dispatch(editAlbum(editedAlbum));
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

// const loadPhoto = photo => ({
//     type: LOAD_PHOTO,
//     photo
// });

const makePhoto = photo => ({
    type: NEW_PHOTO,
    photo
})

// const editPhoto = photo => ({
//     type: UPDATE_PHOTO,
//     photo
// })

const destroyPhoto = photo => ({
    type: DELETE_PHOTO,
    payload: photo
})

// export const getPhoto = (id) => async dispatch => {
//     const res = await fetch(`/api/photo/${id}`);

//     if (res.ok) {
//         const photo = await res.json();
//         dispatch(loadPhoto(photo));
//     }
//     return res;
// }

// export const updatePhoto = (id, payload) => async dispatch => {
//     const { name, imgUrl, userId } = payload

//     const res = await csrfFetch(`/api/photo/${id}/edit`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name,
//             imgUrl,
//             userId
//         })
//     });

//     const editedPhoto = await res.json();

//     if (res.ok) {
//         dispatch(editPhoto(editedPhoto));
//     }

//     return res;
// }

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

const AlbumReducer = (state = { albums: null, photo: null }, action) => {
    let photos = {};
    switch (action.type) {
        case LOAD: 
            const allAlbums = {};
            action.albums.albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            state.albums = allAlbums;
            // {
            // albums: ...state.albums,
            // photo: ...state.photo  
        // }
            return {
                ...state.photo,
                ...state.albums
            }
        case LOAD_ALBUM:
            action.photos.photos.forEach(photo => {
                photos[photo.id] = photo
            })
            state.photo = photos
            return {
                ...state.photo
            };
        case NEW_ALBUM:
            return {
                ...state,
                ...action.albums
            }
        case DELETE_ALBUM:
            delete action.payload
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ALBUM:
            return {
                ...state,
                ...action.albums.album
            }
        // case LOAD_PHOTO:
        //     state.photo = action.photo
        //     return {
        //         ...state.photo,
        //         ...state.albums
        //     };
        case NEW_PHOTO:
            return {
                ...state,
                ...action.photo
            }
        // case UPDATE_PHOTO:
        //     return {
        //         ...state,
        //         ...action.photo.photo
        //     }
        case DELETE_PHOTO:
            delete action.payload
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default AlbumReducer;