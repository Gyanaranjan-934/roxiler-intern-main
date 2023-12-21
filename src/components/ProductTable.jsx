import { useContext } from "react";
import TableComponent from "./TableComponent";
import TransactionContext from "../context/transactions/TransactionContext";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
    const {
        selectedPage,
        numberOfItemsPerPage,
        setSelectedPage,
        setNumberOfItemsPerPage,
        getProductsData,
    } = useContext(TransactionContext);

    const navigate = useNavigate();

    const clickHandler = async (e) => {
        e.preventDefault();
        // console.log(selectedPage, setNumberOfItemsPerPage);
        await getProductsData();
        navigate("/getAllTransactions");
    };

    return (
        <div className="px-16 py-8">
            <TableComponent />
            <div className="flex justify-between p-2 page-footer">
                <div className="">
                    <h2>Page No. : {selectedPage}</h2>
                </div>
                <div className="flex justify-between space-x-3">
                    <div className="">
                        <a
                            className="btn"
                            onClick={(e) => {
                                setSelectedPage(selectedPage - 1);
                                clickHandler(e);
                            }}
                        >
                            Prev
                        </a>
                    </div>
                    <div className="">
                        <a
                            className="btn"
                            onClick={(e) => {
                                setSelectedPage(selectedPage + 1);
                                clickHandler(e);
                            }}
                        >
                            Next
                        </a>
                    </div>
                </div>
                <div className="dropdown dropdown-top dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1"
                    >
                        Per page: {numberOfItemsPerPage}
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-auto items-center"
                    >
                        {[5, 10, 20, 25].map((option) => (
                            <li key={option}>
                                <a
                                    onClick={(e) => {
                                        setNumberOfItemsPerPage(option);
                                        clickHandler(e);
                                    }}
                                >
                                    {option}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
