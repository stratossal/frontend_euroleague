import {
    Table,
    // TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {getTeams} from "@/services/api.teams.ts";


const TeamsListPage = () =>{
    const [teams, setTeams] = useState([])

    useEffect(()=>{
        getTeams()
            .then((data)=>setTeams(data))
        console.log(teams)
    },[])

    return(
        <>
            <div className="p-8">
                <h1 className="text-2xl text-center my-1">Teams</h1>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/*<TableBody>*/}
                    {/*    {invoices.map((invoice) => (*/}
                    {/*        <TableRow key={invoice.invoice}>*/}
                    {/*            <TableCell className="font-medium">{invoice.invoice}</TableCell>*/}
                    {/*            <TableCell>{invoice.paymentStatus}</TableCell>*/}
                    {/*            <TableCell>{invoice.paymentMethod}</TableCell>*/}
                    {/*            <TableCell className="text-right">{invoice.totalAmount}</TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    ))}*/}
                    {/*</TableBody>*/}
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}
export default TeamsListPage;