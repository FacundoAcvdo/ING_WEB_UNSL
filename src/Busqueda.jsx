import { Center, Text, Button  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CardBusqueda from './CardBusqueda.jsx'
import Nav from './Nav.jsx'

import "./style/Busqueda.css"

const key = import.meta.env.VITE_AUTH_KEY;

function Busqueda() {
  let {data} = useParams()
  const [resultados, setResultados] = useState([])

  const [peliculas, setPeliculas] = useState([])
  const [series, setSeries] = useState([])
  const [gente, setGente] = useState([])

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+key
    }
  };
    
  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/search/multi?query='+data+'&include_adult=true&language=es-ES&page=1', options)
    .then(res => res.json())
    .then(res => {
        res.results.map((value)=>{
        if(value.media_type === "movie") setPeliculas(peliculas => [...peliculas, value])
        if(value.media_type === "tv") setSeries(series => [...series, value])
        if(value.media_type === "person") setGente(gente => [...gente, value])
        })
    })
    .catch(err => console.error(err));
  }, [data])

  return (
    <>
        <Nav/>

        <Center w="100%" h="100%" marginTop="40px" display="flex" flexDirection="column" justifyContent="flex-start">
        <Text textStyle="3xl" fontWeight="semibold" textAlign="left" width="56.875%" marginBottom="10px">Resultados</Text>
            <div className='contenedorBusqueda'>
                <div className='menu'>
                    <Button variant="ghost" colorPalette="blue">Peliculas</Button>
                    <Button variant="ghost" colorPalette="blue">Series</Button>
                    <Button variant="ghost" colorPalette="blue">Personas</Button>
                </div>
                <div className='resultados'>
                    {peliculas.map((value, index) => {
                        return <CardBusqueda key={index} title={value.title} src={"https://image.tmdb.org/t/p/w500"+value.poster_path} overview={value.overview}/>
                    })}
                </div>
            </div>
        </Center>
    </>
  )
}

export default Busqueda