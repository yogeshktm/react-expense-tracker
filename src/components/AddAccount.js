import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Button, Form, Row, Col, Input, Label, FormGroup } from 'reactstrap';
import { useState, useContext } from "react";
import AppContext from './AppContext';
import { generateUniqueRandom, generateRandomColor } from '../helpers/helpers';

export default function AddAccount(props) {
    const myContext = useContext(AppContext);
    const [accountName, setAccountName] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [accColor, setAccColor] = useState(generateRandomColor);
    const [accountNameError, setAccountNameError] = useState(false);
    const handleAccountChange = (e) => {
        setAccountName(e.target.value);
    }
    const handleAccountBalance = (e) => {
        setAccountBalance(e.target.value);
    }
    const handleAccColor = (e) => {
        console.log(e);
        setAccColor(e.target.value);
    }
    const saveAccount = (e) => {
        e.preventDefault();
        let uniqueId = generateUniqueRandom(9999);
        if (accountName.length > 0) {
            myContext.setAccount([
                ...myContext.account,
                {
                    id: uniqueId,
                    accountName: accountName,
                    balance: accountBalance,
                    color: accColor
                }
            ]);
            localStorage.setItem("account", JSON.stringify(myContext.account));
            setAccountNameError(false)
            props.toggleAccountPopup();
        }
        else {
            setAccountNameError(true)
        }
    }
    return (
        <>
            <Button color="primary" outline onClick={props.toggleAccountPopup}>Add Account</Button>
            <Modal
                centered
                size="lg"
                toggle={props.toggleAccountPopup}
                isOpen={props.accountPopupState}
            >
                <ModalHeader toggle={props.toggleAccountPopup}>
                    Add Account
                </ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={saveAccount}>
                        <Row>

                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="accName"
                                        name="accName"
                                        placeholder="with a placeholder"
                                        type="text"
                                        onChange={handleAccountChange}
                                        invalid={accountNameError}
                                    />
                                    <FormFeedback tooltip>
                                        Account name required
                                    </FormFeedback>
                                    <Label for="accName">
                                        Account Name
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="accBalance"
                                        name="accBalance"
                                        placeholder="with a placeholder"
                                        type="number"
                                        onChange={handleAccountBalance}
                                    // invalid={categoryNameError}
                                    />
                                    <Label for="amount">
                                        Account Balance
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="accColor"
                                        name="accColor"
                                        placeholder="with a placeholder"
                                        type="color"
                                        onChange={handleAccColor}
                                    // invalid={categoryNameError}
                                    />
                                    <Label for="amount">
                                        Color
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button color="primary">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.toggleAccountPopup}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    )
}