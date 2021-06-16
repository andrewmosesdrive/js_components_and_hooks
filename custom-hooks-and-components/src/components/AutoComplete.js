import React from "react";
import { useState } from "react";
// import _ from "lodash";
import axios from "axios";

function Autocomplete() {

    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([])
    
    console.log(inputValue);
    console.log(users);
    console.log(data)

    let query = 'bulbasaur'
    let dataFetch = axios(`https://pokeapi.co/api/v2/pokemon/${query}/`)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
        });

    return (
        <>
            <div>
                <input onChange={event => {
                    // update state value for input
                    setInputValue(event.target.value)

                }} type="text" ></input>
            </div>

            <div>
                <ul>

                </ul>
            </div>
        </>
    );
}

export default Autocomplete;
