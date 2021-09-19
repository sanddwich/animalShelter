import FirebaseConfig from "../Redux/interfaces/AdditionalInterfaces/FirebaseConfig";
import ProductOperation from "../Redux/interfaces/AdditionalInterfaces/ProductOperation";
import UploadFiles from "../Redux/interfaces/AdditionalInterfaces/UploadFiles";

interface ConfigInterface {
  backConnectData: {
    backendURL: string
  }
  upload: UploadFiles
  productOperations: ProductOperation[]
  messageTimout: number
  uploadFilesCount: number
  firebaseConfig: FirebaseConfig
  tableFields: {
    animals: Map<string, string>
    animalTypes: Map<string, string>
  }
}

export const Config: ConfigInterface = {
  firebaseConfig: {
    apiKey: "AIzaSyD3l5HK1Vj1a3FudtnAKCJstwSfo48sBcc",
    authDomain: "animalshelter-670e4.firebaseapp.com",
    databaseURL: "https://animalshelter-670e4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "animalshelter-670e4",
    storageBucket: "animalshelter-670e4.appspot.com",
    messagingSenderId: "624129915349",
    appId: "1:624129915349:web:7e6300381d593c968ae55c"
  },
  tableFields: {
    animals: new Map([
      ['age', 'возраст'],      
      ['color', 'цвет'],      
      ['name', 'имя'],      
      ['sex', 'пол'],      
      ['type', 'тип животного'],      
      ['weight', 'вес'],
    ]),
    animalTypes: new Map([
      ['name', 'Тип животного'],
    ])
  },
  backConnectData: {
    backendURL: 'http://laravel:8000',
  },
  productOperations: [
    {httpMethod: 'POST', productMethod: 'CHANGE_PRODUCT', apiLink: '/api/admin/product/create-update'},
  ],
  messageTimout: 5000,
  uploadFilesCount: 10,
  upload: {
    images: {
      accept: '.jpg, .jpeg, .png',
      maxSize: 1024000,
    },
    pdf: {
      accept: '.pdf',
      maxSize: 1024000,
    },
    archives: {
      accept: '.rar, .7zip',
      maxSize: 1024000,
    },
  }
}