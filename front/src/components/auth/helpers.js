// Assuming you have a function to retrieve the JWT token from localStorage
export const getToken = () => localStorage.getItem('token');

// Function to extract email from JWT token
export const getEmailFromToken = () => {
    const token = getToken();
    if (token) {
        // Split the token into header, payload, and signature
        const [, payloadBase64] = token.split('.');
        // Decode the base64 encoded payload
        const payload = JSON.parse(atob(payloadBase64));
        // Access the email field from the payload
        return payload.email;
    }
    return null; // Token is not available
};

export const getUID=()=>{
    const token=getToken();
    if (token) {
        // Split the token into header, payload, and signature
        const [, payloadBase64] = token.split('.');
        // Decode the base64 encoded payload
        const payload = JSON.parse(atob(payloadBase64));
        // Access the email field from the payload
        return payload.user_id;
    }
    return null; // Token is not available
}
export const getPermiso=(permiso)=>{
    const token = getToken();
    if (token) {
        // Split the token into header, payload, and signature
        const [, payloadBase64] = token.split('.');
        // Decode the base64 encoded payload
        const payload = JSON.parse(atob(payloadBase64));
        // Access the permissions field from the payload
        return payload.permissions!=null?payload.permissions.includes(permiso):false;
        
    }
}
// Function to extract email from JWT token
export const getRolFromToken = () => {
    const token = getToken();
    if (token) {
        // Split the token into header, payload, and signature
        const [, payloadBase64] = token.split('.');
        // Decode the base64 encoded payload
        const payload = JSON.parse(atob(payloadBase64));
        // Access the email field from the payload
        return payload.rol;
    }
    return null; // Token is not available
};

//funcion para verificar si el token aún es valido
export const isTokenExpired = () => {
    const token=getToken()
    if (!token) return true; // Token is not present
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const expiryTime = payload.exp * 1000; // Convert expiry time to milliseconds
    return expiryTime < Date.now();
};

//funcion para borrar el token del local storage
export const logOut=()=>localStorage.removeItem('token');