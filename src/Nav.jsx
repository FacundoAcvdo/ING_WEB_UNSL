import React from 'react'
import { Menu, Portal, Text } from "@chakra-ui/react"

import { Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

import "./Nav.css"

function Nav() {
  return (
    <>
    <header id='nav'>
        <img src="" alt="" />
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="xl" display="inline" marginLeft="400px" marginRight="20px" fontWeight="semibold">Peliculas</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item value="new-txt">Populares</Menu.Item>
                    <Menu.Item value="new-file">En cartelera</Menu.Item>
                    <Menu.Item value="new-win">Proximamente</Menu.Item>
                    <Menu.Item value="open-file">Mejor Valoradas</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="xl" display="inline" marginRight="20px" fontWeight="semibold">Series</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item value="new-txt">Populares</Menu.Item>
                    <Menu.Item value="new-file">Se emiten hoy</Menu.Item>
                    <Menu.Item value="new-win">En televisión</Menu.Item>
                    <Menu.Item value="open-file">Mejor valoradas</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="xl" display="inline" marginRight="20px" fontWeight="semibold">Gente</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item value="new-txt">Gente popular</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    </header>
    <InputGroup flex="1" startElement={<LuSearch />} width="100%" marginTop="5px" paddingLeft="22%" className='buscador'>
        <Input placeholder="Buscar pelicula, serie, gente" h="50px" border="none" outline="none"/>
    </InputGroup>
    </>
  )
}

export default Nav