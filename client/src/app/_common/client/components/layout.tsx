import { ReactElement } from 'react'

export function Layout({ children }: { children: ReactElement }) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}
