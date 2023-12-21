import { useContext, useEffect, useState } from 'react';
import TransactionContext from '../context/transactions/TransactionContext';

const TableComponent = () => {
    const { selectedData } = useContext(TransactionContext);
    const [table, setTable] = useState([]);

    useEffect(() => {
        // console.log(selectedData);
        if (selectedData != null && selectedData.data && selectedData.data.results) {
            setTable(selectedData.data.results);
            // console.log(table);
        }
    }, [selectedData, table]); // Use selectedData in the dependency array instead of table

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {table.map((row) => (
                        <tr key={row.id}>
                            <th>{row.id}</th>
                            <td>{row.title}</td>
                            <td>{row.description}</td>
                            <td>{row.price}</td>
                            <td>{row.category}</td>
                            <td>{row.sold ? "Sold" : "Unsold"}</td>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={row.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
