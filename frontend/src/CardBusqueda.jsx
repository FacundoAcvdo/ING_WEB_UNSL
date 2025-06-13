import React from 'react'
import { Card, Image } from "@chakra-ui/react"
import { Link } from 'react-router'

function CardBusqueda(props) {
  const handleImage = () => {
    if(props.src == null){
        return "https://placehold.co/200x300"
    }

    return "https://image.tmdb.org/t/p/w500"+props.src
  }

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="x3" marginBottom="3%" maxH="18vh">
        <Image src={handleImage()} alt={props.title} width="10%"></Image>
        <Card.Body>
            <Card.Title><Link to={"/info/"+props.type+"/"+props.id} >{props.title}</Link></Card.Title>
            <Card.Description>{props.overview}</Card.Description>
        </Card.Body>
    </Card.Root>
  )
}

export default CardBusqueda