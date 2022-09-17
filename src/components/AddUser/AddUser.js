import React, {useRef} from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handelAddUser = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name:name, email:email };
          console.log(newUser)
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId)
                    alert('successfully added user')
                e.target.reset();
        })
        e.preventDefault();
}


    return (
        <div>
            <h2>please Add an User</h2>
            <form onSubmit={handelAddUser}>
                < input type = "text"
                    ref={nameRef} />
                <input type="email" id="" ref={emailRef} />
                <input type="submit" value="Add" />


            </form>

        </div>
    );
};

export default AddUser;