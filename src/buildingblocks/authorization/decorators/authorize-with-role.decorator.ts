import { SetMetadata } from '@nestjs/common';

export const AUTHORIZE_WITH_ROLE_KEY = 'authorizeWithRole';
export const AuthWithRole = (role: string[]) => SetMetadata(AUTHORIZE_WITH_ROLE_KEY, role);