import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { SliderRange } from '@/components/ui/slider';
import { PropsWithChildren, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TAdvancedFilterProps = {
    height?: number[];
    width?: number[];
    setHeight: (value?: number[]) => void;
    setWidth: (value?: number[]) => void;
};

const schema = z.object({
    width: z.array(z.number()),
    height: z.array(z.number()),
});

type FormValues = z.infer<typeof schema>;

function AdvancedFilter({
    children,
    ...props
}: PropsWithChildren<TAdvancedFilterProps>) {
    const { height = [0, 0], width = [0, 0], setHeight, setWidth } = props;

    const form = useForm({
        defaultValues: {
            height: [0, 3000],
            width: [0, 3000],
        },
        resolver: zodResolver(schema),
    });

    const { reset, handleSubmit, control } = form;

    const onClear = () => {
        setHeight(undefined);
        setWidth(undefined);
        reset();
    };

    const onSubmit = (values: FormValues) => {
        setWidth(values.width[1] > 0 ? values.width : undefined);
        setHeight(values.height[1] > 0 ? values.height : undefined);
    };

    useEffect(() => {
        if (height && width) reset({ height, width });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(height), reset, JSON.stringify(width)]);

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className='h-auto w-[320px]' alignOffset={-2}>
                <Form {...form}>
                    <form
                        className='grid gap-2'
                        onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
                    >
                        <FormField
                            control={control}
                            name='width'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm'>{`Width(${field.value[0]}px - ${field.value[1]}px)`}</FormLabel>
                                    <FormControl>
                                        <SliderRange
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            min={0}
                                            max={3000}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name='height'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm'>{`Height(${field.value[0]}px - ${field.value[1]}px)`}</FormLabel>
                                    <FormControl>
                                        <SliderRange
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            min={0}
                                            max={3000}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-2 gap-2'>
                            <Button size='sm' type='button' onClick={onClear}>
                                {chrome.i18n.getMessage('clear')}
                            </Button>
                            <Button size='sm' type='submit'>
                                {chrome.i18n.getMessage('apply')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}

export default AdvancedFilter;
