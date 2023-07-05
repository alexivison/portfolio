import Layout from "@/components/Layout"
import "@/global/styles/globals.css"
import { Provider } from "jotai"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default appWithTranslation(App)
