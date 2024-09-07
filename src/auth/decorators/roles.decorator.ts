import { SetMetadata } from "@nestjs/common"
import { Role } from "../enums/role.enum"


// Custom Roles Decorator
export const ROLES_KEY = "roles"
export const Roles = (...roles : Role[]) => SetMetadata(ROLES_KEY , roles)


// Roles is a custom decorator that marks routes with metadata about what roles can access them.
// It uses SetMetadata() to attach the required roles to the route, which are stored under the ROLES_KEY key.


// role-based access control (RBAC)