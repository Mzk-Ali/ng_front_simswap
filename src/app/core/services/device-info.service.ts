import { Injectable } from "@angular/core";
import { DeviceInfo } from "../models/auth.model";


@Injectable({
    providedIn: 'root',
})
export class DeviceInfoService {
    getDeviceInfo(): DeviceInfo {
        return {
            deviceName: this.getDeviceName(),
            userAgent: navigator.userAgent,
            ipAddress: '0.0.0.0',
        };
    }

    private getDeviceName(): string {
        const userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.includes('windows')) {
            return 'Windows PC';
        } else if (userAgent.includes('mac')) {
            if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
                return userAgent.includes('iphone') ? 'iPhone' : 'iPad';
            }
            return 'Mac';
        } else if (userAgent.includes('linux')) {
            return 'Linux PC';
        } else if (userAgent.includes('android')) {
            return 'Android Device';
        }

        if (userAgent.includes('chrome')) {
            return 'Chrome Browser';
        } else if (userAgent.includes('firefox')) {
            return 'Firefox Browser';
        } else if (userAgent.includes('safari')) {
            return 'Safari Browser';
        } else if (userAgent.includes('edge')) {
            return 'Edge Browser';
        }

        return 'Unknown Device';
    }
}