import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Reliable color mapping - simplified logic
function getStatusColor(r: string) {
  const s = r.toLowerCase();
  if (s.includes('safe')) return '#4ade80';
  if (s.includes('neutral')) return '#38bdf8';
  if (s.includes('risky')) return '#fb923c';
  if (s.includes('spammy')) return '#f87171';
  return '#94a3b8';
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Using shortened params for max reliability
    const score = searchParams.get('s') || '0';
    const username = searchParams.get('u') || 'user';
    const reputation = searchParams.get('r') || 'Unknown';
    const fid = searchParams.get('fid') || '0';

    const color = getStatusColor(reputation);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0e27', // Use solid for zero-latency
            color: 'white',
            padding: '50px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Main Container - Row of 3 boxes */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>

            {/* Box 1: Score */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px',
              height: '350px',
              backgroundColor: '#111827',
              borderRadius: '30px',
              border: '2px solid #00d9ff66',
              margin: '0 15px',
            }}>
              <div style={{ fontSize: '110px', fontWeight: 900 }}>{score}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
                NEYNER SCORE
              </div>
            </div>

            {/* Box 2: User */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px',
              height: '350px',
              backgroundColor: '#111827',
              borderRadius: '30px',
              border: '2px solid #ffffff1a',
              margin: '0 15px',
            }}>
              <div style={{ fontSize: '40px', fontWeight: 800, textAlign: 'center', padding: '0 10px', overflow: 'hidden' }}>
                @{username}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
                USERNAME
              </div>
            </div>

            {/* Box 3: Status */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px',
              height: '350px',
              backgroundColor: '#111827',
              borderRadius: '30px',
              border: `2px solid ${color}`,
              margin: '0 15px',
            }}>
              <div style={{ fontSize: '50px', fontWeight: 900, color: color }}>
                {reputation.toUpperCase()}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
                REPUTATION
              </div>
            </div>

          </div>

          {/* Branded Footer */}
          <div style={{
            marginTop: '50px',
            fontSize: '30px',
            fontWeight: 900,
            letterSpacing: '10px',
            color: '#00d9ff'
          }}>
            TRUESCORE
          </div>

          <div style={{ position: 'absolute', bottom: '30px', right: '40px', opacity: 0.2, fontSize: '16px' }}>
            FID: {fid}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    // If anything fails, return a 1x1 invisible pixel or simple string to avoid the grey box
    return new Response('Image error', { status: 500 });
  }
}
