import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, Input, Label, FormGroup, FormFeedback } from 'reactstrap';
import { useState, useContext, useEffect } from "react";
import AppContext from './AppContext';
import { generateRandomColor } from '../helpers/helpers';

export default function AddCategory(props) {
    const myContext = useContext(AppContext);
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameError, setCategoryNameError] = useState(false);
    const [categoryType, setCategoryType] = useState(0);
    const [catColor, setCatColor] = useState(generateRandomColor)
    const handleCategoryChange = (e) => {
        console.log(e.target.value.trim().length);
        setCategoryNameError(false);
        if (e.target.value.trim().length > 0) {
            setCategoryName(e.target.value);
        }
        else {
            setCategoryNameError(true);
        }
    };
    const handleCategoryTypeChange = (e) => {
        setCategoryType(Number(e.target.value));
    }
    const handleCatColorChange = (e) => {
        setCatColor(e.target.value);
    }
    const handleSaveCategory = (e) => {
        e.preventDefault();
        if (categoryName.length > 0) {
            setCategoryNameError(false);
            if (categoryType === 0) {
                myContext.setExpenseCategory([
                    ...myContext.expenseCategories,
                    {
                        catName: categoryName,
                        color: catColor ? catColor : "red"
                    },
                ]);
                setCategoryName("");
                props.togglePopup();

            }
            else {
                myContext.setIncomeCategory([
                    ...myContext.incomeCategories,
                    {
                        catName: categoryName,
                        color: catColor ? catColor : "green"
                    },
                ]);
                // localStorage.setItem('incomeCategories', JSON.stringify(myContext.incomeCategories));
                setCategoryName("");
                props.togglePopup();
            }
        }
        else {
            setCategoryNameError(true);
        }
    }
    useEffect(() => {
        setCategoryType(0);
    }, [props.popupState]);
    return (
        <>
            <Button color="primary" outline onClick={props.togglePopup}>Add Category</Button>
            <Modal
                centered
                size="lg"
                toggle={props.togglePopup}
                isOpen={props.popupState}
            >
                <ModalHeader toggle={props.togglePopup}>
                    Add Category
                </ModalHeader>
                <ModalBody>
                    <Form inline onSubmit={handleSaveCategory}>
                        <Row>

                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="catType"
                                        name="catType"
                                        placeholder="with a placeholder"
                                        type="select"
                                        onChange={handleCategoryTypeChange}
                                    >
                                        <option value="0">EXPENSE</option>
                                        <option value="1">INCOME</option>
                                    </Input>
                                    <Label for="catType">
                                        Type
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="catName"
                                        name="catName"
                                        placeholder="with a placeholder"
                                        type="text"
                                        onChange={handleCategoryChange}
                                        invalid={categoryNameError}
                                    />
                                    <FormFeedback tooltip>
                                        Category name required
                                    </FormFeedback>
                                    <Label for="amount">
                                        Category Name
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup floating>
                                    <Input
                                        id="catColor"
                                        name="catColor"
                                        placeholder="with a placeholder"
                                        type="color"
                                        onChange={handleCatColorChange}
                                    />
                                    <Label for="amount">
                                        Category Name
                                    </Label>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button color="primary">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                    <div>
                      
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.togglePopup}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    )
}