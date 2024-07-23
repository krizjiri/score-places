import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "axios";

type Place = {
    name: string,
    rating: number
}

const Table = () => {
    const [data, setData] = useState<Place[]>([]);

    useEffect(() => {
        console.log(data)
    }, [data]);

    useEffect( () => {
        const fetchData = async () => {
            const KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;
            const BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby'
            const res = await axios.post(BASE_URL, {
                includedTypes: ["restaurant"],
                maxResultCount: 10,
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: 50.0755,
                            longitude: 14.4378,
                        },
                        radius: 500.0
                    }
                }
            }, {headers: {"X-Goog-Api-Key": KEY, "Content-Type": "application/json", "X-Goog-FieldMask": "*" }})
            const transformedData = res.data.places.map((item: any) => ({
                name: item.displayName.text,
                rating: item.rating
            }))

            setData(transformedData);
        }

        fetchData()

    }, [])


    return (
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.rating}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}

export default Table;
