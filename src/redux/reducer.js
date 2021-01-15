const initialState = {
    userId: '',
    email: '',
    userName: '',
    profileImage: ''
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_USER':
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                userName: action.userName,
                profileImage: action.profileImage
            };
        default:
            return state;
    }
};

export default Reducer;
