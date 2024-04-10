import { Layout } from '@/app/_common/components/layout'
import type { AppProps } from 'next/app'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
