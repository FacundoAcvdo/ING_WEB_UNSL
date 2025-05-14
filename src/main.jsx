import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, config)

createRoot(document.getElementById('root')).render(
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
)