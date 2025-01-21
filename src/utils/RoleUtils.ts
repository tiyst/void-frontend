import { replaceString } from './StringUtils.ts';

const roleUrl =
	'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-{role}.png';
export type Role = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOT' | 'UTILITY';

export const getRoleIconUrl = (position: string) => {
	return replaceString(roleUrl, 'role', position.toLowerCase());
};
