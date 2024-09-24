export function utf8Encode(value: string): string {
    if (typeof value !== 'string') {
        console.error('Expected a string, received:', value);
        return '';  // Retournez une chaîne vide si la valeur n'est pas une chaîne
    }
    return Buffer.from(value, 'utf-8').toString();
}
