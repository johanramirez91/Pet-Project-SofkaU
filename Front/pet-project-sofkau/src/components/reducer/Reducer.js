export default (state, action) => {
    switch (action.type) {
        case 'updateCurso-list':
            const CursoUpList = state.curso;
            CursoUpList.list = action.list;
            return { ...state, curso: CursoUpList }
        case 'editCurso-item':
            const cursoUpEdit = state.curso;
            cursoUpEdit.item = action.item;
            return { ...state, curso: cursoUpEdit }
        case 'addCurso-item':
            const cursotodoUp = state.curso.list;
            cursotodoUp.push(action.item);
            return { ...state, curso: { list: cursotodoUp, item: {} } }
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