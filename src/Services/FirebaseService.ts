import { FirebaseApp } from '@firebase/app'
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore/lite'
import Animal from '../Redux/interfaces/AdditionalInterfaces/Animal'

class FirebaseService {
  async getAnimals(firebaseApp: FirebaseApp): Promise<any> {
    const dbName: string = 'animals'
    const animalsCollection = collection(getFirestore(firebaseApp), dbName)
    const animalsSnapshot = await getDocs(animalsCollection)

    const animals: Animal[] = []
    animalsSnapshot.forEach((animal) => {
      animals.push({
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

  async getAnimal(firebaseApp: FirebaseApp, animalID: string): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    const docSnapshot = await getDoc(docRef)
    const animal: Animal = {
      age: docSnapshot.get('age'),
      color: docSnapshot.get('color'),
      name: docSnapshot.get('name'),
      sex: docSnapshot.get('sex'),
      type: docSnapshot.get('type'),
      weight: docSnapshot.get('weight'),
    }

    return animal
  }

  async setAnimal(firebaseApp: FirebaseApp, animalID: string, animal: Animal): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    await updateDoc(docRef, {...animal})

    return await this.getAnimal(firebaseApp, animalID)
  }

  async addAnimal(firebaseApp: FirebaseApp, animal: Animal): Promise<any> {    
    const dbName: string = 'animals'
    const docRef = await addDoc(collection(getFirestore(firebaseApp), dbName), animal)
    return await this.getAnimal(firebaseApp, docRef.id)
  }

  async delAnimal(firebaseApp: FirebaseApp, animalID: string): Promise<any> {
    const dbName: string = 'animals'
    const docRef = doc(getFirestore(firebaseApp), dbName, animalID)
    const delAnimal = await this.getAnimal(firebaseApp, animalID)

    await deleteDoc(docRef)

    return delAnimal
  }
}

export default FirebaseService
