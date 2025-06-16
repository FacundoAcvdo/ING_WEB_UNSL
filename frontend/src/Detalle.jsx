import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Image, Center, Flex, Text, AbsoluteCenter, ProgressCircle, Button, Card  } from "@chakra-ui/react"
import { FaBookmark, FaList, FaHeart  } from "react-icons/fa";
import { IoHeartDislike } from "react-icons/io5";

import Nav from "./Nav.jsx"
import "./style/Info.css"

const key = import.meta.env.VITE_AUTH_KEY
const url_validate = import.meta.env.VITE_VALIDATE_URL;
const url_add = import.meta.env.VITE_ADD_URL;
const url_checkfav = import.meta.env.VITE_CHECKFAV_URL
const url_remove = import.meta.env.VITE_REMOVE_URL

function Detalle() {
  let {type ,data} = useParams()
  const [result, setResult] = useState({})
  const [info, setInfo] = useState("")
  const [rate, setRate] = useState(0)
  const [director, setDirector] = useState([])
  const [actores, setActores] = useState([])
  const [canal, setCanal] = useState("") 
  const [faveada, setFaveada] = useState(undefined) 

  const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+key
        }
  };

  useEffect(()=>{
      setDirector([])
      setActores([])
      checkFav()
      
      fetch('https://api.themoviedb.org/3/'+type+'/'+data+'?language=es-ES', options)
          .then(res => res.json())
          .then(res => {
              setResult(res)
              setRate(res.vote_average)
              if(type == "tv"){
                setInfo(res.genres.map((value)=>{ return " "+value.name }))
                setCanal(res.networks[0].name)
              }else{
                setInfo(res.release_date + " - " +  res.genres.map((value)=>{ return " "+value.name }) + " - " + Math.floor(res.runtime/60)+"h "+res.runtime%60+"m")
              }
          })
          .catch(err => console.error(err));

      fetch('https://api.themoviedb.org/3/'+type+'/'+data+'/credits?language=es-ES', options)
        .then(res => res.json())
        .then(res => {
            setActores(res.cast)
            res.crew.map((value) =>{
              if(value.job == "Director") {
                setDirector(director => [...director, value])
              }
            })
        })
        .catch(err => console.error(err));
  }, [data, faveada])

  const handleFav = () => {
    let bodyRequest = {
      username: localStorage.getItem("user"),
      movieId: parseInt(data)
    }

    fetch(url_validate, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      if(!res.ok){
          alert("Error al añadir a favoritos")
          return
      }

      if(type != "movie"){
        alert("Solo se añaden peliculas")
        return
      }
      
      if (res.ok) {
          fetch(url_add, {
            method:"POST",
            body: JSON.stringify(bodyRequest)
          })
          .then((res) => {
            if(!res.ok){
              alert("Error desconocido")
            }
          }).then(() => {
            setFaveada(true);
          })
      }
    })
  }

  const checkFav = () => {
    let bodyRequest = {
      username: localStorage.getItem("user"),
      movieId: parseInt(data)
    }

    fetch(url_validate, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      if(!res.ok){
          alert("Error al consultar")
          return
      }
     
      if (res.ok) {
          fetch(url_checkfav, {
            method:"POST",
            body: JSON.stringify(bodyRequest)
          })
          .then((res) => {
            if (!res.ok) {
              alert("Error desconocido")
              return;
            }
            return res.json()
          })
          .then((data) => {
            if (data) {
              setFaveada(data.favorito)
            }
          })
          .catch((err) => {
            console.error("Error al consultar favoritos", err);
          });
      }
    })
  }

  const handleRemove = () => {
    let bodyRequest = {
      username: localStorage.getItem("user"),
      movieId: parseInt(data)
    }

    fetch(url_validate, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res) => {
      if(!res.ok){
          alert("Error al quitar de la lista")
          return
      }
     
      if (res.ok) {
          fetch(url_remove, {
            method:"POST",
            body: JSON.stringify(bodyRequest)
          })
          .then((res) => {
            if(!res.ok){
              alert("Error desconocido")
            }
          }).then(() => {
            setFaveada(false);
          })
      }
    })
  }

  const handleImage = (path) => {
    if(path == null){
        return "https://placehold.co/200x300"
    }

    return "https://image.tmdb.org/t/p/w200"+path
  }

  const handleInfo = () => {
    if(type == "movie") {
      return (
        <>
          <Flex flexDirection="row" width="15vw" className='lateral' flexWrap="wrap" alignContent="flex-start" gap="2.5vh" marginTop="3vh" paddingLeft="1vw" marginBottom="5vh">
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Titulo original</Text>
              <Text textStyle="lg" fontWeight="normal">{result.original_title}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Estado</Text>
              <Text textStyle="lg" fontWeight="normal">{result.status}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Idioma original</Text>
              <Text textStyle="lg" fontWeight="normal">{result.original_language}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Presupuesto</Text>
              <Text textStyle="lg" fontWeight="normal">{"$"+result.budget}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Ingresos</Text>
              <Text textStyle="lg" fontWeight="normal">{"$"+result.revenue}</Text>
            </div>
          </Flex>
        </>
      )
    }

    if(type == "tv") {
      return (
        <>
          <Flex flexDirection="row" width="15vw" className='lateral' flexWrap="wrap" alignContent="flex-start" gap="2.5vh" marginTop="3vh" paddingLeft="1vw" marginBottom="5vh">
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Estado</Text>
              <Text textStyle="lg" fontWeight="normal">{result.status}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Canal</Text>
              <Text textStyle="lg" fontWeight="normal">{canal}</Text>
            </div>
            <div className='info'> 
              <Text textStyle="lg" fontWeight="bold">Tipo</Text>
              <Text textStyle="lg" fontWeight="normal">{result.type}</Text>
            </div>
            <div className='info'>
              <Text textStyle="lg" fontWeight="bold">Idioma original</Text>
              <Text textStyle="lg" fontWeight="normal">{result.original_language}</Text>
            </div>
          </Flex>
        </>

      )
    }

  }

  return (
    <>
        <Nav/>
        
        <div>
          <div style={{width:"100%", height:"60vh", backgroundColor:"rgb(15,15,15)", position:"absolute", zIndex:"-1"}} />
          <Image className="contenedorInfo" src={"https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/"+result.backdrop_path}/>
          <div id='fondo' className='contenedorInfo' style={{background:"linear-gradient(to right, rgb(15, 15, 15), rgba(15,15,15, 0.6))"}} />
        
          <Center height="60vh">
            <Flex flexDirection="row" width="65vw" gap="2vw">
              <Image borderRadius="8px" border src={"https://image.tmdb.org/t/p/w500"+result.poster_path} height="45vh"/>
              <Flex flexDirection="column" gap="1vh">
                  <Text color="white" textStyle="4xl" fontWeight="bold">{result.name || result.title}</Text>
                  <Text color="white" textStyle="1xl">{info}</Text>
                  <Center width="75px" backgroundColor="#081c22" borderRadius="50%" height="75px">
                    <ProgressCircle.Root size="xl" value={rate * 10} colorPalette="green" width="65px" borderRadius="50%">
                    <ProgressCircle.Circle css={{ "--thickness": "5px" }}>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range />
                      </ProgressCircle.Circle>
                      <AbsoluteCenter>
                        <ProgressCircle.ValueText color="white"/>
                      </AbsoluteCenter>
                  </ProgressCircle.Root>
                  </Center>
                  <Flex flexDirection="row" gap="1vw">
                    <Button width="2.5vw" height="2.5vw" borderRadius="50%" backgroundColor="#082444"><FaList /></Button>
                    {faveada && <Button width="2.5vw" height="2.5vw" borderRadius="50%" backgroundColor="#082444" onClick={()=>handleRemove()}><IoHeartDislike /></Button>}
                    {!faveada && <Button width="2.5vw" height="2.5vw" borderRadius="50%" backgroundColor="#082444" onClick={()=>handleFav()}><FaHeart /></Button>}
                    <Button width="2.5vw" height="2.5vw" borderRadius="50%" backgroundColor="#082444"><FaBookmark /></Button>
                  </Flex>
                  <Text textStyle="md" color="gray.200" fontStyle="italic" fontWeight="normal" marginTop="1vh">{result.tagline || ""}</Text>
                  <Text textStyle="2xl" color="white" fontWeight="bold">Vista general</Text>
                  <Text color="white" textStyle="md" >{result.overview || ""}</Text>
                  <Text color="white" fontWeight="semibold" textStyle="md">Director: {director.map((value)=> {return value.name+ " -" })}</Text>
              </Flex>
            </Flex>
          </Center>

          <Center>
            <Flex width="65vw" flexDirection="row" marginTop="3vh" justifyContent="start">
              <Flex flexDirection="colum" width="49.5vw" flexWrap="wrap" alignContent="flex-start">
                <Text fontWeight="bold" textStyle="2xl" display="block" marginBottom="1.5vh">Reparto Principal</Text>
                <div className='actores'>
                    {
                      actores.map((value, index) => {
                        return (
                        <Card.Root width="7vw" overflow="hidden" key={index} marginRight="1.1vw" display="inline-block">
                          <Image
                            src={handleImage(value.profile_path)}
                          />
                          <Card.Body padding="10px">
                            <Card.Title textStyle="md">{value.name}</Card.Title>
                            <Card.Description>{value.character}</Card.Description>
                          </Card.Body>
                        </Card.Root>
                        )
                      })
                    }
                </div>
              </Flex>
              
              {handleInfo()}
              
            </Flex>
          </Center>
        </div>
    </>
  )
}

export default Detalle