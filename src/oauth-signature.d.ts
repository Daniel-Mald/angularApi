// src/oauth-signature.d.ts
declare module 'oauth-signature' {
    interface OAuthSignature {
      generate(
        httpMethod: string,
        url: string,
        parameters: any,
        consumerSecret: string,
        tokenSecret: string,
        options?: {
          encodeSignature?: boolean;
        }
      ): string;
    }
  
    const oauthSignature: OAuthSignature;
    export = oauthSignature;
  }
  