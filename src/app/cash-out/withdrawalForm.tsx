'use client';

import Button from '@/components/commons/buttons/button';
import { Container } from '@/components/commons/containers';
import { DefaultInput } from '@/components/commons/inputs';
import InputSelect from '@/components/commons/inputs/select';
import { banks } from '@/store/lists/banks';
import { countries } from '@/store/lists/countries';
import { useState } from 'react';
import { dataUserBankEnum } from '@/app/cash-out/types';
import { initialOptPageEnum } from '@/store/lists/optPage';
import { sendRequest } from '@/app/cash-out/requests';
import Link from 'next/link';
import { useAppContext } from '@/store/appContext';
import { initialStateTypes, userAccountEnum } from '@/store/appContext/types';

const WithdrawalForm = () => {
    const { stateUserAccount: [user, setUser] } = useAppContext() as initialStateTypes;

    console.log('user', user);


    const [formData, setFormData] = useState({ ...dataUserBankEnum, fullName: user.name });
    const [errors, setErrors] = useState<Record<string, string>>({});


    const [optPage, setOptPage] = useState(initialOptPageEnum);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.id.trim()) newErrors.id = 'ID is required';
        if (!formData.bank.trim()) newErrors.bank = 'Bank is required';
        if (!formData.bankAccount.trim()) newErrors.bankAccount = 'Account number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.swiftCode.trim()) newErrors.swiftCode = 'SWIFT code is required';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await sendRequest({ ...formData, credits: user.score }, setOptPage);

    };

    function resetSession() {
        setUser(userAccountEnum)
        localStorage.clear()
        console.log('resetSession');
    }

    if (optPage.status === 200 && optPage.isLoading === false) {
        return (
            <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Success</h1>
                <p className="text-center my-10">Your withdrawal request has been successfully submitted.</p>
                <Link onClick={resetSession} href='/'> <Button text="Play again" /></Link>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Withdraw Money</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <DefaultInput
                    value={formData.fullName}
                    onChange={handleChange}
                    errMsg={errors.fullName}
                    label="Full Name"
                    name="fullName"
                    id="fullName"
                    type="text"
                />

                <DefaultInput
                    value={formData.id}
                    onChange={handleChange}
                    errMsg={errors.id}
                    label="ID (Passport/National ID)"
                    name="id"
                    id="id"
                    type="text"
                />

                <InputSelect
                    value={formData.bank}
                    onChange={handleChange}
                    errMsg={errors.bank}
                    label="Bank"
                    name="bank"
                    id="bank"
                    options={banks}
                />
                <DefaultInput
                    value={formData.bankAccount}
                    onChange={handleChange}
                    errMsg={errors.bankAccount}
                    label="Bank Account Number"
                    name="bankAccount"
                    id="bankAccount"
                    type="text"
                />
                <InputSelect

                    value={formData.country}
                    onChange={handleChange}
                    errMsg={errors.country}
                    label="Country"
                    name="country"
                    id="country"
                    options={countries}
                />
                <DefaultInput
                    value={formData.swiftCode}
                    onChange={handleChange}
                    errMsg={errors.swiftCode}
                    label="SWIFT/BIC Code"
                    placeholder='AAAA BB CC DDD'
                    name="swiftCode"
                    id="swiftCode"
                    type="text"
                />

                <DefaultInput
                    value={String(user.score)}
                    readOnly
                    label="Total Credits"
                    placeholder='Total Credits'
                    name="total"
                    id="total"
                    type="text"
                />

                <Container className='mt-10'>
                    <Button disabled={optPage.isLoading} style={{

                        opacity: optPage.isLoading ? 0.5 : 1,
                    }} type='submit' primary text={optPage.isLoading ? 'Processing...' : 'Withdraw Money'} />
                </Container>
            </form>
        </div>
    );
};

export default WithdrawalForm;