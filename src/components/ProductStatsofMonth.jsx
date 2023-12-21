import { useContext, useEffect, useState } from "react"
import TransactionContext from "../context/transactions/TransactionContext"

const ProductStatsofMonth = () => {
    const {
        selectedMonth,
        selectedData
    } = useContext(TransactionContext);

    const [data,setData] = useState({
        "allProducts":[],
        "totAmount":0,
        "soldItems":0,
        "unsoldItems":0
    })

    useEffect(() => {
      if (selectedData != null && selectedData.data) {
        setData(selectedData.data);
    }
    }, [selectedData, data])
    
    return (
        <div className="bg-slate-400 p-8 flex flex-col items-center justify-center">
            <div className="bg-white p-10 rounded-xl text-center">
                <h2>Statistics: {selectedMonth.name}</h2>
                <h2>Total Sale: {data.totAmount}</h2>
                <h2>Total Sold items:{data.soldItems}</h2>
                <h2>Total Unsold items: {data.unsoldItems}</h2>
            </div>
        </div>

    )
}

export default ProductStatsofMonth