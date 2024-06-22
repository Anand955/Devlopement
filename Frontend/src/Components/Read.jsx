import React, { useEffect, useState } from 'react';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000/");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        return;
      }

      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE"
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        return;
      }

      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete data.");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container my-4">
        {error && <div className={`alert ${error.includes("Successfully") ? 'alert-success' : 'alert-danger'}`} role="alert">{error}</div>}
        <h1 className='text-center my-2'> All Data</h1>
        <div className="row text-center">
          {data.map((ele) => (
            <div key={ele._id} className="col-3 my-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.age}</h6>
                  <button className="btn btn-link" onClick={() => handleDelete(ele._id)}>Delete</button>
                  <button className="btn btn-link">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Read;
