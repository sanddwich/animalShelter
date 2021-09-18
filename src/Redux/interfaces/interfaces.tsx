import { FirebaseApp } from "@firebase/app";
import { MarketUser } from "./AdditionalInterfaces/MarketUser";
import Pagination from "./AdditionalInterfaces/Pagination";
import Product from "./AdditionalInterfaces/Product";
import ProductCategory from "./AdditionalInterfaces/ProductCategory";

export interface AppState {
  loading: boolean
  error: string
  tariff: string
  marketUser: MarketUser | null
  products: Product[]
  productCategories: ProductCategory[]
  pagination: Pagination
  firebaseApp: FirebaseApp
}

export interface ToastState {
  isActive: boolean
  message: string
  error: boolean
}

export interface ModalState {
  modalRequestForm: {
    isActive: boolean
  }
  mobileMenu: {
    isActive: boolean
  }
  modalWindow: {
    isActive: boolean
  }
}