import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    createTheme,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface ITransactionProps {
    datetime: Dayjs;
    amount: string;
    post: string;
    revenue: number;
    price: number;
}

const theme = createTheme({
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white',
                    border: '1px solid #0000006b',
                    borderRadius: '10px',
                    '&:hover': {
                        border: '1px solid #0000006b',
                    },
                    '&.Mui-focused': {
                        border: '1px solid #3f51b5',
                    },

                    '&:before': {
                        borderBottom: '0px !important',
                    },
                    '&:hover:before': {
                        borderBottom: '0px !important',
                    },
                    '&:after': {
                        borderBottom: '0px',
                    },
                },
            },
        },
    },
});

function App() {
    const [transaction, setTransaction] = useState<ITransactionProps>({
        datetime: dayjs(),
        amount: '',
        post: '',
        revenue: 0,
        price: 0,
    });

    const handleNumberInputChange = (field: keyof ITransactionProps, value: string) => {
        const numberValue = parseFloat(value);

        if (value === '' || !isNaN(numberValue)) {
            setTransaction((prevTransaction) => ({
                ...prevTransaction,
                [field]: value === '' ? 0 : numberValue,
            }));
        }
    };

    const handleUpdate = () => {
        if (transaction.amount == '' || transaction.post == '' || transaction.revenue <= 0 || transaction.price <= 0) {
            toast.error('Please fill in the blank input field.');
        } else {
            console.log("transac", transaction)
            toast.success('Add successfully!');
            setTransaction({
                datetime: dayjs(),
                amount: '',
                post: '',
                revenue: 0,
                price: 0,
            });
        }
    };

    return (
        <div className="mx-40">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="static"
                    sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0 18px 6px -1px rgba(0, 0, 0, 0.03)' }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                '&:hover': {
                                    borderRadius: '3px',
                                },
                            }}
                        >
                            <ArrowBack sx={{ fontSize: '16px' }} /> <span className="ml-1 text-[14px]">Đóng</span>
                        </IconButton>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{ textTransform: 'none', bgcolor: '#2970ff', borderRadius: '10px' }}
                        >
                            Cập nhật
                        </Button>
                    </Toolbar>
                    <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, alignSelf: 'flex-start', fontWeight: '600', paddingBottom: '15px' }}
                    >
                        Nhập giao dịch
                    </Typography>
                </AppBar>
            </Box>

            <ThemeProvider theme={theme}>
                <div style={{ padding: 16 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Thời gian"
                            value={transaction.datetime}
                            onChange={(newValue: Dayjs | null) =>
                                setTransaction((prevTransaction: ITransactionProps) => ({
                                    ...prevTransaction,
                                    datetime: newValue || dayjs(),
                                }))
                            }
                            slotProps={{
                                textField: {
                                    variant: 'filled',
                                    fullWidth: true,
                                    margin: 'dense',
                                },
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Số lượng"
                        value={transaction.amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*\.?\d*$/;
                            if (regex.test(value) || value === '') {
                                setTransaction((prevTransaction) => ({
                                    ...prevTransaction,
                                    amount: value,
                                }));
                            }
                        }}
                        variant="filled"
                        fullWidth
                        margin="dense"
                    />
                    <FormControl variant="filled" fullWidth margin="dense">
                        <InputLabel id="demo-simple-select-filled-label">Trụ</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={transaction.post}
                            onChange={(e) =>
                                setTransaction((prevTransaction) => ({ ...prevTransaction, post: e.target.value }))
                            }
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Doanh thu"
                        fullWidth
                        variant="filled"
                        margin="dense"
                        value={transaction.revenue}
                        onChange={(e) => handleNumberInputChange('revenue', e.target.value)}
                    />
                    <TextField
                        label="Đơn giá"
                        fullWidth
                        variant="filled"
                        margin="dense"
                        value={transaction.price}
                        onChange={(e) => handleNumberInputChange('price', e.target.value)}
                    />
                </div>
            </ThemeProvider>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            />
        </div>
    );
}

export default App;
