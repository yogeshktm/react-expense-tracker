
import { useState, useContext, useEffect } from "react";
import ExpensesList from "../components/ExpensesList";
import AddPopupWidgets from "../components/widgets/AddPopupWidgets";
import Header from "../components/Header/Header";
import getDateTime from "../helpers";
import AppContext from "../components/AppContext";

export default function BudgetContainer(props) {
  const myContext = useContext(AppContext);
  const [amountInput, setAmountInput] = useState();
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [typeSelectValue, setTypeSelectValue] = useState(0);
  const [fromAccount, setFromAccount] = useState();
  const [toAccount, setToAccount] = useState();
  const [transNote, setTransNote] = useState("");
  const [transferMode, setTransferMode] = useState(false);
  const [transactionError, setTransactionError] = useState(false);
  const [lessBalanceError, setLessBalanceError] = useState(false);

  const handleAmountChange = (e) => {
    setAmountInput(e.target.value);
    amountInput > 0 ? setTransactionError(false) : setTransactionError(true);
  };
  const handleCategoryChange = (e) => {
    console.log(e);
    setSelectedCategory(e.target.value);
  };
  const handleTypeChange = (e) => {
    console.log(e.target.selectedIndex);
    console.log(e);
    setTypeSelectValue(parseInt(e.target.value));
  };
  const handleAccountChange = (e) => {
    alert('inside');
    setSelectedAccount(e.target.value);
  }
  const handleNoteChange = (e) => {
    setTransNote(e.target.value);
  }
  const handleFromAccountChange = (e) => {
    setFromAccount(Number(e.target.value));
  }
  const handleToAccountChange = (e) => {
    setToAccount(Number(e.target.value));
  }
  const updateBalance = (transType) => {
    var foundIndex = myContext.account.length > 1 ? myContext.account.findIndex(x => x.id === Number(selectedAccount)) : null;
    console.log('accountss', myContext.account.length);
    let AccBalance = myContext.account.length > 0 ? Number(myContext.account[Number(foundIndex)].balance) : 0;
    console.log('accountss', myContext.account.length)
    let newBalance;

    if (transType === 0) {
      if (AccBalance >= amountInput) {
        newBalance = parseInt(AccBalance) - parseInt(amountInput);
        myContext.setTotalExpense(Number(myContext.totalExpense) + Number(amountInput));
        setLessBalanceError(false);
      }
      else {
        setLessBalanceError(true);
      }
    }
    else if (transType === 1) {
      newBalance = parseInt(AccBalance) + parseInt(amountInput);
      myContext.setTotalIncome(Number(myContext.totalIncome) + Number(amountInput));
      setLessBalanceError(false);
    }
    else if (transferMode) {
      let accountFromIndex = myContext.account.length > 1 ? myContext.account.findIndex(x => x.id === Number(fromAccount)) : null;
      let accountToIndex = myContext.account.length > 1 ? myContext.account.findIndex(x => x.id === Number(toAccount)) : null;
      let fromAccBalance = myContext.account.length > 0 ? Number(myContext.account[Number(accountFromIndex)].balance) : 0;
      let toAccBalance = myContext.account.length > 0 ? Number(myContext.account[Number(accountToIndex)].balance) : 0;

      let newFromBalance = parseInt(fromAccBalance) - parseInt(amountInput);
      let newToBalance = parseInt(toAccBalance) + parseInt(amountInput);

      let fromAccName = ""
      let toAccName = "";
      const accountNewArray = myContext.account.map(obj => {
        if (obj.id === Number(toAccount)) {
          toAccName = obj.accountName;
          return { ...obj, balance: newToBalance };
        }
        else if (obj.id === Number(fromAccount)) {
          fromAccName = obj.accountName;
          return { ...obj, balance: newFromBalance };
        }
        return obj;
      })
      myContext.setAccount(accountNewArray);

      const [date, time] = getDateTime();
      myContext.addTransaction([
        ...myContext.transactionList,
        {
          amount: parseInt(amountInput),
          type: Number(2),
          account: `${fromAccName} -> ${toAccName}`,
          timeStamp: date + time,
          note: transNote
        },
      ]);
      setAmountInput(' ');
      setTransNote('');
    }
    const [date, time] = getDateTime();
    if (!transferMode) {
      if (amountInput > 0 && !lessBalanceError) {
        let accName;
        const accountArray = myContext.account.map(obj => {
          if (obj.id === Number(selectedAccount)) {
            accName = obj.accountName;
            return { ...obj, balance: newBalance };
          }
          return obj;
        })
        myContext.setAccount(accountArray)
        myContext.addTransaction([
          ...myContext.transactionList,
          {
            amount: parseInt(amountInput),
            type: typeSelectValue,
            cat: selectedCategory,
            account: accName,
            timeStamp: date + time,
            note: transNote
          },
        ]);
        setAmountInput(' ');
        setTransNote('');
      }
    }
  }
  const handleSaveTransaction = (e) => {
    e.preventDefault();
    console.log('inside');
    console.log(typeSelectValue);
    console.log(getDateTime());
    if (amountInput > 0) {
      if (Number(typeSelectValue) === 1) {
        updateBalance(1)
      }
      else if (Number(typeSelectValue) === 0) {
        updateBalance(0);
      }
      else if (Number(typeSelectValue) === 2) {
        updateBalance(2);
      }
    }
    else {
      setTransactionError(true);
      setTransNote('');
    }

  }

  useEffect(() => {
    setSelectedAccount(myContext.account.length > 0 ? myContext.account[0].id : "")
  }, [myContext.account]);

  useEffect(() => {
    setSelectedCategory(typeSelectValue === 1 ? myContext.incomeCategories.length > 0 ? myContext.incomeCategories[0].catName : null : myContext.expenseCategories.length > 0 ? myContext.expenseCategories[0].catName : null)
  }, [typeSelectValue, myContext.incomeCategories, myContext.expenseCategories]);

  useEffect(() => {
    typeSelectValue === 2 ? setTransferMode(true) : setTransferMode(false);
  }, [typeSelectValue])


  return (
    <div className="container">
      <Header total={myContext.totalBalance}></Header>
      <AddPopupWidgets onAmountChange={handleAmountChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onAccountChange={handleAccountChange}
        onSaveTransaction={handleSaveTransaction}
        selectedType={typeSelectValue}
        setTypeSelectValue={setTypeSelectValue}
        amountInput={amountInput}
        selectedAccount={selectedAccount}
        selectedCategory={selectedCategory}
        onNoteChange={handleNoteChange}
        transNote={transNote}
        transactionError={transactionError}
        lessBalanceError={lessBalanceError}
        transferMode={transferMode}
        fromAccountChange={handleFromAccountChange}
        toAccountChange={handleToAccountChange}
      ></AddPopupWidgets>
      <ExpensesList></ExpensesList>
    </div >
  );
}
