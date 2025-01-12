// import "../../Data/User.json";
// import { readFile  } from 'node:fs';
// import { readFile } from 'node:fs';

class Utilities {
    
    addUser(userDetails, userAdded) {
        fetch(`/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(data => userAdded(data))
        .catch(err => console.error(`Error: ${err}`));
    }

    getUser(apiurl, userFound){
        fetch(apiurl, {
            method: "GET"
        })
        .then((res) => {
            if(!res.ok){
                if(res.status === 404){
                    throw new Error(`Resource not found (404). URL: ${apiurl}`);
                }
                // throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => userFound(data))
        .catch(err => console.log(err));
    }

}

export default Utilities;