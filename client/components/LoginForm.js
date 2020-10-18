import React, { useState } from 'react'
import AuthForm from './AuthForm';
import { LOGIN, CURRENT_USER } from '../queries';
import { useMutation } from 'react-apollo';
import toDashboard from './hoc/toDashboard';

function LoginForm({ history: { push } }) {
    const [login] = useMutation(LOGIN);
    const [errors, setErrors] = useState([]);

    const onSubmit = ({ email, password }) => {
        login({
            variables: { email, password },
            refetchQueries: [{ query: CURRENT_USER }]
        }).catch(error => {
            setErrors(error.graphQLErrors);
        })
    }

    return (
        <div>
            <h3>Login</h3>
           <AuthForm onSubmit={onSubmit} errors={errors} />
        </div>
    )
}

export default toDashboard(LoginForm);
