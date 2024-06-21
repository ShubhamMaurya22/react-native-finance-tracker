import {createSlice, nanoid} from '@reduxjs/toolkit'


const initialState = {
    list: []
}

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const {type, category, amount} = action.payload
           
            const id = nanoid()
            // const newExpense = {
            //     id,
            //     type,
            //     category,
            //     amount,
            //     timestamp : Date.now()
            // }
            const newExpense = {
                id: nanoid(),
                type: action.payload.type,
                category: action.payload.category,
                amount: action.payload.amount,
                timestamp: Date.now()
            }
            state.list.push(newExpense)
            console.log(state.list);
        }
    
    }
})

export const {addExpense} = expenseSlice.actions
export default expenseSlice.reducer