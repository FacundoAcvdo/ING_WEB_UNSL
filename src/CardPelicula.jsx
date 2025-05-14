import React from 'react'
import { Card, Image } from "@chakra-ui/react"
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react"

function CardPelicula(props) {

  return (
    <>
        <Card.Root width="180px" margin="20px">
        <Image src={props.src} alt={props.title}></Image>
        <Card.Body gap={2}>
            <Card.Title>{props.title}</Card.Title>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
            <ProgressCircle.Root size="md" value={props.rate*10} colorPalette="orange">
                <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                <ProgressCircle.ValueText />
                </AbsoluteCenter>
            </ProgressCircle.Root>
      </Card.Footer>
        </Card.Root>
    </>
  )
}

export default CardPelicula