import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";



// Guards are used to implement authorization logic in NestJS. Here, RolesGuard checks if a user is allowed to access a route based on their role.
@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(private reflector : Reflector){}

    canActivate(context: ExecutionContext): boolean {

        // reflector.getAllAndOverride(): The Reflector service is used to retrieve metadata (i.e., the roles) attached to the route handler or class.
        // It first checks if roles are defined at the route level (context.getHandler()) and then checks at the controller level (context.getClass()).
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY , [
            context.getHandler() ,
            context.getClass()
        ])

        if(!requiredRoles) return true  // If no roles are defined (!requiredRoles), the guard allows access (return true) , that means this route or contoller not required any specific roles to access it.

        const request = context.switchToHttp().getRequest() // get the request object from the context 

        const user = request.user // request.user: The authenticated user object is extracted from the request.

        return matchRoles(requiredRoles , user?.role) // The function checks if the user has one of the required roles to access this route using the helper function matchRoles()
    }

}



// This function checks if the user's role matches any of the required roles for the route.
function matchRoles(requiredRoles : string[] , userRole : string){
    return requiredRoles.some((role : string) => userRole.includes(role))
}