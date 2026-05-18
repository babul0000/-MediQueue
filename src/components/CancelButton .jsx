import { Table } from "@heroui/react";





const CancelButton  = ({ book }) => {
    console.log(book);


    return (
        <Table.Row key={book._id}>
            <Table.Cell>{book.name}</Table.Cell>
            <Table.Cell>{book.phone}</Table.Cell>
            <Table.Cell>{book.tutorName}</Table.Cell>
            <Table.Cell>{book.email}</Table.Cell>
            
            {/* <Table.Cell>{sCancel ? 'cancel' : "confirm"} </Table.Cell> */}
            {/* <Table.Cell> */}
                {/* <button onClick={() => setIsCancel(true)} variant='primary'>
                                       ✕
                                   </button> */}
            {/* </Table.Cell> */}

        </Table.Row>
    );
};

export default CancelButton ;