const LOAD = 'albums/LOAD';
const LOAD_ALBUM = 'album/LOAD_ALBUM';

const load = albums => ({
    type: LOAD,
    albums
});

const loadAlbum = album => ({
    type: LOAD_ALBUM,
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

    if(res.ok) {
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
            
        };
        default:
            return state;
    }
}

export default AlbumReducer;