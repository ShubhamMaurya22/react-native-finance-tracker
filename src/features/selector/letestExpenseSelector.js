export const letestExpenseSelector = (state) => {
    const expenses = state.list;
      // console.log('expense', expenses)
    
        // const expenseTransactions = expenses.filter((expense) => expense.type === 'Expense');
        // console.log('length',expenseTransactions)
        
        // Check if there are no expense transactions
        // if (expenseTransactions.length === 0) {
          
        //   return null; // Return null if no expense transactions are available
        // }
        if (expenses.length === 0) {
          
          return null; // Return null if no expense transactions are available
        }
        
        // Sort expense transactions by timestamp in descending order and return the first one (latest)
        // console.log('something',expenses.slice().sort((a, b) => b.timestamp - a.timestamp));
        return expenses.slice().sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
      
    };
  