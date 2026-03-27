export interface Advertiser {
    id: number;
    name: string;
    desc: string;
    phone?: string | null;
    whatsapp?: string | null;
    social?: string | null;
    address?: string | null;
    schedule?: string | null;
    image?: string;
}
