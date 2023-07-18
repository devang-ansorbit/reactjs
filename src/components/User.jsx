import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    number: "",
    password: "",
  });
  const [update, setUpdate] = useState("");

  const getData = useCallback(async () => {
    await axios
      .get("http://localhost:4000/data")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("Getting Error:", err);
      });
  }, []);

  useEffect(() => {
    getData();
    // axios.get('http://localhost:4000/data').then( (res) => {
    //   setData(res.data.data);
    //   console.log(data);
    // }).catch( (err) => {
    //   console.log("Getting Error:", err);
    // })
  }, [getData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Getting Name  & value", name, value);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    axios
      .post("http://localhost:4000/data/create", userData)
      .then((res) => {
        console.log("Getting resonse", res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/data/delete/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(update);
    console.log(userData);
    await axios.put(`http://localhost:4000/data/update/${update}`, userData)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={!!update?handleUpdate: handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          onChange={(e) => handleChange(e)}
          value={userData.name}
        />
        <br />
        <input
          type="number"
          name="number"
          placeholder="enter number"
          onChange={(e) => handleChange(e)}
          value={userData.number}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          onChange={(e) => handleChange(e)}
          value={userData.password}
        />
        <br />
        <input type="submit" />
      </form>
      {data &&
        data.map((ele) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              border: "1px solid lightgrey",
              borderRadius: "15px",
              width: "20rem",
              margin: "10px auto",
            }}
          >
            <li key={ele._id}>{ele.name}</li>
            <p
              key={ele._id + 1}
              style={{
                border: "1px solid lightgrey",
                cursor: "pointer",
                borderRadius: "50%",
                padding: "5px",
              }}
              onClick={() => handleDelete(ele._id)}
            >
              ❌
            </p>
            <p
              key={ele._id + 2}
              style={{
                border: "1px solid lightgrey",
                cursor: "pointer",
                borderRadius: "50%",
                padding: "5px",
              }}
              onClick={() => {
                setUpdate(ele._id);
                setUserData(ele);
              }}
            >
              ✏️
            </p>
          </div>
        ))}
    </div>
  );
};

export default User;
