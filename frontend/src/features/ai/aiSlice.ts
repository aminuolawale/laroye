import { createSlice } from "@reduxjs/toolkit";

type R = {
    id:string, 
    text:string,
    result:any
}
const aiSlice = createSlice({
    name: 'ai',
    initialState:[] as R[],
    reducers:{
        setResults:(state, action)=> {
            const {results,action:actionName}:{action:string,results:R[]} = action.payload
            const updatedIds = new Set<string>(results.map((result:R) => result.id));
            const oldIds = new Set<string>(state.map((entry:R)=> entry.id))
            state.forEach((item,index) => {
                if (updatedIds.has(item.id)){
                    let update = results.find(result => item.id ===result.id) as R
                    update = {...state[index], ...update}
                    state[index] = {...update, result:state[index].result}
                    state[index].result[actionName] = update.result[actionName]

                }
            })
            state.push(...results.filter((result:R)=> !oldIds.has(result.id)))
        },
        removeResult:(state, action)=> {
            const {id} = action.payload;
            const entry = state.find(item => item.id===id) as R
            if (entry){
                state.splice(state.indexOf(entry),1)
            }
        },
        clearResult:(state, action)=>{
            const {id} = action.payload;
            const entry = state.find(item=> item.id === id) as R
            if (entry) {
                state[state.indexOf(entry)] = {...entry, result:{VALIDATION:"", SENTIMENT:"", TOPIC:""}}
            }
        }
    }
})



export default aiSlice.reducer;

export const {setResults, removeResult, clearResult} = aiSlice.actions;
export const getResults = (state:any) => state.ai;