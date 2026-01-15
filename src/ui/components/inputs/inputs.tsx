import { Box, SxProps, TextField, TextFieldProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Controller, FieldValues } from 'react-hook-form';

type inputsProps = TextFieldProps & FieldValues & {
    key: number | string;
    icon: ReactNode;
    sx1?: SxProps<Theme>;
}

export default function Inputs({ key, icon, sx1, ...other }: inputsProps) {
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
                control={other.control}
                name={other.name!}
                rules={other.rules}
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
                                shrink: other.type === "date" ? true : undefined
                            }
                        }}
                    />

                )}
            />
            <Typography component={'span'} sx={{ color: 'black' }}>{other.icon}</Typography>

        </Box>
    );
};