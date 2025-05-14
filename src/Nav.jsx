import React from 'react'
import { Menu, Portal, Text } from "@chakra-ui/react"

import { Input, InputGroup, Kbd } from "@chakra-ui/react"
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
                    <Menu.Item value="new-txt">New Text File</Menu.Item>
                    <Menu.Item value="new-file">New File...</Menu.Item>
                    <Menu.Item value="new-win">New Window</Menu.Item>
                    <Menu.Item value="open-file">Open File...</Menu.Item>
                    <Menu.Item value="export">Export</Menu.Item>
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
                    <Menu.Item value="new-txt">New Text File</Menu.Item>
                    <Menu.Item value="new-file">New File...</Menu.Item>
                    <Menu.Item value="new-win">New Window</Menu.Item>
                    <Menu.Item value="open-file">Open File...</Menu.Item>
                    <Menu.Item value="export">Export</Menu.Item>
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
                    <Menu.Item value="new-txt">New Text File</Menu.Item>
                    <Menu.Item value="new-file">New File...</Menu.Item>
                    <Menu.Item value="new-win">New Window</Menu.Item>
                    <Menu.Item value="open-file">Open File...</Menu.Item>
                    <Menu.Item value="export">Export</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    </header>
    <InputGroup flex="1" startElement={<LuSearch />} width="920px" marginLeft="500px" marginTop="5px">
        <Input placeholder="Buscar pelicula, serie, gente" h="50px" border="none"/>
    </InputGroup>
    </>
  )
}

export default Nav