const initialState = {
    userId: '',
    email: '',
    userName: '',
    profileImage: ''
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isGuest: false,
                userId: action.userId,
                email: action.email,
                userName: action.userName,
                profileImage: action.profileImage
            };
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
