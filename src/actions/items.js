export function itemsHaveError(bool) {
    return {
        type: 'ITEMS_HAVE_ERROR',
        hasErrored: bool
    };
}

export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function log(items) {
    console.log(items);
}

export function itemsFetchData(url) {
    // var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");

    // var init = { headers: headers };

    return (dispatch) => {
        dispatch(itemsAreLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsAreLoading(false));

                return response;
            })
            .then((response) => response.json())
            //.then((response) => log(response))
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHaveError(true)));
    };
}
