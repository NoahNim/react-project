const LOAD = 'albums/LOAD';
const LOAD_ALBUM = 'album/LOAD_ALBUM';
const NEW_ALBUM = 'album/new'

const load = albums => ({
    type: LOAD,
    albums
});

const loadAlbum = photos => ({
    type: LOAD_ALBUM,
    photos
})

const makeAlbum = album => ({
    type: NEW_ALBUM,
    album
})

export const getAlbums = () => async dispatch => {
    const res = await fetch('/api/album')

    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
    }

    return;
}

export const createAlbum = (payload) => async dispatch => {
    const { name, userId } = payload

    const res = await fetch('/api/album/new', {
        method: 'POST',
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

const AlbumReducer = (state = {}, action) => {
    console.log(action);
    let newState;
    switch (action.type) {
        case LOAD: {
            const allAlbums = {};
            action.albums.albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            }
        };
        case LOAD_ALBUM: {
            const photos = {};
            action.photos.photos.forEach(photo => {
                photos[photo.id] = photo
            })
            return {
                ...photos,
                ...state
            }
        };
        case NEW_ALBUM: {
            newState = Object.assign({}, state);
            newState.albums = action.album;
            return newState;
        }
        default:
            return state;
    }
}

export default AlbumReducer;