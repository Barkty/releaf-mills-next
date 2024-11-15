import { getStatusColor } from "@/helpers";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import { format } from "date-fns";

export const Popup = ({ mill, onClose, title }) => (
    <Modal isOpen={mill ? true : false} onClose={onClose}>
        <ModalContent className="p-8">
            <div className="popup">
                <h2 className="font-bold text-center text-underline">{title}</h2>
                {mill.millname && (
                    <>
                        <h4>Mill Name: {mill.millname}</h4>
                        <p>Quantity of P1 Sold: {mill.p1amount} tons</p>
                        <p>Average Price per Ton: ${mill.p1priceton}</p>
                        <p>Number of Transactions: {mill.numtransactions}</p>
                        <p>Last Transaction Date: {format(mill.lasttransactiondate, 'dd/MM/yyyy')}</p>
                        <span
                            style={{
                                color: getStatusColor(mill.lasttransactiondate),
                                fontWeight: 'bold',
                            }}
                        >
                            ● Status
                        </span>
                    </>
                )}
                {mill.capacity && (
                    <>
                        <p>PKS Capacity: {mill.capacity} tons</p>
                        <p>Status: 
                            <span
                                className="capitalize"
                                style={{
                                    color: mill.status === "active" ? 'green' : 'red',
                                    fontWeight: 'bold',
                                }}
                            >
                                 ● {mill.status}
                            </span>
                        </p>
                        <Button className='flex text-center bg-[#8FC54D] border-0 text-white text-md px-10 md:px-12 hover:bg-opacity-80 hover:transition-all duration-300'>
                            Edit PKS Dumpsite
                        </Button>
                    </>
                )}
            </div>
        </ModalContent>
    </Modal>
);