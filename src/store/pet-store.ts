import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Pet {
  id: string
  name: string
  type: 'dog' | 'cat' | 'other'
  breed?: string
  age: number
  size?: 'small' | 'medium' | 'large'
}

interface PetStoreState {
  pets: Pet[]
  selectedPetId: string | null
  addPet: (pet: Omit<Pet, 'id'>) => void
  updatePet: (id: string, data: Partial<Pet>) => void
  removePet: (id: string) => void
  selectPet: (id: string | null) => void
}

export const usePetStore = create<PetStoreState>()(
  persist(
    (set, get) => ({
      pets: [],
      selectedPetId: null,
      addPet: (petData) => {
        const newPet: Pet = {
          ...petData,
          id: Math.random().toString(36).substring(2, 9),
        }
        set({ pets: [...get().pets, newPet] })
      },
      updatePet: (id, data) => {
        set({
          pets: get().pets.map((pet) => (pet.id === id ? { ...pet, ...data } : pet)),
        })
      },
      removePet: (id) => {
        set({ 
          pets: get().pets.filter((pet) => pet.id !== id),
          selectedPetId: get().selectedPetId === id ? null : get().selectedPetId
        })
      },
      selectPet: (id) => set({ selectedPetId: id }),
    }),
    {
      name: 'pet-storage',
    }
  )
)



