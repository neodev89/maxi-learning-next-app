import CustomInputs from "../../inputs/custom-inputs";

import { skillsInstanceType } from "@/zod/skillsInstance";
import { Box, Stack } from "@mui/material";
import { Control, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

interface pageSkillsProps {
    id: string;
    skill: skillsInstanceType;
    control: Control<skillsInstanceType>;
    classNameContainer: string;
    classNameSubCont: string;
    classNameForm: string;
    setValue: UseFormSetValue<skillsInstanceType>;
    handleSubmit?: UseFormHandleSubmit<skillsInstanceType>;
    handleSubmitForm?: () => Promise<void>;
}

export const PageSkills = ({
    id,
    skill,
    control,
    classNameContainer,
    classNameSubCont,
    classNameForm,
    setValue,
}: pageSkillsProps) => {
    const arraySkills = Object.entries(skill).map(el => el);
    return (
        <Box id={id} className={classNameContainer}>
            <Box component={'form'} className={classNameForm}>
                <Stack
                    spacing={1}
                    className={classNameSubCont}
                >
                    {
                        arraySkills.map((item, idx) => {
                            return (
                                <CustomInputs
                                    key={idx}
                                    name={item[idx]}
                                    control={control}
                                    setValue={setValue}
                                />
                            );
                        })
                    }
                </Stack>
            </Box>
        </Box>
    )
}