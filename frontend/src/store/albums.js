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

const newAlbum = album => ({
    type: NEW_ALBUM,
    album
})

export const getAlbums = () => async dispatch => {
    const res = await fetch('/api/album')

    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
    }
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
            if (!state[action.albums.albums.id]) {
                const newState = {
                    ...state,
                    [action.album.album.id]: action.album.album
                }
                const albumList = newState.list.map(id => newState[id]);
                albumList.push(action.album.album);
                newState.list = albumList;
                return newState;
            }
            return {
                ...state,
                [action.album.album.id]: {
                    ...state[action.album.album.id],
                    ...action.album.album
                }
            }
        }
        default:
            return state;
    }
}

export default AlbumReducer;