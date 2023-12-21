import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { useContext } from "react";
import Chart from "react-apexcharts";
import TransactionContext from "../context/transactions/TransactionContext";


export default function Barchart() {
    const {
        selectedData,
        selectedMonth
    } = useContext(TransactionContext)
    const month = selectedMonth.name ? selectedMonth.name : "Not Selected"
    console.log(selectedData);
    let dataArray = []
    if(selectedData!=null && selectedData.data && selectedData.data.productCnt){
        dataArray = selectedData.data.productCnt
    }

    const chartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Sales",
                data: dataArray,
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "0-100",
                    "101-200",
                    "201-300",
                    "301-400",
                    "401-500",
                    "501-600",
                    "601-700",
                    "701-800",
                    "801-900",
                    "900-above"
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };
    return (
        <Card className="p-4">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none items-center"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Stats of the Month : {month}
                    </Typography>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                {dataArray!=null ?<Chart {...chartConfig} /> : <h1>Nothing to show</h1>}
            </CardBody>
        </Card>
    );
}