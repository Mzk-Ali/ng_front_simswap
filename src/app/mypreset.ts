import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                primary: {
                    color: '#ff9da0',
                    hoverColor: '#ff8a8c',
                    activeColor: '#ff6f70',
                    inverseColor: '#ffffff'
                },
            },
            dark: {
                primary: {
                    color: '#ff6f70',
                    hoverColor: '#ff9a9b',
                    activeColor: '#ffcfd1',
                    inverseColor: '#000000'
                },
            }
        }
    }
});

export default MyPreset;
