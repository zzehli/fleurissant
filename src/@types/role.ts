export const RoleObject = {
    ADMIN: 'admin',
    CUSTOMER: 'customer'
} as const;

export type Role = typeof RoleObject[keyof typeof RoleObject];