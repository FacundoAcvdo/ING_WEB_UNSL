import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Link
} from '@chakra-ui/react';
import { useState } from 'react';
import Nav from './Nav';


const url = import.meta.env.VITE_REGISTER_URL;

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        alert('Registro exitoso, por favor inicia sesión.');
      } else {
        return response.text().then((text) => {
          alert('Error al registrar: ' + text);
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error de red o del servidor');
    });
};

  return (
    <>
      <Nav />

      <Center H="100vh" p={8} bg="gray.100">
        <Flex
          bg="white"
          borderRadius="md"
          boxShadow="md"
          overflow="hidden"
          maxW="900px"
          w="100%"
        >

          <Box p={8} w="100%">
            <Heading as="h2" fontSize="2xl" mb={2}>
              Crea una cuenta
            </Heading>
            <Text fontSize="sm" mb={6}>
              Crear una cuenta es fácil y gratis. Rellena el formulario para empezar. Se necesita JavaScript para continuar.
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  bg="blue.50"
                  placeholder="Usuario"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
                <Input
                  bg="blue.50"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <Input
                  bg="blue.50"
                  type="password"
                  placeholder="Repite la contraseña"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

                <Text fontSize="xs" color="gray.600" textAlign="center">
                  Al hacer clic en el botón "Regístrate", certifico que he leído y acepto los
                  términos de uso y la política de privacidad de TMDB.
                </Text>

                <Flex w="100%" justifyContent="flex-start" gap={4}>
                  <Button type="submit" colorScheme="gray">
                    Regístrate
                  </Button>
                  <Link color="cyan.600" fontSize="sm" href="/">
                    Cancelar
                  </Link>
                </Flex>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export default Register;
