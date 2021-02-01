import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import React, { useEffect, useState } from "react"

export const ProtectedPage = withAuthenticationRequired(() => {

    const { getAccessTokenSilently } = useAuth0();
    const [result, setResult] = useState<any>({});

    useEffect(() => {
        async function fetchData() {
            console.log('getToken');
            const token = await getAccessTokenSilently({
                audience: 'Test'
            });
            const result = await fetch('http://localhost:3333/api', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const resultAsJson = await result.json();
            console.log(resultAsJson);
            setResult(resultAsJson);
        }

        fetchData();
    }, [])
    return (<div>
       {result ? result.message : 'Bye'}
    </div>)
}, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
});