import React from 'react'
import { Card, Image } from "@chakra-ui/react"
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react"

function CardPelicula(props) {

  return (
    <>
    <Card.Root width="9vw" margin="1vw" height="40hv">
        <Image src={props.src} alt={props.title} height="90%"></Image>
      <Card.Body padding="10px">
        <Card.Title textAlign="left" marginTop="15px" textWrap="nowrap" overflow="hidden">{props.title}</Card.Title>
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