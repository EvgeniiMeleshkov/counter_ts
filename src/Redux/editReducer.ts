export type InitialStateType = {
    edit: boolean
}
const editInitialState: InitialStateType = {
    edit: false
}

export const EditReducer = (state: InitialStateType = editInitialState, action: EditACType): InitialStateType => {
    switch (action.type) {
        case 'EDIT':
            return {...state, edit: action.payload.edit}
        default:
            return state
    }
}

type EditACType = ReturnType<typeof editAC>

export const editAC = (edit: boolean) => {
    return {
        type: 'EDIT',
        payload: {
            edit
        }
    } as const
}