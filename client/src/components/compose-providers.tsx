
interface IComposeProvidersProps {
    providers: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

/** 
    __ComposeProviders__

    Simple little component to help prevent the triangle of doom with many nested providers.

    _left = outer_ (e.g. Providers are  the last Provider will wrap the second to last Provider).

    Providers passed in MUST be batteries included.
    
    (i.e. the Provider must not be the raw `Context.Provider` - it should be at least one wrapper above that has already provided the Context). 

**/
export const ComposeProviders = ({ providers = [], children }: IComposeProvidersProps) => {
    return (
        <>
            {providers.reduceRight(
                (acc, Provider) => {
                    return <Provider>{acc}</Provider>
                },
                children
            )}
        </>
    )
}