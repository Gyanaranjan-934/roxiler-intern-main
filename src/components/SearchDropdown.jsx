import axios from "axios"
import { useContext } from "react"
import TransactionContext from "../context/transactions/TransactionContext.jsx"
import { useNavigate } from "react-router-dom"

const SearchDropdown = () => {
    const months = [
        {
            "name": "January",
            "id": 1
        },
        {
            "name": "February",
            "id": "2"
        },
        {
            "name": "March",
            "id": "3"
        },
        {
            "name": "April",
            "id": "4"
        },
        {
            "name": "May",
            "id": "5"
        },
        {
            "name": "June",
            "id": "6"
        },
        {
            "name": "July",
            "id": "7"
        },
        {
            "name": "August",
            "id": "8"
        },
        {
            "name": "September",
            "id": "9"
        },
        {
            "name": "October",
            "id": "10"
        },
        {
            "name": "November",
            "id": "11"
        },
        {
            "name": "December",
            "id": "12"
        }
    ]
    const navigate = useNavigate();
    const {
        searchQuery,
        setSearchQuery,
        selectedMonth,
        setSelectedMonth,
        setSelectedData,
        getProductsData,
        setSelectedPage,
        setNumberOfItemsPerPage,
    } = useContext(TransactionContext)
    // console.log(searchQuery);
    const getAllTransactions = async (event) => {
        event.preventDefault();
        setSelectedPage(1);
        setNumberOfItemsPerPage(10);
        await getProductsData();
        navigate("/getAllTransactions");
    }
    const getPricerangeStats = async (e) => {
        e.preventDefault();
        const data = await axios.get("http://localhost:8000/api/v1/get-products-in-range", {
            params: {
                "month": selectedMonth.id
            }
        })
        setSelectedData(data);
        navigate("/get-barchart")
    }
    const getTransactionsStats = async (e) => {
        e.preventDefault();
        const data = await axios.get("http://localhost:8000/api/v1/get-statistics",{
            params: { 
                "month": selectedMonth.id
            }
        })
        setSelectedData(data);
        navigate("/get-product-stats")
    }
    return (
        <>
            <div className="">
                <div className="items-center p-12 bg-slate-50">
                    <h1 className="text-4xl text-center font-bold">Transaction Dashboard</h1>
                </div>

                <div className=" searchContainer flex justify-center space-x-60 px-28 py-4">

                    <input onChange={(event) => setSearchQuery(event.target.value)} value={searchQuery} type="text" placeholder="Search transaction" className="input input-bordered w-full rounded-full max-w-xs" />
                    {/* </div> */}
                    <div className="month-drop-down">
                        <details className="dropdown">
                            <summary className="m-1 btn">Select Month</summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
                                {months.map((month) => (
                                    <li key={month.id}>
                                        <a href="#" onClick={() => setSelectedMonth(month)}>
                                            {month.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </details>

                    </div>
                </div>

                <div className="p-3 flex justify-center space-x-20 px-32">
                    <a onClick={getAllTransactions} className="btn">Get Products</a>
                    <a onClick={getPricerangeStats} className="btn">Stats Graph</a>
                    <a onClick={getTransactionsStats} className="btn">Stats of Month</a>
                </div>


            </div>
        </>
    )
}

export default SearchDropdown