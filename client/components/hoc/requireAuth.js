import React, { useEffect } from 'react'
import { CURRENT_USER } from '../../queries';
import { useQuery } from 'react-apollo';

const requireAuth = (Component) => (props) => {
    const { data } = useQuery(CURRENT_USER);

    useEffect(() => {
        if (!data.user) {
            props.history.push('/login');
        }
    }, [data]);

    return (
        <Component {...props} />
    )
}

export default requireAuth;
