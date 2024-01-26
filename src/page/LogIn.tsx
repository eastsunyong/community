import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import * as z from "zod"
import CustomForm from '@/components/login/CustomInput';

const LogIn = () => {
    const { register, watch } = useForm();
    // 정규식 적는곳
    const formSchema = z.object({
        email: z.string().email({ message: "이메일의 형태가 아닙니다" }),
        password: z.string().min(10, { message: '비밀번호는 영문/숫자/특수문자 조합으로 10~18자리 입니다.' })
            .max(18, { message: '비밀번호는 영문/숫자/특수문자 조합으로 10~18자리 입니다.' })
    })
    // 이건 잘 모르겠음
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 이것만 나중에 따로 빼면될듯
    function onSubmit(ref: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(ref)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CustomForm control={form.control} name='이메일' id='email' type='none' placeholder='이메일을 입력해주세요' />
                    <CustomForm control={form.control} name='비밀번호' id='password' type='password' placeholder='비밀번호를 입력해주세요' />
                    <Button className='bg-blue' size={'lg'} type="submit">로그인</Button>
                </form>
            </Form>
        </>
    )
}

export default LogIn