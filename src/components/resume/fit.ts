/** Design width of the resume sheet in CSS px. The sheet never reflows; narrower screens zoom it down to fit. */
export const RESUME_SHEET_WIDTH = 1120;

const fitExpression = (el: string) =>
	`${el}.style.setProperty('--resume-zoom',String(Math.min(1,${el}.clientWidth/${RESUME_SHEET_WIDTH})))`;

/**
 * Runs inline right after the canvas in the server HTML so the first paint is already fitted;
 * ResumeCanvas takes over after hydration and on resize.
 */
export const fitScript = `(function(){var c=document.currentScript.previousElementSibling;if(c)${fitExpression('c')}})()`;
