import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formTypeProps } from '@/@types/formTypes';

export const formSign: formTypeProps[] = [
    { 
        id: 'name-skill', 
        type: "text",
        placeholder: 'Name skill', 
        icon: undefined 
    },
    { 
        id: 'name-company',
        type: "text",
        placeholder: 'Name company', 
        icon: undefined 
    },
    { 
        id: 'date-start', 
        type: "date",
        placeholder: 'data d\'inizio', 
        icon: <CalendarMonthIcon /> 
    },
    { 
        id: 'date-end', 
        type: "date",
        placeholder: 'data di fine', 
        icon: <CalendarMonthIcon /> 
    },
    { 
        id: 'description-skill', 
        type: "text",
        placeholder: 'descrizione competenza', 
        icon: <PhoneIcon /> 
    },
];