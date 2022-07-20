import { Offcanvas, OffcanvasHeader, OffcanvasBody, Table, Button } from 'reactstrap';
import { useContext } from 'react';
import AppContext from './AppContext';

export default function AccountDetails(props) {
    const myContext = useContext(AppContext);
    return (
        <>
            <Button color="primary" outline onClick={props.toggleAccountDetailPopup}>View Account details</Button>
            <Offcanvas
                scrollable
                toggle={props.toggleAccountDetailPopup}
                isOpen={props.accountDetailsPopState}
                direction="end"
            >
                <div className="add-transaction">
                    <OffcanvasHeader toggle={props.toggleAccountDetailPopup}>
                        Account details
                    </OffcanvasHeader>
                    <OffcanvasBody>

                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Account name
                                    </th>
                                    <th>
                                        Balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myContext.account.length > 0 ?
                                        myContext.account.map(({ accountName, id, balance }, index) => <tr key={index} id={index}><td>{index + 1}</td><td>{accountName}</td><td>{balance}</td></tr>)
                                        :
                                        <tr><td className="text-center" colSpan="3">No details found</td></tr>
                                }
                            </tbody>
                        </Table>


                    </OffcanvasBody>
                </div>
            </Offcanvas>
        </>
    );
}
