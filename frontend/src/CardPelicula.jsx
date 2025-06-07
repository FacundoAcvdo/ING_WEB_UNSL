import React from 'react'
import { Card, Image } from "@chakra-ui/react"
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react"
import { Link } from 'react-router'

function CardPelicula(props) {

  return (
    <>
    <Card.Root width="9vw" margin="1vw" height="40hv">
        <Link to={"/info/movie/"+props.id} height="90%"><Image src={props.src} alt={props.title} height="100%"></Image></Link>
      <Card.Body padding="10px">
        <Card.Title textAlign="left" marginTop="10%" textWrap="nowrap" overflow="hidden" className="tituloTarjeta"><Link to={"/info/movie/"+props.id}>{props.title}</Link></Card.Title>
        <ProgressCircle.Root size="md" value={props.rate * 10} colorPalette="green" position="absolute" top="73%" right="8.5%" backgroundColor="#082444" borderRadius="50%">
          <ProgressCircle.Circle css={{ "--thickness": "3px" }}>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
          </ProgressCircle.Circle>
        <AbsoluteCenter>
          <ProgressCircle.ValueText color="white"/>
        </AbsoluteCenter>
      </ProgressCircle.Root>
      </Card.Body>
    </Card.Root>
    </>
  )
}

export default CardPelicula