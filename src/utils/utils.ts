export function getInitials(firstname: string, lastname: string) {
    return `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
}