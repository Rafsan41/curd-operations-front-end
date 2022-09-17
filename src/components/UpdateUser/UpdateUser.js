import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res=> res.json())
            .then(data=> setUser(data));
    }, [])
    //update user
    const handelNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email };
        setUser(updatedUser);
    }
    const handelEmailChange = e => {
        const updatedEmail = e.target.value;
        // const updatedUser = { ...user };
        // updatedUser.email = updatedEmail;
        const updatedUser = { name: user.name, email:updatedEmail }
        setUser(updatedUser)
    }
    const handelUpdateUser = e => {
       const uri = `http://localhost:5000/users/${id}`
        fetch(uri, {
            method:'PUT',
            headers: {
               'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('updated successfully')
                    setUser({});
            }
        })
        e.preventDefault();
    }

    return (
        <div>
            <h2>update: {user.name}  {user.email}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handelUpdateUser}>
                <input type="name" onChange={handelNameChange} value={user.name || ''}/>
                <input type="email" onChange={handelEmailChange} value={user.email || ''} />
                <input type="submit"  value='update'/>


            </form>
        </div>
    );
};

export default UpdateUser;