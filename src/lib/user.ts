export function displayPhone(phone: string) {
    return (phone.match(/.{1,2}/g) ?? []).join(" ");
}
