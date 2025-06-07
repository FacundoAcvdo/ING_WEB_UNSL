import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Nav from './Nav';
import { useNavigate } from "react-router";

const url = import.meta.env.VITE_SERVER_URL;

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const isFormComplete = form.username !== '' && form.password !== '';
  let navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url, {
        method:"POST",
        body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token)
        navigate("/")
      })
  };

  return (
    <>
      <Nav />
      <Center bg="gray.50" p={6}>
        <Box
          w="100%"
          maxW="900px"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={8}
        >
          <Heading as="h2" size="lg" mb={4}>
            Iniciar sesión en tu cuenta
          </Heading>

          <Text fontSize="sm" mb={2}>
            Para poder editar y valorar en TMDB, así como para obtener recomendaciones personales, deberás acceder con tu cuenta.
            Si no tienes una, registrarse para obtenerla es gratis y simple.{' '}
            <Link color="cyan.500" href="#">
              Pulsa aquí
            </Link>{' '}
            para empezar.
          </Text>

          <Text fontSize="sm" mb={6}>
            Si ya te has registrado pero aún no has recibido el correo de confirmación,{' '}
            <Link color="cyan.500" href="#">
              pulsa aquí
            </Link>{' '}
            para enviarlo de nuevo.
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={1}>Usuario</Text>
                <Input
                  bg="blue.50"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Usuario"
                />
              </Box>

              <Box w="100%">
                <Text mb={1}>Contraseña</Text>
                <Input
                  bg="blue.50"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
              </Box>

              <Flex w="100%" justifyContent="flex-start" gap={4}>
                <Button
                  type="submit"
                  colorScheme="gray"
                  isDisabled={!isFormComplete}
                >
                  Iniciar sesión
                </Button>
                <Link color="cyan.500" fontSize="sm" href="#">
                  Restablecer contraseña
                </Link>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Center>
    </>
  );
}

export default Login;
