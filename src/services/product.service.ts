import { getCachedData, setCachedData } from '@/utils';
import { fetchListProducts, fetchProductDetail } from '@/api';
import { type ProductsList, type ProductDetail } from '@/models';
import { adaptListProducts, adaptProductDetail } from '@/adapters';

export async function getProducts(): Promise<ProductsList> {
    const cacheKey = 'products';
    const cachedData = getCachedData<ProductsList>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const apiProducts = await fetchListProducts();
    const adaptedProducts = adaptListProducts(apiProducts);
    setCachedData(cacheKey, adaptedProducts);

    return adaptedProducts;
}

export async function getProductDetail(productId: string): Promise<ProductDetail> {
    const cacheKey = `product_${productId}`;
    const cachedData = getCachedData<ProductDetail>(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const apiProductDetail = await fetchProductDetail(productId);
    const adaptedProductDetail = adaptProductDetail(apiProductDetail);
    setCachedData(cacheKey, adaptedProductDetail);

    return adaptedProductDetail;
}