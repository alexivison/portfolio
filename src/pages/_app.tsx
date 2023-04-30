import Layout from "@/components/Layout"
import "@/global/styles/globals.css"
import { Provider } from "jotai"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
