import Logo from "./Logo";
import BalanceWidget from "../widgets/BalanceWidget";
import { React } from 'react';


export default function Header(props) {
    return (
        <header className="main-header">
            <Logo></Logo>
            <BalanceWidget total={props.total} totalIncome={props.totalIncome} totalExpense={props.totalExpense}></BalanceWidget>
        </header>
    )
}