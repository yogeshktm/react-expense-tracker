import AddCategory from "../AddCategory";
import { React, useState } from 'react';
import AddAccount from "../AddAccount";
import AddTransaction from "../AddTransaction";
import AccountDetails from "../AccountDetails";
import { useToggle } from "../../hooks/customHooks";


export default function AddPopupWidgets(props) {
    const [popupState, setPopupState] = useState(false);
    const [accountPopupState, setAccountPopupState] = useState(false);
    const [transPopupState, setTransPopupState] = useState(false);
    const [accountDetailsPopState, setAccountDetailsPopState] = useToggle();

    const openPopup = (e) => {
        setPopupState(popupState === true ? false : true);
    };
    const openAccountPopup = (e) => {
        setAccountPopupState(accountPopupState === true ? false : true);
    };
    const openTransPopup = (e) => {
        setTransPopupState(transPopupState === true ? false : true);
    };
    const openAccountDetailsPopup = (e) => {
        setAccountDetailsPopState(accountDetailsPopState === true ? false : true);
    }
    return (
        <div className="popup-widgets">
            <AddTransaction transPopupState={transPopupState} toggleTransPopup={openTransPopup}
                onAmountChange={props.onAmountChange}
                onCategoryChange={props.onCategoryChange}
                onTypeChange={props.onTypeChange}
                onAccountChange={props.onAccountChange}
                onSaveTransaction={props.onSaveTransaction}
                selectedType={props.selectedType}
                amountInput={props.amountInput}
                selectedAccount={props.selectedAccount}
                selectedCategory={props.selectedCategory}
                onNoteChange={props.onNoteChange}
                transNote={props.transNote}
                setTypeSelectValue={props.setTypeSelectValue}
                transactionError={props.transactionError}
                lessBalanceError={props.lessBalanceError}
                transferMode={props.transferMode}
                fromAccountChange={props.fromAccountChange}
                toAccountChange={props.toAccountChange}
            ></AddTransaction>
            <AddCategory popupState={popupState} togglePopup={openPopup}></AddCategory>
            <AddAccount accountPopupState={accountPopupState} toggleAccountPopup={openAccountPopup}></AddAccount>
            <AccountDetails accountDetailsPopState={accountDetailsPopState} toggleAccountDetailPopup={openAccountDetailsPopup}></AccountDetails>
        </div>
    )
}