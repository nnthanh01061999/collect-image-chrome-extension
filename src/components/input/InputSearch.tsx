import { cn } from '@/lib/utils';
import { Assign } from '@/types';
import { Search, X } from 'lucide-react';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputSearchProps
    extends Assign<
        InputHTMLAttributes<HTMLInputElement>,
        {
            onChange: (value: string) => void;
        }
    > {}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
    ({ className, type, value, onChange, ...props }, ref) => {
        const [currentValue, setCurrentValue] = useState<string>(
            value?.toString() || '',
        );

        const onSearch = () => {
            onChange?.(currentValue);
        };

        const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') onSearch();
        };

        const onClear = () => {
            setCurrentValue('');
            onChange?.('');
        };

        const _onChangeCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(e.target.value);
        };

        return (
            <div className='group relative'>
                <input
                    type={type}
                    className={cn(
                        'flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                    )}
                    ref={ref}
                    {...props}
                    value={currentValue}
                    onChange={_onChangeCurrent}
                    onKeyDown={onPressEnter}
                />
                {currentValue && (
                    <div
                        onClick={onClear}
                        className='absolute right-6 top-1/2 hidden h-3 w-3 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background group-hover:flex'
                    >
                        <X className='h-3 w-3' />
                    </div>
                )}
                <Search
                    onClick={onSearch}
                    className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer'
                />
            </div>
        );
    },
);
InputSearch.displayName = 'InputSearch';

export { InputSearch };
