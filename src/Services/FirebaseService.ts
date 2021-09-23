import { FirebaseApp } from '@firebase/app'
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite'
import Animal from '../Redux/interfaces/AdditionalInterfaces/Animal'
import AnimalType from '../Redux/interfaces/AdditionalInterfaces/AnimalType'

class FirebaseService {
  async getAnimals(firebaseApp: FirebaseApp): Promise<any> {
    const dbName: string = 'animals'
    const animalsCollection = collection(getFirestore(firebaseApp), dbName)
    const animalsSnapshot = await getDocs(animalsCollection)

    const animals: Animal[] = []
    animalsSnapshot.forEach((animal) => {
      // console.log(animal)
      animals.push({
        id: animal.id,
        age: animal.get('age'),
        color: animal.get('color'),
        name: animal.get('name'),
        sex: animal.get('sex'),
        type: animal.get('type'),
        weight: animal.get('weight'),
      })
    })

    return animals
  }

  async getAnimalTypes(firebaseApp: FirebaseApp): Promise<Array<AnimalType>> {
    const dbName: string = 'animalType'
    const animalTypesCollection = collection(getFirestore(firebaseApp), dbName)
    const animalTypesSnapshot = await getDocs(animalTypesCollection)

    const animalTypes: AnimalType[] = []
    animalTypesSnapshot.forEach((animalType) => {
      animalTypes.push({
        id: animalType.id,
        name: animalType.get('name'),
      })
    })

    return animalTypes
  }

  async getAnimal(firebaseApp: FirebaseApp, animalID: string): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    const docSnapshot = await getDoc(docRef)
    const animal: Animal = {
      id: docSnapshot.id,
      age: docSnapshot.get('age'),
      color: docSnapshot.get('color'),
      name: docSnapshot.get('name'),
      sex: docSnapshot.get('sex'),
      type: docSnapshot.get('type'),
      weight: docSnapshot.get('weight'),
    }

    return animal
  }
  
  async getAnimalType(firebaseApp: FirebaseApp, animaTypeID: string): Promise<any> {
    const dbName: string = 'animalType'
    const docRef = doc(getFirestore(firebaseApp), dbName, animaTypeID)
    const docSnapshot = await getDoc(docRef)
    const animaType: AnimalType = {
      id: docSnapshot.id,
      name: docSnapshot.get('name'),
    }

    return animaType
  }

  async setAnimal(firebaseApp: FirebaseApp, animalID: string, animal: Animal): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    await updateDoc(docRef, {...animal})

    return await this.getAnimal(firebaseApp, animalID)
  }

  async setAnimalType(firebaseApp: FirebaseApp, animaTypeID: string, animaType: AnimalType): Promise<any> {
    const dbName: string = 'animalType'
    const docRef = doc(getFirestore(firebaseApp), dbName, animaTypeID)
    await updateDoc(docRef, {...animaType})

    return await this.getAnimal(firebaseApp, animaTypeID)
  }

  async addAnimal(firebaseApp: FirebaseApp, animal: Animal): Promise<any> {    
    const dbName: string = 'animals'
    const docRef = await addDoc(collection(getFirestore(firebaseApp), dbName), animal)
    return await this.getAnimal(firebaseApp, docRef.id)
  }
  
  async addAnimalType(firebaseApp: FirebaseApp, animalType: AnimalType): Promise<any> {    
    const dbName: string = 'animalType'
    const docRef = await addDoc(collection(getFirestore(firebaseApp), dbName), animalType)
    return await this.getAnimal(firebaseApp, docRef.id)
  }

  async delAnimal(firebaseApp: FirebaseApp, animalID: string): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    const delAnimal = await this.getAnimal(firebaseApp, animalID)

    await deleteDoc(docRef)

    return delAnimal
  }
  
  async delAnimalType(firebaseApp: FirebaseApp, animalTypeID: string): Promise<any> {
    const dbName: string = 'animalType'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalTypeID)
    const delAnimalType = await this.getAnimal(firebaseApp, animalTypeID)

    await deleteDoc(docRef)

    return delAnimalType
  }
}

export default FirebaseService
