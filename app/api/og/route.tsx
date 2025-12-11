import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid');

    let score = '0';
    let username = 'user';

    if (fid) {
        try {
            const res = await fetch(
                `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
                {
                    headers: {
                        accept: 'application/json',
                        'x-api-key': process.env.NEYNAR_API_KEY || '',
                    },
                }
            );

            const data = await res.json();
            const user = data.users?.[0];

            if (user) {
                const raw = user.experimental?.neynar_user_score || 0;
                score = String(Math.round(raw * 100));
                username = user.username || 'user';
            }
        } catch (e) {
            console.error(e);
        }
    }

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                }}
            >
                <div>{score}</div>
                <div style={{ fontSize: 48 }}>@{username}</div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
