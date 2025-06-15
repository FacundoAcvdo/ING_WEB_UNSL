import { Center, Text, Flex, Skeleton, SkeletonCircle, SkeletonText, Stack, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CardBusqueda from './CardBusqueda.jsx'
import Nav from './Nav.jsx'

import "./style/Busqueda.css"

const key = import.meta.env.VITE_AUTH_KEY;
const url_favoritos = import.meta.env.VITE_FAVORITOS_URL;

function Favoritos() {
  let arr = [1, 2, 3, 4, 5]
  let {data} = useParams()
  const [peliculas, setPeliculas] = useState([])
  const [result, setResult] = useState({})
  const [load, setLoad] = useState(true)

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer '+key
    }
  };

  useEffect(()=>{

      fetch(url_favoritos, {
            method:"POST",
            body: JSON.stringify({userName : localStorage.getItem("user")})
        }).then((res) => res.json())
        .then((res) => {
            setResult(JSON.parse(JSON.stringify(res)))
        })
  }, [])

  useEffect(()=>{
    setPeliculas([])
    let values = Object.values(result)

    console.log(values)

    for (let index = 0; index < values.length; index++) {
        fetch('https://api.themoviedb.org/3/movie/'+values[index]+'?language=es-ES', options)
        .then(res => res.json())
        .then(res => {
            setPeliculas(peliculas => [...peliculas, res])
            setLoad(false)
        })
        .catch(err => console.error(err));
    }
  }, [result])



  return (
    <>
        <Nav/>

        <Center w="100%" h="100%" marginTop="40px" display="flex" flexDirection="column" justifyContent="flex-start">
        <Text textStyle="3xl" fontWeight="semibold" textAlign="left" width="56.875%" marginBottom="10px">Favoritos</Text>
            <div className='contenedorBusqueda'>
                <div className='menu'>

                </div>
                <div className='resultados'>
                    <Flex gap="7" flexDirection="column" marginTop="1vh">
                    {load && arr.map((_, index)=> {
                        return (
                        <HStack gap="5">
                            <SkeletonCircle size="20" />
                            <Stack flex="1">
                            <Skeleton height="10" />
                            <Skeleton height="10" width="80%" />
                            </Stack>
                        </HStack>
                        )
                    })}
                    </Flex>
                    {peliculas.map((value, index) => {
                        return <CardBusqueda key={index} id={value.id} type="movie" title={value.title} src={value.poster_path} overview={value.overview}/>
                    })}
                </div>
            </div>
        </Center>
    </>
  )
}

export default Favoritos