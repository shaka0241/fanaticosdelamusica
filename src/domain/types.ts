export interface Advertiser {
    id: number;
    name: string;
    desc: string;
    phone?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    tiktok?: string | null;
    address?: string | null;
    mapsUrl?: string | null;
    schedule?: string | null;
    isOpen?: boolean | null;
    tags?: string[];
    altText?: string | null;
    image?: string;
}
