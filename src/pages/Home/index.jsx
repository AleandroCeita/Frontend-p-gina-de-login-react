import { useEffect, useState, useRef } from "react";
import "./style.css";
import Apagar from "../../assets/lixeira.webp";
import api from "../../services/api";



function Home() {

  // React Hook - userState
  const [users, setUsers] = useState([]);

  // React Hook - userReference
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();


  async function getUsers() {
 const usersFromApi = await api.get("/users");

  setUsers(usersFromApi.data);
  }

  async function createUsers() {
  await api.post("/users", {
    name: inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })
  getUsers();
  }

    async function deleteUsers(id) {
await api.delete(`/users/${id}`)

getUsers()
  }
// React Hook - userEffect
  useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName} />
        <input placeholder="Idade" name="idade" type="number" ref={inputAge}/>
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map(user => (
        <div key={user.id} className="card">
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade:<span>{user.age}</span></p>
          <p>Email:<span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img className="apagar" src={Apagar} alt="Lixeira" />
        </button>
      </div>
      ))}
      
    </div>
  );
}

export default Home;
