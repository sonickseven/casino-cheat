import { dataUserBankEnum } from "@/app/cash-out/types";
import { initialOptPageEnum } from "@/store/lists/optPage";
import { Dispatch, SetStateAction } from "react";

export async function sendRequest(data: (typeof dataUserBankEnum) & {credits: number}, setOptPage: Dispatch<SetStateAction<typeof initialOptPageEnum>>) {
    setOptPage(old => ({ ...old, isLoading: true }));

    try {
        const response = await fetch('/api/v1/cash-out', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Withdrawal failed');

        setOptPage(old => ({ ...old, err: false, status: 200 }));

        // Redirect to success page or show success message
        //   router.push('/withdrawal/success');
    } catch (error) {
        console.error('Withdrawal error:', error);
        alert('Withdrawal failed. Please try again.');
    } finally {
        setOptPage(old => ({ ...old, isLoading: false }));
    }
}