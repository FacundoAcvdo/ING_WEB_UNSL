import React from 'react'
import { Card, Image } from "@chakra-ui/react"
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react"

function CardPelicula(props) {

  return (
    <>
    <Card.Root width="180px" margin="20px" height="350px">
        <Image src={props.src} alt={props.title} height="265px"></Image>
      <Card.Body style={{ padding: "10px" }}>
        <Card.Title style={{ marginTop: "10px", textAlign: "left" }}>{props.title}</Card.Title>
        <ProgressCircle.Root size="md" value={props.rate * 10} colorPalette="green" position="absolute" top="245px" right="15px" backgroundColor="#082444" borderRadius="50%">
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