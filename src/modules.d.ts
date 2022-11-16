// because react-use-geolocation and import-all.macro doesn't have any type definitions, we need to create them manually.

type PositionCoords = GeolocationPosition | undefined
type PositionError = Error | undefined

declare module 'react-use-geolocation' {
  export function useCurrentPosition(): [PositionCoords, PositionError]
}

type ReactLazyFactoryParam = Parameters<typeof React['lazy']>['0']

declare module 'import-all.macro' {
  function deferred(path: string): Record<string, ReactLazyFactoryParam>
}
