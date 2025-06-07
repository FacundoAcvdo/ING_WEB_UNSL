import React from 'react'
import { Menu, Portal, Text, Input, InputGroup, Button } from "@chakra-ui/react"
import { useNavigate, Link } from "react-router";
import { LuSearch } from "react-icons/lu"
import { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa";
import "./style/Nav.css"

const url_validate = import.meta.env.VITE_VALIDATE_URL;

function Nav() {
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState("")
  const [logged, setLogged] = useState(false)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        navigate("/search/"+busqueda)
    }
  };

  useEffect(()=>{
      fetch(url_validate, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res) => {
        if(!res.ok){
            return
        }
        
        if (res.ok) {
            setLogged(true)
        }else{
            setLogged(false)
        }
      })
  }, [])

  return (
    <>
    <header id='nav'>
        <Link to="/" style={{display:"flex", marginLeft:"15%", marginRight:"2%"}} ><img src="/logo.svg" alt="Logo" width="200px"/></Link>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="md" display="inline" marginRight="20px" fontWeight="semibold">Peliculas</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item>Populares</Menu.Item>
                    <Menu.Item>En cartelera</Menu.Item>
                    <Menu.Item>Proximamente</Menu.Item>
                    <Menu.Item>Mejor Valoradas</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="md" display="inline" marginRight="20px" fontWeight="semibold">Series</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item >Populares</Menu.Item>
                    <Menu.Item >Se emiten hoy</Menu.Item>
                    <Menu.Item >En televisión</Menu.Item>
                    <Menu.Item >Mejor valoradas</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        <Menu.Root>
            <Menu.Trigger asChild>
                <Text h="64px" textAlign="center" alignContent="center" cursor="pointer" color="white" textStyle="md" display="inline" marginRight="20px" fontWeight="semibold">Gente</Text>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item value="new-txt">Gente popular</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
        {!logged && <Button marginLeft="35vw" width="64px" height="64px" backgroundColor="transparent"><Link to="/login">Iniciar sesión</Link></Button>}
        {logged &&
        <Menu.Root>
            <Menu.Trigger asChild>
                 <Button marginLeft="32vw" width="64px" height="64px" backgroundColor="transparent"><FaUser style={{width:"25px", height:"25px"}}/></Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                <Menu.Content>
                    <Menu.Item >Favoritos</Menu.Item>
                    <Menu.Item onClick={() => {localStorage.setItem("token", ""); setLogged(false)}}>Cerrar Sesión</Menu.Item>
                </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root> }
    </header>
    <InputGroup flex="1" startElement={<LuSearch />} width="100%" marginTop="5px" paddingLeft="22%" className='buscador'>
        <Input placeholder="Buscar pelicula, serie, gente" h="50px" border="none" outline="none" onKeyDown={handleKeyDown} onChange={(e)=>{setBusqueda(e.target.value)}}/>
    </InputGroup>
    </>
  )
}

export default Nav