import { useState } from "react"
import TransactionContext from "./TransactionContext.jsx"
import axios from "axios"

const TransactionState = (props) => {
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [searchQuery,setSearchQuery] = useState("")
    const [selectedData,setSelectedData] = useState(null)
    const [selectedPage,setSelectedPage] = useState(1)
    const [numberOfItemsPerPage,setNumberOfItemsPerPage] = useState(10);

    const getProductsData = async () => {
        console.log(selectedMonth,searchQuery,selectedPage,numberOfItemsPerPage);
        const data = await axios.get("http://localhost:8000/api/v1/get-transactions", {
            params: {
                "month": selectedMonth.id,
                "searchName": searchQuery,
                "pageNumber":selectedPage,
                "itemsPerPage":numberOfItemsPerPage
            }
        })
        setSelectedData(data);
    }
    return(
        <TransactionContext.Provider value={{
            searchQuery,
            setSearchQuery,
            selectedMonth,
            setSelectedMonth,
            selectedData,
            setSelectedData,
            selectedPage,
            setSelectedPage,
            numberOfItemsPerPage,
            setNumberOfItemsPerPage,
            getProductsData
        }}>
            {/* eslint-disable-next-line */}
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionState