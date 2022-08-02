export type SettingsInitialStateType = {
    currentValue: number,
    min: number,
    max: number
}
const settingsInitialState: SettingsInitialStateType = {
    currentValue: 0,
    min: 0,
    max: 5
}

export const SettingReducer = (state = settingsInitialState, action: SettingsReducerActionsType): SettingsInitialStateType => {
    switch (action.type) {
        case 'SET_MIN':
            return {...state, min: action.payload.value}
        case 'SET_MAX':
            return {...state, max: action.payload.value}
        case 'SET_CURRENT':
            return {...state, currentValue: action.payload.value}
        default:
            return state
    }
}
type SettingsReducerActionsType = SetMinACType | SetMaxACType | SetCurrentACType

type SetMaxACType = ReturnType<typeof setMaxAC>
type SetMinACType = ReturnType<typeof setMinAC>
type SetCurrentACType = ReturnType<typeof setCurrentAC>

export const setMaxAC = (value: number) => {
    return {
        type: 'SET_MAX',
        payload: {
            value
        }
    } as const
}
export const setMinAC = (value: number) => {
    return {
        type: 'SET_MIN',
        payload: {
            value
        }
    } as const
}
export const setCurrentAC = (value: number) => {
    return {
        type: 'SET_CURRENT',
        payload: {
            value
        }
    } as const
}