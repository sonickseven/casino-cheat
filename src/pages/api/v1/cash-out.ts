import { isEnabledCheat } from '@/helpers/cheatsFunctions/reviewCredits';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    if(req.body.credits > 40 && isEnabledCheat(0.5)) {
        res.status(501).json({ error: 'Withdrawal failed. Please try again XD' });
        return;
        
    }

    res.statusCode = 200;
    res.json({ msg: 'your money was sent to your account successful' });
}
