const initialState = {
    userId: '',
    email: '',
    userName: '',
    profileImage: ''
};

const userDetails = JSON.parse(localStorage.getItem('userInfo')).userId;
console.log(userDetails);

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isGuest: false,
                userId: action.payload.userId,
                email: action.payload.email,
                userName: action.payload.userName,
                profileImage: action.payload.profileImage
            };
        case 'GET_USER_DETAILS':
            return {
                ...state,
                isGuest: false,
                userId: JSON.parse(localStorage.getItem('userInfo')).userId,
                email: JSON.parse(localStorage.getItem('userInfo')).email,
                userName: JSON.parse(localStorage.getItem('userInfo')).userName,
                profileImage: JSON.parse(localStorage.getItem('userInfo')).profileImage
            };
        case 'LOG_OUT':
            return null;
        case 'GUEST_MODE':
            return {
                ...state,
                isGuest: true
            };
        default:
            return state;
    }
};

export default Reducer;
