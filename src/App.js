import { useState, useEffect } from "react";
import "./App.css";
import AppContext from "./components/AppContext";
import BudgetContainer from "./container/BudgetContainer";
import { defaultExpenseCategories, defaultIncomeCategories } from "./data/defaultCategoriesData";
import { useLocalStorage } from "./hooks/customHooks";

function App() {
  const [account, setAccount] = useLocalStorage("account", []);

  const [totalBalance, setTotalBalance] = useState(0);
  const [incomeCategories, setIncomeCategory] = useState(defaultIncomeCategories);
  const [expenseCategories, setExpenseCategory] = useState(defaultExpenseCategories);
  const [transactionList, addTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const values = {
    totalBalance,
    setTotalBalance,
    incomeCategories,
    setIncomeCategory,
    expenseCategories,
    setExpenseCategory,
    account,
    setAccount,
    transactionList,
    addTransaction,
    totalExpense,
    setTotalExpense,
    totalIncome,
    setTotalIncome
  };
useEffect(() => {
    updateTotalBalance();

    const transactionListData = JSON.parse(localStorage.getItem('transactionList'))
        
    if (transactionListData) {
      addTransaction(transactionListData)
    }
  },[]);

useEffect(() => {
    localStorage.setItem('transactionList', JSON.stringify(transactionList))
}, [transactionList])

useEffect(() => {
  const incomeCategoriesData = JSON.parse(localStorage.getItem('incomeCategories'))
      
  if (incomeCategoriesData) {
    setIncomeCategory(incomeCategoriesData)
  }
},[]);

useEffect(() => {
  localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories))
}, [incomeCategories])

useEffect(() => {
  const expenseCategoriesData = JSON.parse(localStorage.getItem('expenseCategories'));
      
  if (expenseCategoriesData) {
    setExpenseCategory(expenseCategoriesData)
  }
},[]);

useEffect(() => {
  localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories))
}, [expenseCategories])

useEffect(() => {
  const totalIncomeData = JSON.parse(localStorage.getItem('totalIncome'));
      
  if (totalIncomeData) {
    setTotalIncome(totalIncomeData)
  }
},[]);

useEffect(() => {
  localStorage.setItem('totalIncome', JSON.stringify(totalIncome))
}, [totalIncome])

useEffect(() => {
  const totalExpenseData = JSON.parse(localStorage.getItem('totalExpense'));
      
  if (totalExpenseData) {
    setTotalExpense(totalExpenseData)
  }
},[]);

useEffect(() => {
  localStorage.setItem('totalExpense', JSON.stringify(totalExpense))
}, [totalExpense])

  const updateTotalBalance = (e) => {
    let totalBalanceArray = [];
    for (let item in account) {
      console.log(`useEffect ${account[item].balance}`);
      totalBalanceArray.push((`${account[item].balance}`))
    }
    console.log(totalBalanceArray);
    let sum = 0;
    totalBalanceArray.forEach(balances => sum += Number(balances));
    setTotalBalance(sum);
  }
  return (
    <div className="App">
      <AppContext.Provider value={values}>
        <BudgetContainer></BudgetContainer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
