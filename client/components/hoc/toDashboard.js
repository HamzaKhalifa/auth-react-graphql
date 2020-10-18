import React, { useEffect } from 'react'
import { CURRENT_USER } from '../../queries';
import { useQuery } from 'react-apollo';

const toDashboard = (Component) => (props) => {
    const { data } = useQuery(CURRENT_USER);

    useEffect(() => {
        if (data.user) {
            props.history.push('/dashboard');
        }
    }, [data]);

    return (
        <Component {...props} />
    );
}

export default toDashboard
