import React, { useEffect, useState } from 'react'
import theMovieDb from '../lib/themoviedb'
import CardPelicula from './CardPelicula'
import "./Inicio.css"
import { Center } from '@chakra-ui/react'

function Inicio() {
  const [populares, setPopulares] = useState([])

  useEffect(()=>{
    theMovieDb.movies.getPopular({},
      function (movies) {
        movies = JSON.parse(movies)
        if (movies.results && movies.results.length > 0) {
          setPopulares(movies.results)
          console.log(movies.results)
        }
     }, 
     function (error) {
       console.error(error)
     })
  }, [])

  return (
    <Center w="100%" h="100%" marginTop="50px">
        <div className='contenedorPeliculas'>
            {populares.map((value, index) => {
                return <CardPelicula key={index} title={value.title} src={"https://image.tmdb.org/t/p/w500"+value.poster_path} rate={value.vote_average}/>
            })}
        </div>
    </Center>
  )
}

export default Inicio