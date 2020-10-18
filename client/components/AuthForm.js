import React, { useState, memo } from 'react'

function AuthForm({ onSubmit, errors }) {
    const [state, setState] = useState({ email: '', password: '' });
    
    return (
        <div className="row">
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit({ email: state.email, password: state.password });
                    setState({ email: '', password: '' });
                }} 
                className="col s6"
            >
                <div>
                    <label>Email</label>
                    <input  
                        value={state.email}
                        onChange={e => {
                            setState({ password: state.password, email: e.target.value })
                        }}
                        type="email" 
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={state.password} 
                        onChange={(e) => {setState({ email: state.email, password: e.target.value })}} 
                        type="password" />
                </div>

                {errors.map((error, index) => (
                    <div key={index} className="errors red-text">
                        {error.message}
                    </div>
                ))}
                <button className="btn">Submit</button>
            </form>
        </div>
    )
}

export default memo(AuthForm)
