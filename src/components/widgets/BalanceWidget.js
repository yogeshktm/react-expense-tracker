import { useContext } from 'react';
import { Card, CardGroup, CardTitle, CardBody, CardText } from 'reactstrap';
import AppContext from '../AppContext';

export default function BalanceWidget(props) {
    const myContext = useContext(AppContext);
    return (
        <section className="balance-widget">
            <CardGroup>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            Available Balance
                        </CardTitle>
                        <CardText>
                            {myContext.totalBalance}
                        </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            Total income
                        </CardTitle>
                        <CardText>
                            {myContext.totalIncome}
                        </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            Total expense
                        </CardTitle>
                        <CardText>
                            {myContext.totalExpense}
                        </CardText>
                    </CardBody>
                </Card>
            </CardGroup>
        </section>
    )
}