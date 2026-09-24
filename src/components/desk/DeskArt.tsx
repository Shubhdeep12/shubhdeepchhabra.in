import type { DeskArtKind } from '@/src/utils/setup';

// Minimal line drawings of each product. Strokes use the theme's ink; fills carry the product's real colour.

function Laptop() {
	return (
		<svg viewBox='0 0 200 120' className='desk-art-svg' aria-hidden='true'>
			<defs>
				<linearGradient id='desk-laptop-screen' x1='0' y1='0' x2='1' y2='1'>
					<stop offset='0' stopColor='var(--art-screen-a)' />
					<stop offset='1' stopColor='var(--art-screen-b)' />
				</linearGradient>
			</defs>
			<rect x='40' y='10' width='120' height='80' rx='6' className='desk-art-fill-sky desk-art-line' />
			<rect x='45' y='15' width='110' height='70' rx='2.5' fill='url(#desk-laptop-screen)' />
			<rect x='94' y='15' width='12' height='3' rx='1.5' className='desk-art-ink' />
			<path d='M26 92 H174 L178 97 Q178 101 174 101 H26 Q22 101 22 97 Z' className='desk-art-fill-sky desk-art-line' />
			<path d='M90 92 Q90 95 93 95 H107 Q110 95 110 92' className='desk-art-line desk-art-thin' fill='none' />
		</svg>
	);
}

function Mouse() {
	return (
		<svg viewBox='0 0 200 120' className='desk-art-svg' aria-hidden='true'>
			<rect x='76' y='14' width='48' height='92' rx='24' className='desk-art-fill-white desk-art-line' />
			<path d='M88 30 Q92 22 100 20' className='desk-art-sheen' fill='none' />
		</svg>
	);
}

// 75% layout, one entry per row, widths in key units (16 units per row).
const KEY_ROWS: number[][] = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
	[1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1],
	[1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25, 1],
	[2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75, 1, 1],
	[1.25, 1.25, 1.25, 6.25, 1, 1, 1, 1, 1, 1],
];

function Keyboard() {
	const unit = 10;
	const gap = 1.4;
	const x0 = 20;
	const y0 = 36;
	const rowH = 9.4;
	return (
		<svg viewBox='0 0 200 120' className='desk-art-svg' aria-hidden='true'>
			<rect x='14' y='30' width='172' height='66' rx='7' className='desk-art-fill-cedar desk-art-line' />
			{KEY_ROWS.map((row, r) => {
				let x = x0;
				return row.map((w, k) => {
					const rect = (
						<rect
							key={`${r}-${k}`}
							x={x + gap / 2}
							y={y0 + r * rowH + gap / 2}
							width={w * unit - gap}
							height={rowH - gap}
							rx='1.6'
							className={r === 0 && k === 0 ? 'desk-art-key desk-art-key--accent' : 'desk-art-key'}
						/>
					);
					x += w * unit;
					return rect;
				});
			})}
			<circle cx='175' cy={y0 + rowH / 2} r='4.2' className='desk-art-knob' />
		</svg>
	);
}

function Monitor() {
	return (
		<svg viewBox='0 0 200 120' className='desk-art-svg' aria-hidden='true'>
			<defs>
				<linearGradient id='desk-monitor-screen' x1='0' y1='0' x2='1' y2='1'>
					<stop offset='0' stopColor='var(--art-screen-a)' />
					<stop offset='1' stopColor='var(--art-screen-b)' />
				</linearGradient>
			</defs>
			<rect x='28' y='8' width='144' height='84' rx='3' className='desk-art-fill-black desk-art-line' />
			<rect x='30.5' y='10.5' width='139' height='76' rx='1.5' fill='url(#desk-monitor-screen)' />
			<rect x='94' y='92' width='12' height='14' className='desk-art-fill-black desk-art-line' />
			<rect x='70' y='105' width='60' height='5' rx='2.5' className='desk-art-fill-black desk-art-line' />
		</svg>
	);
}

const ART: Record<DeskArtKind, () => React.JSX.Element> = {
	laptop: Laptop,
	mouse: Mouse,
	keyboard: Keyboard,
	monitor: Monitor,
};

export default function DeskArt({ kind }: { kind: DeskArtKind }) {
	const Art = ART[kind];
	return <Art />;
}
