import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PublicationList } from "../publication/PublicationList";


export const Feed = () => {

  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getPublications(1, false);
  }, []);

  const getPublications = async (nextPage = 1, showNews = false ) => {

    if( showNews ){
        setPublications([]);
        setPage(1);
        nextPage = 1;
    }

    const request = await fetch(Global.url + "publication/feed/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
    );

    const data = await request.json();

    if (data.status == "success") {
        
        let newPublications = data.publications.docs;

        if( !showNews && publications.length >= 1 ){
            newPublications = [...publications, ...newPublications]
        }
       

      setPublications(newPublications);
   
      if( !showNews && publications.length >= (data.total- publications.length) ){
        setMore(false);
      }

      if(data.pages <= 1){
        setMore(false);
      }
    }
       
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button className="content__button" onClick={()=>getPublications( 1, true )} >Mostrar nuevas</button>
      </header>


      <PublicationList
        publications={publications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        getPublications={getPublications}
      />

      <br />
    </>
  );
};
