
export function formatPrice(n, currency) {
    const nFormat = new Intl.NumberFormat();
    return nFormat.format(n) + ' ' + currency;
}
