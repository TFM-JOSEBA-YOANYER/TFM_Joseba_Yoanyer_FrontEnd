import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { UserList } from "../user/UserList";
import { useParams, useSearchParams } from "react-router-dom";
import { GetProfile } from "../../helpers/GetProfile";

export const Followers = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({})

  const params = useParams();
  
  useEffect(() => {
    getUsers(1);
    GetProfile( params.userId, setUserProfile );
  }, []);

  const getUsers = async (nextPage = 1) => {
    //Efecto de Carga
    setLoading(true);

    // Sacar userId de la url
    const userIda = params.userId;

    // Petición para sacar usuarios
    const request = await fetch(Global.url + "follow/followers/" + userIda + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    
    const data = await request.json();

    let cleanUsers = [];

    // Recorrer y limpiar follows para quedarme con followed
    data.follows.docs.forEach(follow => {
        cleanUsers = [...cleanUsers, follow.user]
    });

    data.users = cleanUsers;


    // Crear un estado para poder listarlos   'follows.docs'
    if (data.users && data.status == "success") {
    //   let newUsers = data.users;

    //   if (users.length >= 1) {
    //     newUsers = [...users, ...data.users];
    //   }

    
    //   setUsers(newUsers);

      setUsers(prevUsers => {
        let newUsers = data.users;
        if (prevUsers.length >= 1) {
          newUsers = [...prevUsers, ...data.users];
        }
        return newUsers;
      });
     
      setFollowing(data.user_following);
      setLoading(false);

      // Paginación
      if (users.length >= data.total - data.users.length) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Seguidores de { userProfile.name } { userProfile.surname } </h1>
      </header>

      <UserList
          users={users}
          getUsers={getUsers}
          following={following}
          setFollowing={setFollowing}
          loading={loading}
          page={page}
          setPage= {setPage}
          more={more}
          
      />

      <br />
    </>
  );
};
