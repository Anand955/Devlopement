import React, { useState } from 'react';

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);

    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission
        
        const adduser = { name, email, age };
        
        try {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                body: JSON.stringify(adduser),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const result = await response.json();
                console.log(result.error);
                setError(result.error)
                return;
            }
            const result = await response.json();

            if (response.ok) {
                 console.log(result)
                 setError("")
                 setName("");
                 setEmail("");
                 setAge(0);

               
            } 

        } catch (error) {
            console.error("Error:", error);
            // Handle any network errors or exceptions here
        }
    }
    
    return (
        <div className="container my-2">
            { error && <div class="alert alert-danger" role="alert">{error}</div>}
            <h2 className='text-center'>
                Enter The Data
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create;
