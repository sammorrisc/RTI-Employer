import { MatDateFormats } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD MMM YYYY', // You can define parsing format here if needed
    },
    display: {
        dateInput: 'DD MMM YYYY', // Display format in input field
        monthYearLabel: 'MMM YYYY', // Format for month-year label
        dateA11yLabel: 'LL', // Accessibility label
        monthYearA11yLabel: 'MMMM YYYY', // Accessibility for month-year label
    }
};
