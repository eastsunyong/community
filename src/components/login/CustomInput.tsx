import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface IProps {
    control: any;
    name: string;
    id: string;
    type: string;
    placeholder: string;
}

const CustomInput = ({ control, name, id, type, placeholder }: IProps) => {
    return (
        <>
            <FormField
                control={control}
                name={id}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{name}</FormLabel>
                        <FormControl>
                            <Input type={type} placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage className='text-error' />
                    </FormItem>
                )}
            />
        </>
    )
}

export default CustomInput
