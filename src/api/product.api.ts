const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function fetchListProducts(): Promise<any> {
    const response = await fetch(`${BASE_URL}/product`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export async function fetchProductDetail(id: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/product/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${id}`);
    }
    return response.json();
}