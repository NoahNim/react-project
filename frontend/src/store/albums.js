const LOAD = 'albums/LOAD';

const load = albums => ({
    type: LOAD,
    albums
});

export const getAlbums = () => async dispatch => {
    const res = await fetch('/api/album')

    if (res.ok) {
        const albums = await res.json();
        dispatch(load(albums));
    }
}

const AlbumReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allAlbums = {};
            action.albums.forEach(album => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            }
        };
        default:
            return state;
    }
}

export default AlbumReducer;