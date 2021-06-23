/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";

function Autocomplete() {

    const [userQuery, setUserQuery] = useState('');
    const [options, setOptions] = useState([]);

    // github api used as an example

    function axiosCall() {
        axios
            .get(`https://api.github.com/search/users?q=${userQuery}%20in:login`)
            .then(response => {
                let result = response.data.items.map(user => user.login);
                setOptions(result)
                console.log('results per search: ' + [].concat(result))
            })
            .catch(error => error);
    };

    // adjust debounce 2nd argument for delay time
    const delayedQuery = useCallback(debounce(axiosCall, 2000), [userQuery]);

    const handleChange = event => {
        setUserQuery(event.target.value);
    };

    useEffect(() => {
        // This if statement stops us from making an empty query (> 7mil results) when the app loads
        if (userQuery.length > 0) {
            delayedQuery();
        }
        // Cancel the debounce on useEffect cleanup.
        return delayedQuery.cancel;
    }, [userQuery, delayedQuery]);

    // input is always visible, then only show options if any are currently available (array length > 0)
    return (
        <>
            <div>
                <input onChange={handleChange} value={userQuery} type="text" ></input>
            </div>

            <ul>
                {options.length > 0 ? <ul>
                    {options.map((user, index) => {
                        return <li key={index + 1}>{user}</li>
                    })}
                </ul> : <div>
                    start typing to see some options
                </div>}
            </ul>
        </>
    );
}

export default Autocomplete;
