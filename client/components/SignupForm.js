import React, { useState } from 'react'
import AuthForm from './AuthForm';
import { SIGNUP, CURRENT_USER } from '../queries';
import { useMutation } from 'react-apollo';
import toDashboard from './hoc/toDashboard';

function SignupForm() {
    const [signup] = useMutation(SIGNUP);
    const [errors, setErrors] = useState([]);

    const onSubmit = ({ email, password }) => {
        signup({
            variables: { email, password },
            refetchQueries: [{ query: CURRENT_USER }]
        }).catch(error => {
            setErrors(error.graphQLErrors);
        })
    }

    return (
        <div>
            <h3>Sign Up</h3>
           <AuthForm onSubmit={onSubmit} errors={errors} />
        </div>
    )
}

export default toDashboard(SignupForm);
