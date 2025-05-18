import React, { useEffect, useState } from 'react'
import theMovieDb from '../lib/themoviedb'
import CardPelicula from './CardPelicula'
import "./style/Inicio.css"
import { Center, Text } from '@chakra-ui/react'
import { useParams } from "react-router";

function Inicio() {
  const [populares, setPopulares] = useState([])
  let { data } = useParams() 
  console.log(data)


  useEffect(()=>{
    theMovieDb.movies.getPopular({},
      function (movies) {
        movies = JSON.parse(movies)
        if (movies.results && movies.results.length > 0) {
          setPopulares(movies.results)
        }
     }, 
     function (error) {
       console.error(error)
     })
  }, [])

  return (
    <>
      <Center w="100%" h="100%" marginTop="40px" display="flex" flexDirection="column" justifyContent="flex-start">
        <Text textStyle="3xl" fontWeight="semibold" textAlign="left" width="56.875%" marginBottom="10px">Lo más popular</Text>
        <div className='contenedor'>
            {populares.map((value, index) => {
                return <CardPelicula key={index} title={value.title} src={"https://image.tmdb.org/t/p/w500"+value.poster_path} rate={value.vote_average}/>
            })}
        </div>
      </Center>
    </>

  )
}

export default Inicio