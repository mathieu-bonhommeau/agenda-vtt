import { Layout } from '@/app/_common/components/layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
