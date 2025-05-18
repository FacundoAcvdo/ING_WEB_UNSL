import React from 'react'
import { Card, Image } from "@chakra-ui/react"

function CardBusqueda(props) {
  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="x3" marginBottom="3%">
        <Image src={props.src} alt={props.title} width="20%"></Image>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Description>{props.overview}</Card.Description>
        </Card.Body>
    </Card.Root>
  )
}

export default CardBusqueda