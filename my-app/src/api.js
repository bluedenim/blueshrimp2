import { useReducer } from 'react'

export function getWizardVaultDailyUrl(apiKey) {
    return `https://api.guildwars2.com/v2/account/wizardsvault/daily?access_token=${apiKey}`
}

export function getAPIKeyDocUrl() {
    return "https://wiki.guildwars2.com/wiki/API:API_key"
}

export async function fetchDailyItems(url, dispatch) {
    dispatch({ type: 'loading started'})

    try {
        const response = await fetch(url)
        const data = await response.json()
        if (response.status === 200) {
            dispatch({ type: 'data', payload: { status: 200, data } })
        } else {
            dispatch({ type: 'error', payload: data})
        }
    } catch (e) {
        dispatch({ type: 'error', payload: e})
    }
}

function reducer(state, action) {
    // console.log(action.type, action.payload)
    switch (action.type) {
        case 'loading started':
            return { isLoading: true, error: null, data: null }
        case 'data':
            const {status, data} = action.payload

            if (status === 200) {
                return { isLoading: false, error: null, data: data }
            } else {
                return { isLoading: false, error: data, data: null }
            }
        case 'error':
            return { isLoading: false, error: action.payload, data: null }
    }
}

/**
 * Given a URL, this will call out to fetch JSON data from the destination and return a state object with this schema::
 *   ```
 *   {
 *     isLoading: boolean,          // true means the fetch is in progress, false when fetch is complete (or error)
 *     data: object | null,         // object is the deserialized value of the returned JSON, if any
 *     error: object| Error | null  // object is the deserialzied value of the returned JSON upon error, if any
 *   }
 *   ```
 * When isLoading is false, either data or error is set.
 * 
 * @param url -- the URL to fetch JSON data via GET
 * @returns -- [
 *   the state {isLoading: bool, data: null | object, error: null | object | Error}, 
 *   a function to call to (re)fetch/update
 * ]. The fetch function doesn't need any parameter.
 */
export function useFetchReducedState(url) {
    const [state, dispatch] = useReducer(reducer, { isLoading: false, error: null, data: null })
    const fetchFn = () => {
        fetchDailyItems(url, dispatch)
    }

    return [state, fetchFn]
}
