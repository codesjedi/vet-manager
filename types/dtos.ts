export interface CreateOwnerDto {
  name: string;
  lasName: string;
  phone: string;
  email: string;
  location?: string;
}

export interface CreatePetDto {
  name: string;
  ownerId: string;
  breed: string;
  diseases?: string;
  medicine: string;
  birthDate?: string;
  type: string;
  avatarUrl?: string;
}
