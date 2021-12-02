export default (state, action) => {
    switch (action.type) {
        case 'update-list':
            const todoUpList = state.usuario;
            todoUpList.list = action.list;
            return { ...state, usuario: todoUpList }
        case 'edit-item':
            const todoUpEdit = state.usuario;
            todoUpEdit.item = action.item;
            return { ...state, usuario: todoUpEdit }
        case 'add-item':
            const todoUp = state.usuario.list;
            todoUp.push(action.item);
            return { ...state, usuario: { list: todoUp, item: {} } }
        default:
            return state;
    }
}