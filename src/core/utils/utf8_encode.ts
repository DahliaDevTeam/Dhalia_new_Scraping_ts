// export function utf8Encode(value: string): string {
//     if (typeof value !== 'string') {
//         console.error('Expected a string, received:', value);
//         return '';  // Retournez une chaîne vide si la valeur n'est pas une chaîne
//     }
//     return Buffer.from(value, 'utf-8').toString();
// }

export function utf8Encode(value: string): string {
    if (typeof value !== 'string') {
        // console.error('Expected a string, received:', value);
        return '';  // Retourne une chaîne vide si la valeur n'est pas une chaîne
    }
    return value.normalize('NFC');  // Normalise la chaîne en UTF-8 sans la convertir
}
