import { createSelector } from '@reduxjs/toolkit';

const selectExpenses = (state) => state.list;

export const expenseSelectorByType = createSelector(
  [selectExpenses],
  (expenses) => {
    const result = {
      day: {
        expense: 0,
        income: 0,
      },
      week: {
        expense: 0,
        income: 0,
      },
      month: {
        expense: 0,
        income: 0,
      },
    };

    const today = new Date();
    const daysInWeek = 7;

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.timestamp);
      const amount = Number(expense.amount)

      // day
      if (
        expenseDate.getDate() === today.getDate() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      ) {
        if (expense.type === 'Expense') {
          result.day.expense += amount;
        } else if (expense.type === 'Income') {
          result.day.income += amount;
        }
      }

      // week
      const daysDifference = Math.floor((today - expenseDate) / (24 * 60 * 60 * 1000));
      if (daysDifference < daysInWeek) {
        if (expense.type === 'Expense') {
          result.week.expense += amount;
        } else if (expense.type === 'Income') {
          result.week.income += amount;
        }
      }

      // month
      if (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      ) {
        if (expense.type === 'Expense') {
          result.month.expense += amount;
        } else if (expense.type === 'Income') {
          result.month.income += amount;
        }
      }
    })

    console.log(result.day.expense);
    return result;
  }
);
