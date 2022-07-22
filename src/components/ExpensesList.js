import { React, useState, useContext, useEffect } from 'react';
import { Table, Badge, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { checkDataNotEmpty } from '../helpers/helpers';
import AppContext from './AppContext';

export default function ExpensesList(props) {
  const myContext = useContext(AppContext);
  const [selectedShowOnly, setSelectedShowOnly] = useState(0);
  const [filteredTransaction, setFilteredTransaction] = useState(myContext.transactionList);
  console.log("TEST",myContext.transactionList);
  // const [sortBy, selectSort] = useState();
  // const [sortedTransaction, setSortedTransaction] = useState(myContext.transactionList);


  const handleShowOnly = (e) => {
    console.log(e.target.value);
    setSelectedShowOnly(Number(e.target.value));
  }
  // const handleSortBy = (e) => {
  //   selectSort(Number(e.target.value));
  // }

  useEffect(() => {
    const filterResults = () => {
      if (selectedShowOnly === 0) {
        setFilteredTransaction(myContext.transactionList);
      }
      else if (selectedShowOnly === 1) {
        let filteredResults = myContext.transactionList.filter(function (e) {
          return e.type === Number(1);
        })
        setFilteredTransaction(filteredResults);
      }
      else if (selectedShowOnly === 2) {
        let filteredResults = myContext.transactionList.filter(function (e) {
          return e.type === Number(0);
        })
        setFilteredTransaction(filteredResults);
      }
    }
    filterResults();
  }, [selectedShowOnly, myContext.transactionList]);
  return (
    <>
      <div className="transaction-toolbar">
        <Row>
          <Col sm="4">
            <FormGroup floating>
              <Input
                id="showOnly"
                name="showOnly"
                placeholder="with a placeholder"
                type="select"
                onChange={handleShowOnly}
                defaultValue="0"
              >
                <option id="0" value="0">
                  All
                </option>
                <option id="1" value="1">
                  Income
                </option>
                <option id="2" value="2">
                  Expenses
                </option>
              </Input>
              <Label for="showOnly">
                Show only
              </Label>

            </FormGroup>
          </Col>
          {/* <Col sm="4">
            <FormGroup floating>
              <Input
                id="sortBy"
                name="sortBy"
                placeholder="with a placeholder"
                type="select"
                onChange={handleSortBy}
                defaultValue="0"
              >
                <option id="0" value="0">
                  No sort
                </option>
                <option id="1" value="1">
                  Amount: Low to high
                </option>
                <option id="2" value="2">
                  Amount: High to Low
                </option>
              </Input>
              <Label for="sortBy">
                Sort by
              </Label>
            </FormGroup>
          </Col> */}
        </Row>
      </div>
      <div className="expenses-list">
        <Table bordered>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Amount
              </th>
              <th>
                Category
              </th>
              <th>
                Account
              </th>
              <th>
                Type
              </th>
              <th>
                Note
              </th>
              <th>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {
              checkDataNotEmpty(filteredTransaction) ?
                filteredTransaction.map(function (item, index) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.amount}</td>
                      <td>{item.cat}</td>
                      <td>{item.account}</td>
                      <td><Badge pill color={item.type === 1 ? "success" : item.type === 2 ? "primary" : "danger"}>{item.type === 1 ? "income" : item.type === 2 ? "Transfer" : "expense"}</Badge></td>
                      <td>{item.note}</td>
                      <td>{item.timeStamp}</td>
                    </tr>
                  );
                })
                :
                <tr>
                  <td colSpan="6">No entries found</td>
                </tr>
            }
          </tbody>
        </Table>
      </div>
    </>
  );
}
