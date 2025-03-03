import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_KEY = 'anonymous';
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);