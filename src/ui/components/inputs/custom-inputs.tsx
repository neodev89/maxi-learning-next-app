'use client'

import { Box, SxProps, TextField, TextFieldProps, Theme, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';

type inputsProps = TextFieldProps & FieldValues & {
    control: Control<any>;
    name: string;
    icon?: ReactNode;
    key?: number | string;
    rules?: RegisterOptions;
    sx1?: SxProps<Theme>;
}

export default function CustomInputs({ 
    key, 
    icon, 
    sx1, 
    control, 
    name, 
    rules, 
    ...other 
}: inputsProps) {
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'white',
            borderRadius: 4,
        }}>
            <Controller
                control={control}
                name={name!}
                rules={rules}
                render={({ field, fieldState }) => (
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "none"
                                },
                                "&:hover fieldset": {
                                    border: "none"
                                },
                                "&.Mui-focused fieldset": {
                                    border: "none"
                                }
                            },
                            ...sx1
                        }}
                        {...field}
                        label={other.label}
                        type={other.type}
                        fullWidth={other.fullWidth}
                        value={field.value ?? ""}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                            const { name, value } = e.target;
                            field.onChange(value);
                            other.setValue(name, value)
                        }}
                        placeholder={other.placeholder}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                                sx: {
                                    color: blue[700],
                                    fontWeight: 500,
                                    top: '7px',
                                }
                            }
                        }}
                    />

                )}
            />
            <Typography component={'span'} sx={{ color: 'black' }}>{other.icon}</Typography>

        </Box>
    );
};