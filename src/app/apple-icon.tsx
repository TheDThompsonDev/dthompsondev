import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 180,
    height: 180,
};

export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#153230',
                    borderRadius: '24px', // Increased radius for larger icon
                }}
            >
                <div
                    style={{
                        fontSize: '96px', // Scaled up from 18px (roughly 5.3x)
                        fontWeight: 900,
                        color: 'white',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        letterSpacing: '-2px',
                    }}
                >
                    DTD
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
