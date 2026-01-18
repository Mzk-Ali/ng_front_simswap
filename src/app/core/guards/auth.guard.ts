import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    const returnUrl = state.url;

    router.navigate(['/login'], {
        queryParams: { returnUrl },
    });

    return false;
}

export const publicGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        router.navigate(['/']);
        return false;
    }

    return true;
};

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const currentUser = authService['currentUserSubject'].value;

        if (!currentUser?.role || !allowedRoles.includes(currentUser.role)) {
            router.navigate(['/unauthorized']);
            return false;
        }

        return true;
    };
};