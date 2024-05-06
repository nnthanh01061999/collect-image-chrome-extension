import { TDir } from '@/types';

export const sortData = <T>(data: T[], dir: TDir, ...keys: (keyof T)[]) => {
    return data.sort((a, b) => {
        // Compute composite values for comparison
        const compositeValueA = keys.reduce((acc, key) => {
            return acc * Number(a[key]);
        }, 1);

        const compositeValueB = keys.reduce((acc, key) => {
            return acc * Number(b[key]);
        }, 1);

        let comparison = 0;

        if (!compositeValueA || !compositeValueB) return comparison;

        switch (dir) {
            case 'asc':
                if (compositeValueA < compositeValueB) {
                    comparison = -1;
                }
                if (compositeValueA > compositeValueB) {
                    comparison = 1;
                }
                break;

            default:
                if (compositeValueA > compositeValueB) {
                    comparison = -1;
                }
                if (compositeValueA < compositeValueB) {
                    comparison = 1;
                }
                break;
        }

        return comparison;
    });
};
