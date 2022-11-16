import type { RenderOptions as rtlRenderOptions } from "@testing-library/react"

export type User = { username: string, password: string }

export type UserBody = {
  username?: string
  password?: string
}

export type RenderOptions = rtlRenderOptions & {
  theme?: 'light' | 'dark'
}

export type ThemeColors = 'dark' | 'light'

type PromiseParameters = Parameters<ConstructorParameters<PromiseConstructor>['0']>
export type Resolver = PromiseParameters['0']
export type Rejector = PromiseParameters['1']

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;


type TMockedSuccessCallback = (position: DeepPartial<GeolocationPosition>) => void
type TMockedErrorCallback = (position: DeepPartial<PositionErrorCallback>) => void

export type TMockedGetCurrentPositionCb = [successCallback: TMockedSuccessCallback,
  errorCallback?: TMockedErrorCallback,
  options?: PositionOptions]
