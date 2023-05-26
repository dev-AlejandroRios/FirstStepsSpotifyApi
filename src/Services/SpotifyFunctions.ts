export class SpotifyFunctions {
    // Aquí puedes definir tus funciones y métodos que serán utilizados por otros componentes
    client_id: string = '36e737bf22c042e3a9df9dead75e0059';
    client_secret = '92304bf7db904adf8171c0c13a3f1a83';

    generateCodeVerifier(length: number): string {
        // Implementación de la función 1
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async generateCodeChallenge(codeVerifier: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        const base64Url = this.arrayBufferToBase64Url(digest);
        return base64Url;
    }

    arrayBufferToBase64Url(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);
        const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return base64Url;
    }

    async redirectToAuthCodeFlow(clientId: string) {
        // TODO: Redirect to Spotify authorization page
        const verifier = this.generateCodeVerifier(128);
        const challenge = await this.generateCodeChallenge(verifier);
        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:3000/callback");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

}