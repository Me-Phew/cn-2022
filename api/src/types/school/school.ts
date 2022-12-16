export const status = ['pending', 'rejected', 'verified'] as const;
export type SchoolStatus = typeof status[number];