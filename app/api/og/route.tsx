import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const s = searchParams.get('s') || '0';
  const u = searchParams.get('u') || 'user';
  const r = (searchParams.get('r') || 'Unknown').toUpperCase();
  const f = searchParams.get('fid') || '0';

  let color = '#94a3b8';
  if (r.includes('SAFE')) color = '#22c55e';
  if (r.includes('NEUTRAL')) color = '#0ea5e9';
  if (r.includes('RISKY')) color = '#f97316';
  if (r.includes('SPAMMY')) color = '#ef4444';

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
          backgroundColor: '#0a0e27',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: '32px', fontWeight: 900, color: '#00d9ff', marginBottom: '40px', letterSpacing: '8px' }}>
          TRUESCORE
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '340px',
            backgroundColor: '#111827',
            borderRadius: '24px',
            border: '2px solid rgba(0, 217, 255, 0.4)',
            margin: '0 10px',
          }}>
            <div style={{ fontSize: '110px', fontWeight: 900 }}>{s}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '10px' }}>NEYNER SCORE</div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '340px',
            backgroundColor: '#111827',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            margin: '0 10px',
          }}>
            <div style={{ fontSize: '40px', fontWeight: 800, textAlign: 'center', padding: '0 20px', overflow: 'hidden' }}>@{u}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '10px' }}>USERNAME</div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '340px',
            backgroundColor: '#111827',
            borderRadius: '24px',
            border: `2px solid ${color}`,
            margin: '0 10px',
          }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: color, textAlign: 'center' }}>{r}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '10px' }}>REPUTATION</div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '30px', opacity: 0.3, fontSize: '14px', display: 'flex' }}>
          FID: {f} • Powered by Neynar
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
