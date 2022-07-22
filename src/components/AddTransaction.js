import { Alert, Form, FormGroup, Label, Input, Button, Row, Col, Offcanvas, OffcanvasHeader, OffcanvasBody, FormFeedback } from 'reactstrap';
import { useContext, useEffect } from 'react';
import AppContext from './AppContext';
import { noAccountError, lessBalanceErrorMessage } from '../data/messages';

export default function AddTransaction(props) {
  const myContext = useContext(AppContext);
  let { transPopupState, setTypeSelectValue, transactionError, lessBalanceError, transferMode } = props;
  let arr = [];
  for (let item in myContext.account) {
    console.log(`${myContext.account[item].accountName}`);
    arr.push(`${myContext.account[item].accountName}`);
  }
  let expenseCatNameArray = [];
  for (let item in myContext.expenseCategories) {
    expenseCatNameArray.push(`${myContext.expenseCategories[item].catName}`);
  }
  let incomeCatNameArray = [];
  for (let item in myContext.incomeCategories) {
    incomeCatNameArray.push(`${myContext.incomeCategories[item].catName}`);
  }
  let transactionType = ['expense', 'income', 'transfer'];

  let noAccount = myContext.account.length === 0 && <Alert color='danger'>{noAccountError}</Alert>;
  let lessBalance = lessBalanceError && <Alert color='danger'>{lessBalanceErrorMessage}</Alert>;

  useEffect(() => {
    setTypeSelectValue(0);
  }, [transPopupState, setTypeSelectValue]);


  return (
    <>
      <Button color="primary" outline onClick={props.toggleTransPopup}>Add Transaction</Button>
      <Offcanvas
        scrollable
        toggle={props.toggleTransPopup}
        isOpen={props.transPopupState}
        direction="end"
        fade={false}
      >
        <div className="add-transaction">
          <OffcanvasHeader toggle={props.toggleTransPopup}>
            Add a transaction
          </OffcanvasHeader>
          <OffcanvasBody>
            <>
              {noAccount}
              {lessBalance}
              <Form onSubmit={props.onSaveTransaction}>
                <Row>
                  <Col sm="12">
                    <FormGroup floating>
                      <Input
                        id="amount"
                        name="amount"
                        placeholder="with a placeholder"
                        type="number"
                        onChange={props.onAmountChange}
                        value={props.amountInput}
                        invalid={transactionError}
                      />
                      <FormFeedback tooltip>
                        Amount is required. must be greater than 0
                      </FormFeedback>
                      <Label for="amount">
                        Amount
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup floating>
                      <Input
                        id="transactionType"
                        name="transactionType"
                        placeholder="with a placeholder"
                        type="select"
                        onChange={props.onTypeChange}
                        defaultValue="0">
                        {
                          transactionType.map(function (item, index) {
                            return <option key={index} value={index}> {item}</option>
                          })
                        }
                      </Input>
                      <Label for="transactionType">
                        Type
                      </Label>
                    </FormGroup>
                  </Col>
                  {
                    transferMode &&
                    <>
                      <Col sm="12">
                        <FormGroup floating>
                          <Input
                            id="fromAccount"
                            name="fromAccount"
                            placeholder="with a placeholder"
                            type="select"
                            onChange={props.fromAccountChange}
                            defaultValue={myContext.account.length > 0 ? myContext.account[0].id : null}
                          >
                            {myContext.account.map(({ accountName, id }, index) => <option key={index} id={index} value={id}>{accountName}</option>)}
                          </Input>
                          <Label for="accountSelect">
                            From account
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm="12">
                        <FormGroup floating>
                          <Input
                            id="toAccount"
                            name="toAccount"
                            placeholder="with a placeholder"
                            type="select"
                            onChange={props.toAccountChange}
                            defaultValue={myContext.account.length > 0 ? myContext.account[0].id : null}
                          >
                            {myContext.account.map(({ accountName, id }, index) => <option key={index} id={index} value={id}>{accountName}</option>)}
                          </Input>
                          <Label for="accountSelect">
                            To account
                          </Label>
                        </FormGroup>
                      </Col>
                    </>
                  }
                  {!transferMode ?
                    <>
                      <Col sm="12">
                        <FormGroup floating>
                          <Input
                            id="category"
                            name="category"
                            placeholder="with a placeholder"
                            type="select"
                            onChange={props.onCategoryChange}
                            defaultValue={props.selectedCategory}>
                            {props.selectedType === 0
                              ?
                              expenseCatNameArray.map(function (item, index) {
                                return <option key={index}>{item}</option>;
                              })
                              : incomeCatNameArray.map(function (item, index) {
                                return <option key={index}>{item}</option>;
                              })}
                          </Input>
                          <Label for="category">
                            Category
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm="12">
                        <FormGroup floating>
                          <Input
                            id="accountSelecr"
                            name="accountSelect"
                            placeholder="with a placeholder"
                            type="select"
                            onChange={props.onAccountChange}
                            defaultValue={myContext.account.length > 0 ? myContext.account[0].id : null}
                          >
                            {myContext.account.map(({ accountName, id }, index) => <option key={index} id={index} value={id}>{accountName}</option>)}
                          </Input>
                          <Label for="accountSelect">
                            Select Account
                          </Label>
                        </FormGroup>
                      </Col>
                    </> : null
                  }
                  <Col sm="12">
                    <FormGroup floating>
                      <Input
                        id="note"
                        name="note"
                        placeholder="with a placeholder"
                        type="text"
                        onChange={props.onNoteChange}
                        value={props.transNote} />
                      <Label for="amount">
                        Note
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <Button color="primary">Save</Button>
                  </Col>
                </Row>
              </Form>
            </>
          </OffcanvasBody>
        </div>
      </Offcanvas>
    </>
  );
}
