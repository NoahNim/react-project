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
    console.log(action);
    switch (action.type) {
        case LOAD: {
            
        };
        default:
            return state;
    }
}

export default AlbumReducer;