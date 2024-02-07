import { TDir } from '../types';

export const sortData = <T>(data: T[], dir: TDir, ...keys: (keyof T)[]) => {
    return data.sort((a, b) => {
        for (const key of keys) {
            let comparison = 0; // Initialize comparison variable

            switch (dir) {
                case 'asc':
                    if (a[key] < b[key]) {
                        comparison = -1;
                    } else if (a[key] > b[key]) {
                        comparison = 1;
                    }
                    break;

                default:
                    if (a[key] > b[key]) {
                        comparison = -1;
                    } else if (a[key] < b[key]) {
                        comparison = 1;
                    }
                    break;
            }

            if (comparison !== 0) {
                // If comparison is not 0, we have a definitive result
                return comparison;
            }
        }

        // If we reach this point, all keys are equal
        return 0;
    });
};
