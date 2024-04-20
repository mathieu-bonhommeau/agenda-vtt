import { store } from '@/app/_common/business/store/store'
import { Layout } from '@/app/_common/client/components/layout'
import type { AppProps } from 'next/app'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}
