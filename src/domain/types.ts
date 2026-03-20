export interface Advertiser {
    id: number;
    name: string;
    desc: string;
    phone: string | null;
    image?: string; // Path to sponsor image or generic SVG
}
