
export default function (state = {},action) {
    switch (state,action) {
        case 'CITY_UPDATE':
            return {
                ...state,
                ...action.payload
            }
        case 'CITY_CLEAR':
            return {}
        default:
            return state
            break;
    }
}
