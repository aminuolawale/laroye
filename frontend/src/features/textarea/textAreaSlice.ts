import { createSlice } from "@reduxjs/toolkit";
type TextEntry = {
    id:string,
    value:string
}
const textAreaSlice = createSlice({
    name: "textArea",
    initialState: [{id: `${Math.floor(Math.random()*1000)}`, value:""}],
    reducers: {
        addTextArea: (state) => {
            state.push({id:`${Math.floor(Math.random()*1000)}`, value:""})
        },
        setTextArea: (state, action) => {
            const {id, value} = action.payload;
            const oldEntry = state.find(item => item.id === id) as TextEntry
            const newEntry = {...oldEntry, value}
            state[state.indexOf(oldEntry)] =newEntry
        }, 
        removeTextArea: (state, action) => {
            if (state.length>1){
                const {id} = action.payload;
                const entry = state.find(item => item.id === id) as TextEntry
                state.splice(state.indexOf(entry),1)
            }
             else {
                state[0].value = ''
             }
        }
    }
})


export const {addTextArea, setTextArea, removeTextArea} = textAreaSlice.actions;

export default textAreaSlice.reducer;

export const getTextAreas = (state:any) => state.textArea;