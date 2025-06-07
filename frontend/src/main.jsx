import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import Busqueda from "./Busqueda.jsx";
import Detalle from "./Detalle.jsx";
import Login from "./Login.jsx";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider value={system}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search/:data" element={<Busqueda />} />
        <Route path="/info/:type/:data" element={<Detalle />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
)