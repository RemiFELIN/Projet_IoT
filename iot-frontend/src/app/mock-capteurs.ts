import { Capteur } from './capteurs';

export const capteurs: Capteur[] = [
    {
        type: "Microphone", text: {
            danger: "Alerte un bruit virulant a été detecté",
            warning: "Un léger bruit a été detecté",
            success: "Votre maison est calme, aucun bruit detecté",
        },
        src: {
            danger: "../../assets/noise.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        },
        seuil: 100,
    },
    {
        type: "Capteur senseur", text: {
            danger: "Alerte un gaz a été détecté",
            warning: "Niveau de gaz inquiétant",
            success: "Tout va bien, aucun gaz detecté",
        },
        src: {
            danger: "../../assets/death.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        },
        seuil: 1,
    },
    {
        type: "Capteur mouvement", text: {
            danger: "Alerte un mouvement a été détecté",
            warning: "",
            success: "Rien a signaler, aucun mouvement detecté",
        },
        src: {
            danger: "../../assets/thief.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        },
        seuil: 1,
    },
    {
        type: "Capteur thermique", text: {
            danger: "Il fait anormalement chaud chez vous !",
            warning: "Tempareture elevé",
            success: "La température chez vous n'est pas trop elevé",
        },
        src: {
            danger: "../../assets/hot.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        },
        seuil: 50,

    },
    {
        type: "Capteur lumiere", text: {
            danger: "Attention la lumière est allumé chez vous",
            warning: "De la lumière a été detecté",
            success: "Aucune lumière detecté",
        },
        src: {
            danger: "../../assets/light.svg",
            warning: "../../assets/warning.svg",
            success: "../../assets/safe.svg",
        },
        seuil: 1000,

    },
];