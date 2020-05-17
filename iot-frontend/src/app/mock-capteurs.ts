import { Capteur } from './capteurs';

export const capteurs: Capteur[] = [
    {
        type: "Microphone", ip: "", text: {
            danger: "Alerte un bruit virulant a été detecté",
            warning: "Un léger bruit a été detecté",
            success: "Votre maison est calme, aucun bruit detecté",
        },
        src: {
            danger: "../../assets/noise.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        }
    },
    {
        type: "Capteur senseur", ip: "", text: {
            danger: "Alerte un gaz a été détecté",
            warning: "Niveau de gaz inquiétant",
            success: "Tout va bien, aucun gaz detecté",
        },
        src: {
            danger: "../../assets/death.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        }
    },
];