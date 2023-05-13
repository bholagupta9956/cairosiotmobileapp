
const initialState = {
    project : []
}

const getAllProject = (state = initialState , action) =>{
    if(action.type === "UPDATE_ALL_PROJECT"){
        return {  project : action.payload}
    }
    else {
        return state;
    }
}

export default getAllProject ;