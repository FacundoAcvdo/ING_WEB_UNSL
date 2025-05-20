import React from 'react'
import { Menu, Portal, Text, Input, InputGroup, Image } from "@chakra-ui/react"
import { useNavigate, Link } from "react-router";
import { LuSearch } from "react-icons/lu"
import { useState } from 'react'
import "./style/Nav.css"

function Nav() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        navigate("/search/"+busqueda)
    }
  };

  return (
    <>
    <header id='nav'>
        <Link to="/" style={{display:"flex", marginLeft:"15%", marginRight:"2%"}} ><img src="/logo.svg" alt="Logo" width="200px"/></Link>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="xl" display="inline" marginRight="20px" fontWeight="semibold">Peliculas</Text>
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
        <Input placeholder="Buscar pelicula, serie, gente" h="50px" border="none" outline="none" onKeyDown={handleKeyDown} onChange={(e)=>{setBusqueda(e.target.value)}}/>
    </InputGroup>
    </>
  )
}

export default Nav