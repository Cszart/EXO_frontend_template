/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import styles from './icon.module.scss';

export interface IconProps {
	src: string;
	className?: string;
	pointer?: boolean;

	// Normal fill
	fillPath?: boolean;
	fillLine?: boolean;
	fillCircle?: boolean;
	fillRect?: boolean;

	// Fill Gray
	fillGray?: boolean;
	fillGrayCircle?: boolean;
	fillGrayPath?: boolean;
	fillGrayLine?: boolean;

	// Fill white
	fillWhitePath?: boolean;
	fillWhiteRect?: boolean;
	fillWhiteCircle?: boolean;
	fillWhiteLine?: boolean;
	fillWhitePathStroke?: boolean;

	// Fill drak gray
	fillDarkGrayPath?: boolean;
	fillDarkGrayRect?: boolean;
	fillDarkGrayCircle?: boolean;
	fillDarkGrayLine?: boolean;

	// Fill primary
	fillPrimary?: boolean;
	fillPrimaryCircle?: boolean;
	fillPrimaryLine?: boolean;
	fillPrimaryPath?: boolean;

	// Fill social media
	fillBlueFacebookPath?: boolean;
	fillBlueLinkedinPath?: boolean;
	fillBlueTwitterPath?: boolean;
	fillGreenWhatsappPath?: boolean;

	onClick?: (e?: any) => void;
}

export const Icon: React.FC<IconProps> = ({
	src,
	className,
	pointer = false,

	// Normal fill
	fillPath = false,
	fillLine = false,
	fillRect = false,
	fillCircle = false,

	// Fill Gray
	fillGray = false,
	fillGrayCircle = false,
	fillGrayPath = false,
	fillGrayLine = false,

	// Fill white
	fillWhitePath = false,
	fillWhiteRect = false,
	fillWhiteCircle = false,
	fillWhiteLine = false,
	fillWhitePathStroke = false,

	// Fill drak gray
	fillDarkGrayPath = false,
	fillDarkGrayRect = false,
	fillDarkGrayCircle = false,
	fillDarkGrayLine = false,

	// Fill primary
	fillPrimary = false,
	fillPrimaryCircle = false,
	fillPrimaryLine = false,
	fillPrimaryPath = false,

	// Fill social media
	fillBlueFacebookPath = false,
	fillBlueLinkedinPath = false,
	fillBlueTwitterPath = false,
	fillGreenWhatsappPath = false,

	onClick,
}) => {
	return (
		// eslint-disable-next-line
		// @ts-ignore
		<SVG
			onClick={onClick}
			src={src}
			className={clsx(
				'w-full h-full',
				className,
				{ 'cursor-pointer': pointer },
				// Normal fill
				[fillPath && styles.svgFillPath],
				[fillCircle && styles.svgFillCircle],
				[fillLine && styles.svgFillLine],
				[fillRect && styles.svgFillRectfillRect],

				// Fill Gray
				[fillGray && styles.svgFillGray],
				[fillGrayCircle && styles.svgFillGrayCircle],
				[fillGrayPath && styles.svgFillGrayPath],
				[fillGrayLine && styles.svgFillGrayLine],

				// Fill white
				[fillWhitePath && styles.svgFillWhitePath],
				[fillWhiteRect && styles.svgFillWhiteRect],
				[fillWhiteCircle && styles.svgFillWhiteCircle],
				[fillWhiteLine && styles.svgFillWhiteLine],
				[fillWhitePathStroke && styles.svgFillWhitePathStroke],

				// Fill dark gray
				[fillDarkGrayPath && styles.svgFillDarkGrayPath],
				[fillDarkGrayRect && styles.svgFillDarkGrayRect],
				[fillDarkGrayCircle && styles.svgFillDarkGrayCircle],
				[fillDarkGrayLine && styles.svgFillDarkGrayLine],

				// Fill primary
				[fillPrimary && styles.svgFillPrimary],
				[fillPrimaryCircle && styles.svgFillPrimaryCircle],
				[fillPrimaryLine && styles.svgFillPrimaryLine],
				[fillPrimaryPath && styles.svgFillPrimaryPath],

				// Fill social media
				[fillBlueFacebookPath && styles.svgFillBlueFacebookPath],
				[fillBlueLinkedinPath && styles.svgFillBlueLinkedinPath],
				[fillBlueTwitterPath && styles.svgFillBlueTwitterPath],
				[fillGreenWhatsappPath && styles.svgFillGreenWhatsappPath]
			)}
		/>
	);
};
