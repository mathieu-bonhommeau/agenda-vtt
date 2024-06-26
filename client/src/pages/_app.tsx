import { dependencies, store } from '@/app/_common/business/store/store'
import { Layout } from '@/app/_common/client/components/layout'
import { AppContextProvider } from '@/app/_common/client/context/app-context'
import '@/assets/styles/main.scss'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Provider } from 'react-redux'

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AppContextProvider dependencies={dependencies}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppContextProvider>
        </Provider>
    )
}

export default dynamic(() => Promise.resolve(App), {
    ssr: false,
})
