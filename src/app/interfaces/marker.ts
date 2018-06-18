export interface Markers {
    lat: number;
    long: number;
    id: string;
    timestamp: string;
    visible: boolean;
}

export interface Marker extends Markers {
    image_url: string;
    image_base64?: string;
}
