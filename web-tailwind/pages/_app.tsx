import 'tailwindcss/tailwind.css'
import '../styles/theme.css'
import '../styles/components.css'
import ThemeProvider from "../contexts/themeContext";
import { useState } from "react"
import { cache, getItem, setItem } from '../contexts/cache';
import { ApolloClient, ApolloProvider } from "@apollo/client";



export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(getItem("token") || "")
  

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APOLLO_SERVER,
    cache,
    headers: {
      "authorization": token
    }          
  })

  const updateToken = key => {
    setItem("token", key)
    setToken(key)
  }

  const init = {
    updateToken,
    token
  }

  if (!client) return <p>initializing app ...</p> 
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider init={ init }>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

