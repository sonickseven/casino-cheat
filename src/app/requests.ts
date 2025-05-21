import { userAccountEnum } from "@/store/appContext/types";

export async function sendGameTrack(data: typeof userAccountEnum) {
    try {
        const response = await fetch('/api/v1/track-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Error connecting to the server');
        return true
    } catch (error) {
        console.error('Error connecting to the server:', error);
        alert('Error connecting to the server');
        return false
    } 
}