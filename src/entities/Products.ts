export const enum TypeProduct {
  VitaminKhoangChat = "VitaminKhoangChat",
  DieuTriBenhLy = "DieuTriBenhLy",
  ChamSocCaNhan = "ChamSocCaNhan",
}
export interface ProductEntity {
  id: number;
  name: string;
  images: ProductImage[];
  price: number;
  discountPrice: number;
  quantity: number;
  type: TypeProduct
  description: string
  details: string
  slug: string
  createdAt: Date
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
}
