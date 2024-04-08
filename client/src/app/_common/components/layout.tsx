import { ReactElement } from 'react'

export function Layout({ children }: { children: ReactElement }) {
    return (
        <>
            <main>
                <h1>UtagawaVTT - Agenda</h1>
                {children}
            </main>
        </>
    )
}
