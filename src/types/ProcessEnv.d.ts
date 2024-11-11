declare namespace NodeJS { 
    export interface ProcessEnv { 
        NODE_ENV: string;
        PORT: string;
        JWT_SECRET: string;
        JWT_EXPIRATION: string;
        PAYSTACK_SECRET_KEY: string;
        KARMA_APP_ID: string;
        KARMA_API_KEY: string;
        KARMA_URL: string;
        DATABASE_URL: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_NAME: string;

    }
}